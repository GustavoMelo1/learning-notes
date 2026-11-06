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

## O que o experimento faz

`request_language.py` avança o número da página até receber uma lista vazia. Em `dados.py`, o laço usa `range(1, 100)`: são 99 tentativas, embora o comentário fale em 20. Ele também continua pedindo páginas depois de uma lista vazia.

Essas diferenças são boas perguntas de revisão: qual versão para no momento certo? O que acontece quando a API retorna um erro?

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
