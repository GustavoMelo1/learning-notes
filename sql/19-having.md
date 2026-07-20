# 19 - Having

WHERE filtra LINHAS antes de agrupar. HAVING filtra GRUPOS depois do GROUP BY.

Gêneros com mais de 1 jogo:
```sql
SELECT genero, COUNT(*) AS quantidade FROM jogos GROUP BY genero HAVING COUNT(*) > 1;
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

## WHERE + GROUP BY + HAVING juntos
Só jogos lançados depois de 2011, e só gêneros com média acima de 9:
```sql
SELECT genero, AVG(nota) AS media
FROM jogos
WHERE ano > 2011
GROUP BY genero
HAVING AVG(nota) > 9.0;
```

## Projeto spending
Categorias com total de gastos maior que 10:
```sql
SELECT category, SUM(amount) FROM spending WHERE transaction_type = 'expense' GROUP BY category HAVING SUM(amount) > 10;
/*
╭──────────┬─────────────╮
│ category │ SUM(amount) │
╞══════════╪═════════════╡
│ Food     │        55.9 │
│ Leisure  │         100 │
╰──────────┴─────────────╯
*/
```

# A ordem é sempre: **WHERE → GROUP BY → HAVING → ORDER BY**.
