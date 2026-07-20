# 17 - Limit

Limita quantas linhas aparecem no resultado:
```sql
-- top 3 jogos por nota
SELECT titulo, nota FROM jogos ORDER BY nota DESC LIMIT 3;
/*
╭───────────────┬──────╮
│ titulo        │ nota │
╞═══════════════╪══════╡
│ The Witcher 3 │  9.8 │
│ Minecraft     │  9.5 │
│ Elden Ring    │  9.5 │
╰───────────────┴──────╯
*/

-- pular os 3 primeiros e pegar os próximos 3 (página 2)
SELECT titulo, nota FROM jogos ORDER BY nota DESC LIMIT 3 OFFSET 3;
```
