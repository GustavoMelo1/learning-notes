---
title: Entender a resposta da API
description: Identifique os campos de uma resposta HTTP antes de transformá-la em tabela.
path: api
step: 1
prev: false
next: false
---
# Entender a resposta da API

O experimento `python_for_api` consulta repositórios do GitHub e extrai o nome e a linguagem principal. Antes de fazer várias requisições, vale entender uma resposta.

## Do objeto à linha

Resposta fictícia e reduzida:

```json
[
  {"id": 101, "name": "estudo-sql", "language": "Python"},
  {"id": 102, "name": "anotacoes", "language": null}
]
```

Cada objeto pode virar uma linha. `null` é um valor ausente; não é o texto `"null"` nem uma linguagem chamada “Nenhuma”. Em Python, ele vira `None`.

## Ler o código original

Em `dados.py`, a classe `DadosRepositorios` recebe o nome da conta, monta o endereço e lê o token de `GITHUB_TOKEN`. O cabeçalho de autorização só é adicionado quando há token.

Já `request_language.py` concatena o token diretamente: se a variável não existir, a concatenação com `None` falha. As duas versões registram momentos diferentes do estudo.

## Tenta antes de seguir

Uma resposta JSON sempre significa que a requisição deu certo?

<details><summary>Conferir a resposta</summary>

Não. Uma API também pode responder um erro em JSON, por exemplo um objeto com `message`. Antes de percorrer como uma lista de repositórios, verifica o status HTTP e a estrutura do conteúdo.

</details>

Não precisa de token nem acesso à rede para fazer esta trilha. O exercício final usa respostas fictícias. Para experimentar a API real depois, consulta a [documentação de listagem de repositórios](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user).

[Revisar dicionários](/python/code/11-dictionary) · [Projeto original](https://github.com/GustavoMelo1/data-engineering-studies/tree/main/python_for_api)
