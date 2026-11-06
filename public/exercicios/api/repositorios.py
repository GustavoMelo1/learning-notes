"""Exercicio offline inspirado em python_for_api. Nao chama uma API real."""
import csv


def coletar_paginas(buscar_pagina):
    registros = []
    for numero in range(1, 101):
        pagina = buscar_pagina(numero)
        if not isinstance(pagina, list):
            raise ValueError("Era esperada uma lista de repositorios")
        if not pagina:
            return registros
        registros.extend(pagina)
    raise RuntimeError("Limite de paginas atingido; coleta incompleta")


def transformar(repositorios):
    linhas = []
    for repo in repositorios:
        if not isinstance(repo, dict) or not isinstance(repo.get("name"), str) or not repo["name"].strip():
            raise ValueError("Repositorio sem nome valido")
        if repo.get("language") is not None and not isinstance(repo["language"], str):
            raise ValueError("Linguagem invalida")
        linhas.append({"repository_name": repo["name"], "language": repo.get("language")})
    return linhas


def salvar(linhas, destino="repositorios.csv"):
    with open(destino, "x", encoding="utf-8", newline="") as arquivo:
        writer = csv.DictWriter(arquivo, fieldnames=["repository_name", "language"])
        writer.writeheader()
        writer.writerows(linhas)


if __name__ == "__main__":
    paginas = [
        [{"name": "estudo-sql", "language": "Python"}, {"name": "anotacoes", "language": None}],
        [{"name": "pipeline-exemplo", "language": "Python"}],
        [],
    ]
    registros = coletar_paginas(lambda numero: paginas[numero - 1])
    linhas = transformar(registros)
    salvar(linhas)
    print(f"{len(linhas)} repositorios escritos em repositorios.csv")
