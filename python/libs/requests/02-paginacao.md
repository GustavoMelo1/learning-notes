---
title: Paginar sem esconder falhas
description: Diferencie fim da paginação de erro de rede ou resposta inválida.
path: api
step: 2
prev: false
next: false
---
# Paginar sem esconder falhas

Uma única resposta pode conter só parte dos repositórios. Paginar significa pedir as partes seguintes e reuni-las.

## Enviar página e tamanho com Requests

```python
import requests

def buscar_pagina(numero):
    resposta = requests.get(
        "https://api.github.com/users/octocat/repos",
        params={"page": numero, "per_page": 30},
        timeout=10,
    )
    resposta.raise_for_status()
    return resposta.json()
```

A função isola o pedido HTTP. A coleta pode chamar `buscar_pagina(1)`, depois `buscar_pagina(2)` e assim por diante. Para APIs que exigem autenticação, passe o cabeçalho adequado em `headers`, com o segredo obtido do ambiente.

## Separar três situações

| Resposta | O que fazer |
| --- | --- |
| Lista com registros | Acumular os registros e continuar |
| Lista vazia | Encerrar este exemplo de paginação |
| Falha HTTP ou estrutura inesperada | Informar a falha; não fingir que acabou |

Em uma integração real, segue o mecanismo de paginação documentado pela API. Neste exercício controlado, uma lista vazia marca o fim.

## Uma função testável

```python
def coletar_paginas(buscar_pagina):
    registros = []
    for numero in range(1, 101):
        pagina = buscar_pagina(numero)
        if not isinstance(pagina, list):
            raise ValueError("Era esperada uma lista de repositórios")
        if not pagina:
            return registros
        registros.extend(pagina)
    raise RuntimeError("Limite de páginas atingido; coleta incompleta")
```

`buscar_pagina` é uma função recebida como argumento. Pode chamar uma API ou devolver dados de teste. Se ela lançar um erro, a coleta para com falha em vez de retornar dados parciais como se estivessem completos.

## Agora é contigo

O que acontece se a primeira página tiver dados e a segunda falhar?

<details><summary>Conferir o raciocínio</summary>

A função não retorna uma coleta bem-sucedida. O erro chega ao chamador. Isso evita gerar uma tabela incompleta sem aviso, como pode acontecer com `except Exception: break`.

</details>

[Revisar laços](/python/code/06-forandwhile) · [Paginação na documentação do GitHub](https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api)
