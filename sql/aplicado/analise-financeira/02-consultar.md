---
title: Responder perguntas com SQL
description: Transforme perguntas sobre despesas em filtros, agrupamentos e verificações.
path: financas
step: 2
prev: false
next: false
---
# Responder perguntas com SQL

Usa a base fictícia da [etapa anterior](/sql/aplicado/analise-financeira/01-preparar). Primeiro escreve a pergunta; depois escolhe as colunas e os filtros.

## Quanto saiu no período?

```sql
SELECT SUM(amount) AS total_despesas
FROM spending
WHERE transaction_type = 'expense';
```

Resultado esperado: **200**. Confere somando as quatro despesas da tabela: 80 + 20 + 40 + 60.

## Qual categoria concentrou as despesas?

```sql
SELECT category, SUM(amount) AS total
FROM spending
WHERE transaction_type = 'expense'
GROUP BY category
ORDER BY total DESC, category;
```

| Categoria | Total |
| --- | ---: |
| Alimentação | 120 |
| Lazer | 60 |
| Transporte | 20 |

Somar os grupos precisa voltar aos mesmos **200**. Essa é uma conferência simples para detectar filtros diferentes entre duas consultas.

## Agora é contigo

Mostra apenas categorias com total maior que 50. Esse filtro entra em `WHERE` ou `HAVING`?

<details><summary>Ver solução e explicação</summary>

```sql
SELECT category, SUM(amount) AS total
FROM spending
WHERE transaction_type = 'expense'
GROUP BY category
HAVING SUM(amount) > 50
ORDER BY total DESC, category;
```

Sobram Alimentação (120) e Lazer (60). `WHERE` escolhe as linhas antes de agrupar; `HAVING` escolhe os grupos depois.

</details>

## Um erro para investigar

Troca o filtro por `WHERE amount > 50`. A despesa de 40 deixa de participar da soma de Alimentação, que passa a ser 80. É outra pergunta: transações individuais acima de 50.

[Revisar GROUP BY](/sql/18-group-by) · [Revisar HAVING](/sql/19-having)
