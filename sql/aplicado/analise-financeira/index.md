---
title: SQL aplicado — análise financeira
description: Use filtros, agrupamentos e funções de janela para analisar transações e conferir indicadores.
prev: false
next: false
---
# SQL aplicado — análise financeira

Aqui o objetivo é usar SQL para responder perguntas sobre entradas e despesas. Vamos partir do significado dos dados e chegar a indicadores que conseguimos conferir.

## O que entra nessa análise

| Pergunta | Conteúdo de SQL |
| --- | --- |
| Quais movimentos são despesas? | `SELECT` e `WHERE` |
| Quanto foi gasto por categoria? | `SUM` e `GROUP BY` |
| Quais categorias passaram de um limite? | `HAVING` |
| Quanto cada categoria totaliza, mantendo as transações? | `SUM OVER (PARTITION BY ...)` |
| Qual foi o saldo do período? | `CASE` e agregação |

## Aplicação: análise de transações

O projeto `financial-analysis` usa uma tabela de transações para praticar essas perguntas. Nesta biblioteca, usamos dados fictícios e SQLite para reproduzir os cálculos.

1. [Entender a tabela e preparar os dados](./01-preparar).
2. [Responder perguntas com SQL](./02-consultar).
3. [Comparar sem perder os detalhes](./03-comparar).

O aprendizado é saber escolher filtros, definir agrupamentos e validar totais. A análise financeira é o exemplo; os mesmos conceitos aparecem em vendas, estoque e outros dados de negócio.

[Revisar os fundamentos de SQL](/sql/09-select) · [Ver o projeto de aplicação](https://github.com/GustavoMelo1/financial-analysis)
