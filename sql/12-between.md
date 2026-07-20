# 12 - Between

Pega tudo dentro de um intervalo. Os dois extremos são INCLUÍDOS:
```sql
SELECT titulo, ano FROM jogos WHERE ano BETWEEN 2011 AND 2020;
/*
╭───────────────┬──────╮
│ titulo        │ ano  │
╞═══════════════╪══════╡
│ Minecraft     │ 2011 │
│ Terraria      │ 2011 │
│ Valorant      │ 2020 │
│ The Witcher 3 │ 2015 │
╰───────────────┴──────╯
*/
```
