---
title: Requests — consumo de APIs
description: Aprenda requisições HTTP em Python com Requests, usando a coleta de repositórios como aplicação.
prev: false
next: false
---
# Requests — consumo de APIs

`requests` é uma biblioteca Python para fazer requisições HTTP. Ela permite pedir dados a uma API e ler a resposta no código.

Não é um navegador: não clica em botões nem executa o JavaScript de uma página. Para este assunto, o que importa é enviar uma requisição e tratar os dados recebidos.

## Primeiro exemplo

Instala a biblioteca no teu ambiente:

```bash
python -m pip install requests
```

Depois, uma consulta pública ao GitHub:

```python
import requests

resposta = requests.get(
    "https://api.github.com/users/octocat",
    timeout=10,
)
resposta.raise_for_status()
usuario = resposta.json()
print(usuario["login"])
```

Aqui, `get` pede os dados, `raise_for_status` verifica erros HTTP e `json` converte a resposta para objetos Python. O `timeout` limita a espera de conexão/leitura; não é um prazo total para executar o programa. O exemplo acessa a internet e pode falhar por rede ou limite da API.

## O que estudar

1. [Requisição, status e resposta JSON](./01-resposta).
2. [Parâmetros e paginação](./02-paginacao).
3. [Transformar a resposta em tabela](./03-tabela).

## Aplicação: linguagens de repositórios

Para colocar Requests em uso, vamos coletar repositórios, extrair nome e linguagem principal e salvar uma tabela. Esse é o objetivo do meu estudo `python_for_api`: transformar respostas HTTP em dados para analisar.

O projeto serve como exemplo do conteúdo. Tu pode reutilizar o mesmo raciocínio em outra API, respeitando seus endpoints, autenticação e regras de paginação.

[Ver o projeto de aplicação](https://github.com/GustavoMelo1/data-engineering-studies/tree/main/python_for_api) · [Documentação do Requests](https://requests.readthedocs.io/en/latest/user/quickstart/)
