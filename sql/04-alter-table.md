# 04 - Alter Table (DDL)

Muda a estrutura de uma tabela que já existe.

## Add column
```sql
ALTER TABLE jogos
ADD desenvolvedor VARCHAR(50);
```

## Remove column
```sql
ALTER TABLE jogos
DROP desenvolvedor;
```

## Add column at a specific position
```sql
ALTER TABLE jogos
ADD desenvolvedor VARCHAR(50) AFTER titulo;  -- depois de titulo

ALTER TABLE jogos
ADD codigo INT FIRST;                         -- como primeira coluna
```
# Nota: existe `FIRST` e `AFTER`. NÃO existe `BEFORE`.

## Modify a column's type / constraint
`MODIFY` muda o tipo/regra, mas NÃO o nome:
```sql
ALTER TABLE jogos
MODIFY desenvolvedor VARCHAR(100) NOT NULL;
```

## Rename column
`CHANGE` renomeia. Precisa do nome ANTIGO e do NOVO:
```sql
ALTER TABLE jogos
CHANGE desenvolvedor estudio VARCHAR(100);   -- desenvolvedor vira estudio
```

## Rename the whole table
```sql
ALTER TABLE jogos
RENAME TO biblioteca_jogos;
```

## MODIFY vs CHANGE
- `MODIFY` → muda tipo/regra, mantém o nome
- `CHANGE` → muda tipo/regra E troca o nome
