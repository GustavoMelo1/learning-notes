---
title: Montar e validar a tabela
description: Extraia nome e linguagem juntos e teste respostas vazias e falhas sem chamar a API.
path: api
step: 3
prev: false
next: false
---
# Montar e validar a tabela

No projeto original, nomes e linguagens são extraídos em duas listas separadas. Uma forma de manter os valores alinhados é montar cada linha de uma vez.

```python
linhas = []
for repositorio in repositorios:
    linhas.append({
        "repository_name": repositorio["name"],
        "language": repositorio.get("language"),
    })
```

Se uma extração ignorar um erro em apenas uma das listas separadas, o nome de um repositório pode ficar sem a linguagem correspondente. Uma linha por objeto deixa a relação explícita.

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
