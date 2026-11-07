---
title: Entender a resposta da API
description: Identifique os campos de uma resposta HTTP antes de transformá-la em tabela.
path: api
step: 1
prev: false
next: false
---
# Entender a resposta da API

Uma requisição HTTP é um pedido enviado a um servidor. Com Requests, usamos `get` para consultar dados. A resposta traz um status e um corpo, que pode estar em JSON.

## Fazer uma requisição

Depois de instalar Requests, executa:

```python
import requests

resposta = requests.get(
    "https://api.github.com/users/octocat/repos",
    params={"per_page": 5, "page": 1},
    timeout=10,
)
resposta.raise_for_status()
repositorios = resposta.json()
print(len(repositorios))
```

Esse exemplo consulta uma página real. A quantidade retornada depende dos dados disponíveis. `params` monta os parâmetros da URL; não é preciso concatenar `?page=...` manualmente.

## Do objeto à linha

Resposta fictícia e reduzida:

```json
[
  {"id": 101, "name": "estudo-sql", "language": "Python"},
  {"id": 102, "name": "anotacoes", "language": null}
]
```

Cada objeto pode virar uma linha. `null` é um valor ausente; não é o texto `"null"` nem uma linguagem chamada “Nenhuma”. Em Python, ele vira `None`.

## Status, conteúdo e erro

| Recurso | Para que serve |
| --- | --- |
| `resposta.status_code` | Ver o status HTTP, como 200 ou 404 |
| `resposta.raise_for_status()` | Lançar um erro quando o status indica falha HTTP |
| `resposta.json()` | Converter JSON para objetos Python |
| `resposta.text` | Ler o corpo como texto |

Falhas de rede podem lançar `requests.exceptions.RequestException`. Um corpo que não seja JSON válido também falha ao chamar `json()`. Trata a falha explicitamente, em vez de continuar como se os dados tivessem chegado.

## Tenta antes de seguir

Uma resposta JSON sempre significa que a requisição deu certo?

<details><summary>Conferir a resposta</summary>

Não. Uma API também pode responder um erro em JSON, por exemplo um objeto com `message`. Antes de percorrer como uma lista de repositórios, verifica o status HTTP e a estrutura do conteúdo.

</details>

O exemplo de Requests acima usa a rede. O exercício de transformação no fim do guia usa respostas fictícias e pode ser feito offline. Endpoints públicos podem funcionar sem token, sujeitos aos limites da API. [Documentação da API usada no exemplo](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user).

[Revisar dicionários](/python/code/11-dictionary) · [Projeto original](https://github.com/GustavoMelo1/data-engineering-studies/tree/main/python_for_api)
