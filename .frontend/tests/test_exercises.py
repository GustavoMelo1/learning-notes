"""Run from the repository root: python -m unittest discover -s .frontend/tests -p test_*.py"""
import importlib.util
from pathlib import Path
import sqlite3
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]


def load(name, relative):
    spec = importlib.util.spec_from_file_location(name, ROOT / relative)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


pipeline = load("pipeline", "public/exercicios/arquivos/pipeline.py")
repos = load("repos", "public/exercicios/api/repositorios.py")


class FinanceTests(unittest.TestCase):
    def test_expected_results_in_downloadable_queries(self):
        with sqlite3.connect(":memory:") as db:
            db.executescript((ROOT / "public/exercicios/financas/preparar.sql").read_text(encoding="utf-8"))
            queries = (ROOT / "public/exercicios/financas/consultas.sql").read_text(encoding="utf-8")
            queries = "\n".join(line for line in queries.splitlines() if not line.lstrip().startswith("--"))
            results = [db.execute(query).fetchall() for query in queries.split(";") if query.strip()]
            self.assertEqual(results[0], [(200,)])
            self.assertEqual(results[1], [("Alimentação", 120), ("Lazer", 60), ("Transporte", 20)])
            self.assertEqual(results[2], [("Alimentação", 120), ("Lazer", 60)])
            self.assertEqual(len(results[3]), 4)
            self.assertEqual(sum(row[3] for row in results[3]), 320)
            self.assertEqual(results[4], [(1800,)])


class PipelineTests(unittest.TestCase):
    def test_mapping_and_numeric_conversion(self):
        rows = pipeline.transformar(
            [{"produto": "Caderno", "preco": 12.5, "filial": "A"}],
            [{"Nome do Item": "Caneta", "Valor em Reais (R$)": "3.50", "Nome da Loja": "B"}],
        )
        self.assertEqual(rows[1], {"produto": "Caneta", "preco": 3.5, "filial": "B"})
        self.assertEqual(len(rows), 2)

    def test_empty_and_invalid_prices(self):
        self.assertEqual(pipeline.transformar([], []), [])
        for price in ["desconhecido", "nan", "inf", -1]:
            with self.subTest(price=price), self.assertRaises(ValueError):
                pipeline.transformar([{"produto": "Item", "preco": price, "filial": "A"}], [])

    def test_does_not_overwrite_existing_export(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "resultado.csv"
            path.write_text("preservar", encoding="utf-8")
            with self.assertRaises(FileExistsError):
                pipeline.salvar([], path)
            self.assertEqual(path.read_text(encoding="utf-8"), "preservar")


class ApiTests(unittest.TestCase):
    def test_stops_on_empty_page_and_preserves_missing_language(self):
        pages = [[{"name": "A", "language": None}], [{"name": "B", "language": "Python"}], []]
        calls = []

        def fetch(number):
            calls.append(number)
            return pages[number - 1]

        rows = repos.transformar(repos.coletar_paginas(fetch))
        self.assertEqual(calls, [1, 2, 3])
        self.assertEqual(rows, [{"repository_name": "A", "language": None}, {"repository_name": "B", "language": "Python"}])

    def test_api_failure_is_not_treated_as_end_of_collection(self):
        def fetch(number):
            if number == 2:
                raise ConnectionError("Falha simulada")
            return [{"name": "A"}]

        with self.assertRaises(ConnectionError):
            repos.coletar_paginas(fetch)
        with self.assertRaises(ValueError):
            repos.coletar_paginas(lambda number: {"message": "Falha simulada"})

    def test_page_limit_and_invalid_records(self):
        with self.assertRaises(RuntimeError):
            repos.coletar_paginas(lambda number: [{"name": "A"}])
        for repo in [None, {}, {"name": ""}, {"name": "A", "language": 42}]:
            with self.subTest(repo=repo), self.assertRaises(ValueError):
                repos.transformar([repo])

    def test_does_not_overwrite_existing_export(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "repositorios.csv"
            repos.salvar([{"repository_name": "A", "language": None}], path)
            before = path.read_bytes()
            with self.assertRaises(FileExistsError):
                repos.salvar([], path)
            self.assertEqual(path.read_bytes(), before)


if __name__ == "__main__":
    unittest.main()
