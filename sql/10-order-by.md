# 10 - Order By

Ordena o resultado. `ASC` = crescente (padrão), `DESC` = decrescente.

Top jogos por nota:
```sql
SELECT titulo, nota FROM jogos ORDER BY nota DESC;
/*
╭───────────────┬──────╮
│ titulo        │ nota │
╞═══════════════╪══════╡
│ The Witcher 3 │  9.8 │
│ Minecraft     │  9.5 │
│ Elden Ring    │  9.5 │
│ Terraria      │  9.0 │
│ Valorant      │  8.5 │
│ CS2           │  8.0 │
╰───────────────┴──────╯
*/
```

Todas as transações ordenadas por valor (crescente):
```sql
SELECT * FROM spending ORDER BY amount ASC;
/*
╭────┬────────────┬───────────────┬───────────┬────────┬──────────────────╮
│ id │    date    │  description  │ category  │ amount │ transaction_type │
╞════╪════════════╪═══════════════╪═══════════╪════════╪══════════════════╡
│  2 │ 2026-07-07 │ Uber to work  │ Transport │      5 │ expense          │
│  3 │ 2026-07-07 │ Cake the BOX  │ Food      │     10 │ expense          │
│  1 │ 2026-07-07 │ iFood order   │ Food      │   45.9 │ expense          │
│  4 │ 2026-07-07 │ Skin Valorant │ Leisure   │    100 │ expense          │
│  5 │ 2026-08-05 │ First salary  │ Salary    │    580 │ income           │
╰────┴────────────┴───────────────┴───────────┴────────┴──────────────────╯
*/
```
