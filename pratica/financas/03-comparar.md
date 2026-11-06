---
title: Comparar sem perder os detalhes
description: Use uma janela para manter cada despesa e mostrar o total da categoria ao lado.
path: financas
step: 3
prev: false
next: false
---
# Comparar sem perder os detalhes

No projeto original, uma das consultas usa `SUM(...) OVER (...)`. A diferença aparece no resultado: cada despesa continua sendo uma linha.

## Total do grupo ao lado da transação

```sql
SELECT description, category, amount,
       SUM(amount) OVER (PARTITION BY category) AS total_categoria
FROM spending
WHERE transaction_type = 'expense'
ORDER BY category, id;
```

| Descrição | Categoria | Valor | Total da categoria |
| --- | --- | ---: | ---: |
| Mercado fictício | Alimentação | 80 | 120 |
| Almoço fictício | Alimentação | 40 | 120 |
| Passeio fictício | Lazer | 60 | 60 |
| Ônibus fictício | Transporte | 20 | 20 |

Com `GROUP BY`, teríamos três linhas. Com a janela, temos quatro: uma para cada despesa.

## Tenta conferir

Posso somar a coluna `total_categoria` para descobrir o total gasto?

<details><summary>Conferir a resposta</summary>

Não. O total de Alimentação aparece nas duas despesas. Somar essa coluna retorna 320, contando o grupo duas vezes. Para o total de despesas, soma `amount`: 200.

</details>

## Extensão: saldo do período

```sql
SELECT SUM(CASE
    WHEN transaction_type = 'income' THEN amount
    WHEN transaction_type = 'expense' THEN -amount
    ELSE 0
END) AS saldo
FROM spending;
```

Resultado: **1800**. O `CASE` define o sinal de cada movimento. Antes de usar a consulta em outra base, confere se existem tipos de transação inesperados.

## O que tu consegue explicar agora

- O significado de uma linha da tabela.
- A diferença entre filtrar transações e filtrar grupos.
- Por que uma janela preserva os detalhes e pode repetir totais.
- Como conferir o resultado sem confiar só no fato de a consulta executar.

[Revisar window functions](/sql/27-window-function) · [Abrir o projeto original](https://github.com/GustavoMelo1/financial-analysis)
