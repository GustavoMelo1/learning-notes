---
title: Exportar e conferir o resultado
description: Execute um pequeno pipeline local e confira esquema, quantidade e tipos.
path: arquivos
step: 3
prev: false
next: false
---
# Exportar e conferir o resultado

Um arquivo gerado não prova que o pipeline está correto. Antes de salvar, confere os registros e o esquema esperado.

## Executar o exemplo

<ExerciseDownload file="arquivos/pipeline.py">Baixa o script didático</ExerciseDownload> e, na pasta onde salvou, executa:

```bash
python pipeline.py
```

Ele usa apenas a biblioteca padrão do Python, duas linhas fictícias e grava `resultado.csv` na pasta atual. Para preservar uma saída existente, o script recusa sobrescrever esse arquivo.

```text
produto,preco,filial
Caderno,12.5,A
Caneta,3.5,B
```

## O que conferir

| Verificação | Esperado neste exercício |
| --- | --- |
| Quantidade de linhas | 1 da loja A + 1 da loja B = 2 |
| Colunas | produto, preco, filial |
| Tipos antes da escrita | Preço numérico |
| Origem dos registros | A e B preservadas |

CSV guarda texto. Ao reler o resultado, tu precisa converter os tipos de novo ou usar um leitor com esquema definido.

## Exercício de falha

No script baixado, troca `"3.50"` por `"desconhecido"`. Roda numa pasta sem `resultado.csv`. O pipeline deve parar na validação, antes de escrever uma saída que pareça correta.

<details><summary>Por que parar é melhor aqui?</summary>

Tratar um preço inválido como zero mudaria o dado de negócio. O exemplo rejeita o registro para que tu decida como corrigir a origem ou separar o erro. Um pipeline maior poderia encaminhá-lo para quarentena.

</details>

## Fechando o percurso

Tu leu duas estruturas, definiu nomes e tipos comuns, concatenou os registros e conferiu a saída. O próximo passo é experimentar arquivos reais de teste e escrever casos para listas vazias e campos ausentes.

[Revisar pytest](/python/pytest-notes) · [Relacionar com staging](/data-engineering/business-intelligence)
