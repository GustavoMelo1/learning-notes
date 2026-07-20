# 10 - Order By

Ordena o resultado. `ASC` = crescente (padrão), `DESC` = decrescente.
```sql
SELECT * FROM sensores
ORDER BY nome DESC;
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
