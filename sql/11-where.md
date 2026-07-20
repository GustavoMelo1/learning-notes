# 11 - Where

Filtra quais LINHAS aparecem. O SELECT escolhe as colunas, o WHERE escolhe as linhas.
```sql
SELECT titulo, nota FROM jogos WHERE genero = 'RPG';
/*
╭───────────────┬──────╮
│ titulo        │ nota │
╞═══════════════╪══════╡
│ The Witcher 3 │  9.8 │
│ Elden Ring    │  9.5 │
╰───────────────┴──────╯
*/
```

## Comparison operators
```text
=    igual
<>   diferente (também pode ser !=)
>    maior que
<    menor que
>=   maior ou igual
<=   menor ou igual
```

Jogos com nota maior que 9:
```sql
SELECT titulo, nota FROM jogos WHERE nota > 9.0;
/*
╭───────────────┬──────╮
│ titulo        │ nota │
╞═══════════════╪══════╡
│ Minecraft     │  9.5 │
│ The Witcher 3 │  9.8 │
│ Elden Ring    │  9.5 │
╰───────────────┴──────╯
*/
```
