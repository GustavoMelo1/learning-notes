# 06 - Update (DML)

Altera dados de linhas que já existem.
```sql
UPDATE jogos SET nota = 9.2 WHERE id = 3;
```

Vários campos de uma vez, separados por vírgula:
```sql
UPDATE jogos SET nota = 8.8, genero = 'Shooter' WHERE id = 3;
```

## Regra de ouro: sempre WHERE
Sem WHERE, o UPDATE muda TODAS as linhas da tabela. O `LIMIT 1` é uma trava extra:
```sql
UPDATE jogos SET nota = 9.2 WHERE id = 3 LIMIT 1;
```
