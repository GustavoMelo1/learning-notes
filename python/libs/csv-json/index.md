---
title: CSV e JSON — arquivos em Python
description: Aprenda a ler, padronizar e escrever dados com os módulos csv e json da biblioteca padrão.
prev: false
next: false
---
# CSV e JSON — arquivos em Python

`csv` e `json` são módulos que já vêm com o Python. Servem para ler e escrever dados nesses formatos, sem instalar uma biblioteca adicional.

| Formato | Como organiza o dado | Exemplo de uso |
| --- | --- | --- |
| CSV | Linhas e colunas separadas por um delimitador | Exportação de planilhas e sistemas |
| JSON | Objetos, listas e valores, com possibilidade de aninhamento | Respostas de APIs e arquivos estruturados |

## Um exemplo pequeno

```python
import json

texto = '[{"produto": "Caderno", "preco": 12.5}]'
produtos = json.loads(texto)
print(produtos[0]["produto"])  # Caderno
```

`loads` lê uma string JSON; `load` lê um arquivo aberto. Para CSV, `DictReader` lê cada linha como um dicionário e `DictWriter` escreve dicionários em colunas.

## O que estudar

1. [Ler CSV e JSON e entender os tipos](./01-extrair).
2. [Padronizar colunas e combinar registros](./02-transformar).
3. [Escrever CSV e validar a saída](./03-validar).

## Aplicação: unir arquivos de duas lojas

Uma loja entrega JSON e outra entrega CSV, com nomes de campos diferentes. Vamos transformar os dois em uma tabela comum. É um exemplo de ETL: extrair, transformar e carregar.

O estudo `pipeline_dados_data` é a aplicação desse conteúdo. O importante é aprender a trabalhar com formatos e esquemas diferentes, para conseguir repetir o processo com outras fontes.

[Ver o projeto de aplicação](https://github.com/GustavoMelo1/data-engineering-studies/tree/main/pipeline_dados_data) · [Módulo csv](https://docs.python.org/3/library/csv.html) · [Módulo json](https://docs.python.org/3/library/json.html)
