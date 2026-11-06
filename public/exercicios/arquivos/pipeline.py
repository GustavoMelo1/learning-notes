"""Adaptacao didatica de data-engineering-studies. Apenas dados ficticios."""
import csv
import math


def transformar(loja_a, loja_b):
    linhas = []
    for registro in loja_a:
        linhas.append({"produto": registro["produto"], "preco": float(registro["preco"]), "filial": registro["filial"]})
    for registro in loja_b:
        linhas.append({"produto": registro["Nome do Item"], "preco": float(registro["Valor em Reais (R$)"]), "filial": registro["Nome da Loja"]})
    for linha in linhas:
        if not linha["produto"] or not linha["filial"] or not math.isfinite(linha["preco"]) or linha["preco"] < 0:
            raise ValueError("Produto, filial ou preco invalido")
    return linhas


def salvar(linhas, destino="resultado.csv"):
    with open(destino, "x", encoding="utf-8", newline="") as arquivo:
        writer = csv.DictWriter(arquivo, fieldnames=["produto", "preco", "filial"])
        writer.writeheader()
        writer.writerows(linhas)


if __name__ == "__main__":
    loja_a = [{"produto": "Caderno", "preco": 12.5, "filial": "A"}]
    loja_b = [{"Nome do Item": "Caneta", "Valor em Reais (R$)": "3.50", "Nome da Loja": "B"}]
    linhas = transformar(loja_a, loja_b)
    salvar(linhas)
    print(f"{len(linhas)} registros escritos em resultado.csv")
