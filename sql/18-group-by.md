# 18 - Group By

Agrupa linhas pra responder "quantos por grupo" ou "total por grupo". Sempre junto com COUNT, SUM, AVG, MIN ou MAX.

## GROUP BY + COUNT
Quantos jogos tem em cada gênero?
```sql
SELECT genero, COUNT(*) AS quantidade FROM jogos GROUP BY genero;
/*
╭──────────┬────────────╮
│ genero   │ quantidade │
╞══════════╪════════════╡
│ Survival │          2 │
│ FPS      │          2 │
│ RPG      │          2 │
╰──────────┴────────────╯
*/
```

## GROUP BY + AVG
Nota média por gênero:
```sql
SELECT genero, AVG(nota) AS media FROM jogos GROUP BY genero;
/*
╭──────────┬───────╮
│ genero   │ media │
╞══════════╪═══════╡
│ Survival │  9.25 │
│ FPS      │  8.25 │
│ RPG      │  9.65 │
╰──────────┴───────╯
*/
```

## GROUP BY + MIN and MAX
Menor e maior nota por gênero:
```sql
SELECT genero, MIN(nota) AS menor, MAX(nota) AS maior FROM jogos GROUP BY genero;
/*
╭──────────┬───────┬───────╮
│ genero   │ menor │ maior │
╞══════════╪═══════╪═══════╡
│ Survival │   9.0 │   9.5 │
│ FPS      │   8.0 │   8.5 │
│ RPG      │   9.5 │   9.8 │
╰──────────┴───────┴───────╯
*/
```

## ORDER BY + GROUP BY
Ordenar os grupos pelo resultado:
```sql
SELECT genero, COUNT(*) AS quantidade FROM jogos GROUP BY genero ORDER BY quantidade DESC;
```

## Projeto spending
Total geral gasto:
```sql
SELECT SUM(amount) FROM spending WHERE transaction_type = 'expense';
/*
╭─────────────╮
│ SUM(amount) │
╞═════════════╡
│       160.9 │
╰─────────────╯
*/
```

Total gasto por categoria:
```sql
SELECT SUM(amount), category FROM spending WHERE transaction_type = 'expense' GROUP BY category;
/*
╭─────────────┬───────────╮
│ SUM(amount) │ category  │
╞═════════════╪═══════════╡
│        55.9 │ Food      │
│         100 │ Leisure   │
│           5 │ Transport │
╰─────────────┴───────────╯
*/
```
