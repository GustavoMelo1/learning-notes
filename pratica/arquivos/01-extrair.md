---
title: Ler e entender as duas fontes
description: Compare dados de duas lojas antes de tentar juntar seus arquivos.
path: arquivos
step: 1
prev: false
next: false
---
# Ler e entender as duas fontes

O experimento `pipeline_dados_data` trabalha com um JSON de uma empresa e um CSV de outra. O desafio não é apenas abrir os arquivos: os nomes das colunas são diferentes.

## A mesma informação, outros nomes

| Loja A · JSON | Loja B · CSV |
| --- | --- |
| `produto` | `Nome do Item` |
| `preco` | `Valor em Reais (R$)` |
| `filial` | `Nome da Loja` |

Para praticar, usamos uma versão menor e fictícia do problema:

```python
loja_a = [{"produto": "Caderno", "preco": 12.5, "filial": "A"}]
loja_b = [{"Nome do Item": "Caneta", "Valor em Reais (R$)": "3.50", "Nome da Loja": "B"}]
```

Repara que o preço da loja B é uma string. Ter nomes iguais não garante tipos iguais.

## Como os arquivos entram

```python
import csv
import json

with open("loja_a.json", encoding="utf-8") as arquivo:
    loja_a = json.load(arquivo)

with open("loja_b.csv", encoding="utf-8", newline="") as arquivo:
    loja_b = list(csv.DictReader(arquivo))
```

Esses nomes são ilustrativos. Para executar o exercício sem preparar arquivos, usa o <ExerciseDownload file="arquivos/pipeline.py">script didático com dados embutidos</ExerciseDownload>.

## Tenta antes de seguir

O que acontece se o arquivo estiver vazio e eu usar `dados[-1].keys()` para descobrir as colunas?

<details><summary>Conferir o raciocínio</summary>

Se a leitura resultar numa lista vazia, acessar `dados[-1]` gera `IndexError`. Esse acesso existe na versão original da classe `Dados`. É um ponto de aprendizado: conferir se há registros antes de acessar uma posição e definir um esquema esperado.

</details>

[Revisar dicionários](/python/code/11-dictionary) · [Código original](https://github.com/GustavoMelo1/data-engineering-studies/tree/main/pipeline_dados_data)
