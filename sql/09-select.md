# 09 - Select (DQL)

SELECT responde perguntas sobre os dados. É o comando mais usado.

# Cada parte responde uma coisa: *quais colunas* (SELECT), *de onde* (FROM), *quais linhas* (WHERE), *em que ordem* (ORDER BY).

## Select everything
```sql
SELECT * FROM jogos;
/*
╭────┬───────────────┬──────────┬──────┬──────╮
│ id │ titulo        │ genero   │ nota │ ano  │
╞════╪═══════════════╪══════════╪══════╪══════╡
│  1 │ Minecraft     │ Survival │  9.5 │ 2011 │
│  2 │ Terraria      │ Survival │  9.0 │ 2011 │
│  3 │ Valorant      │ FPS      │  8.5 │ 2020 │
│  4 │ CS2           │ FPS      │  8.0 │ 2023 │
│  5 │ The Witcher 3 │ RPG      │  9.8 │ 2015 │
│  6 │ Elden Ring    │ RPG      │  9.5 │ 2022 │
╰────┴───────────────┴──────────┴──────┴──────╯
*/
```

## Column alias (AS)
Apelida uma coluna no resultado. Não muda o banco, só o que aparece na saída:
```sql
SELECT titulo AS "Nome do jogo", nota AS "Minha nota" FROM jogos;
```

## Select specific columns
```sql
SELECT titulo FROM jogos;
SELECT titulo, nota FROM jogos;
```
