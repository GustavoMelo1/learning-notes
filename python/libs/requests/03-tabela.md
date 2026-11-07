---
title: Montar e validar a tabela
description: Extraia nome e linguagem juntos e teste respostas vazias e falhas sem chamar a API.
path: api
step: 3
prev: false
next: false
---
# Montar e validar a tabela

A resposta JSON ainda contém campos que não precisamos. Para montar uma tabela, escolhemos as colunas e criamos uma linha para cada repositório.

```python
linhas = []
for repositorio in repositorios:
    linhas.append({
        "repository_name": repositorio["name"],
        "language": repositorio.get("language"),
    })
```

Montar nome e linguagem juntos mantém os valores do mesmo repositório na mesma linha. O acesso com `get` preserva a ausência de uma linguagem como `None`.

## Quando usar pandas

Se tu quiser analisar os dados como tabela, instala pandas no ambiente e transforma as linhas em um DataFrame:

```python
import pandas as pd

tabela = pd.DataFrame(linhas, columns=["repository_name", "language"])
print(tabela.groupby("language", dropna=False).size())
tabela.to_csv("linguagens.csv", index=False, mode="x")
```

`dropna=False` inclui as linguagens ausentes na contagem. `index=False` evita uma coluna extra de índice no CSV; `mode="x"` recusa sobrescrever um arquivo existente. Este trecho usa a variável `linhas` criada acima. O exercício baixável abaixo usa apenas a biblioteca padrão para funcionar sem instalar pandas.

## Praticar sem depender da rede

<ExerciseDownload file="api/repositorios.py">Baixa o exercício completo</ExerciseDownload> e executa:

```bash
python repositorios.py
```

O script usa respostas fictícias, verifica o fim da paginação e grava `repositorios.csv`. Ele não acessa contas, não pede token e não sobrescreve uma saída existente.

| repository_name | language |
| --- | --- |
| estudo-sql | Python |
| anotacoes | *(ausente)* |
| pipeline-exemplo | Python |

## Experimento de erro

Na lista de páginas do script, substitui a segunda página por `{"message": "Falha simulada"}`. A execução deve falhar antes de criar o CSV. Testa numa pasta sem uma saída anterior.

<details><summary>O que o teste ensina?</summary>

Um dicionário de erro não é uma página de resultados. Validar o formato evita percorrer suas chaves como se fossem repositórios. O script também rejeita registros sem um nome válido.

</details>

## Do exercício para a API real

A parte de transformação pode continuar igual. A função que busca páginas precisa adicionar timeout, verificar o status HTTP e lidar explicitamente com os limites da API. Um erro de rede não deve ser convertido em “não existem mais dados”.

No CSV, a linguagem ausente aparece como célula vazia. Decide como interpretar essa célula ao reler o arquivo.

[Revisar ambiente Python](/python/environment) · [Voltar ao projeto original](https://github.com/GustavoMelo1/data-engineering-studies/tree/main/python_for_api)
