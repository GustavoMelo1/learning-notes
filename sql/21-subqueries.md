# 21 - Subqueries

Um SELECT dentro de outro SELECT. O banco roda o de dentro primeiro, depois usa o resultado no de fora.

No WHERE, qual jogo tem a maior nota?
```sql
SELECT titulo FROM jogos
WHERE nota = (SELECT MAX(nota) FROM jogos);
/*
╭───────────────╮
│ titulo        │
╞═══════════════╡
│ The Witcher 3 │
╰───────────────╯
*/
```

No FROM, trata o resultado como uma tabela temporária:
```sql
SELECT titulo, nota
FROM (
    SELECT titulo, nota FROM jogos WHERE genero = 'RPG'
) AS rpgs
WHERE nota > 9.5;
/*
╭───────────────┬──────╮
│ titulo        │ nota │
╞═══════════════╪══════╡
│ The Witcher 3 │  9.8 │
╰───────────────┴──────╯
*/
```
# Nota: a subquery no `FROM` precisa de um alias (`AS rpgs`), o MySQL exige nomear a "tabela temporária".
