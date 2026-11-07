---
title: Entender a tabela e preparar os dados
description: Defina o que cada transação representa e prepare uma base fictícia para estudar SQL.
path: financas
step: 1
prev: false
next: false
---
# Entender a tabela e preparar os dados

Antes de analisar transações com SQL, precisamos entender o significado de cada linha e separar entradas de despesas. Vamos usar uma base financeira fictícia para praticar esses conceitos.

## Antes da consulta

Uma linha de `spending` representa **uma transação**, não um mês ou uma categoria. `amount` guarda um valor positivo; `transaction_type` distingue entrada (`income`) de saída (`expense`).

| Coluna | O que representa |
| --- | --- |
| `id` | Identificador da transação |
| `date` | Data do movimento |
| `description` | Descrição curta |
| `category` | Categoria do movimento |
| `amount` | Valor |
| `transaction_type` | Entrada ou saída |

## Preparar

Com o SQLite instalado, cria um banco novo para este exercício. Os arquivos abaixo são uma adaptação didática; não usam os lançamentos pessoais do projeto original.

- <ExerciseDownload file="financas/preparar.sql">Baixar preparação e dados fictícios</ExerciseDownload>
- <ExerciseDownload file="financas/consultas.sql">Baixar consultas comentadas</ExerciseDownload>

Abre `sqlite3 estudo.db` na pasta onde salvou os arquivos e executa:

```sql
.read preparar.sql
SELECT COUNT(*) AS transacoes FROM spending;
```

O resultado deve ser **6**. O arquivo de preparação deve ser usado em um banco novo; não apaga uma tabela existente.

| Data | Categoria | Valor | Tipo |
| --- | --- | ---: | --- |
| 2026-01-05 | Trabalho | 1000 | income |
| 2026-01-06 | Alimentação | 80 | expense |
| 2026-01-07 | Transporte | 20 | expense |
| 2026-01-08 | Alimentação | 40 | expense |
| 2026-02-05 | Trabalho | 1000 | income |
| 2026-02-06 | Lazer | 60 | expense |

## Tenta antes de seguir

Qual seria o problema de somar `amount` sem filtrar o tipo da transação?

<details><summary>Conferir o raciocínio</summary>

A soma seria **2200**, misturando entradas e saídas. Isso não representa nem despesas nem saldo. As despesas são 200; as entradas, 2000; o saldo do período, 1800.

</details>

## Voltar ao fundamento

[SELECT](/sql/09-select) · [WHERE](/sql/11-where) · [Tipos de dados](/sql/01-data-types)

O [repositório original](https://github.com/GustavoMelo1/financial-analysis) continua independente. Esta trilha organiza seu aprendizado; não substitui os scripts nem altera os dados dele.
