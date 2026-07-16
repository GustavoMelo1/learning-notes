# 04 - Alter Table and Drop Table (DDL)

## ALTER TABLE
Serve pra MUDAR a estrutura de uma tabela que já existe (adicionar, remover, modificar, renomear coluna).

### Add column
```sql
ALTER TABLE estacoes
ADD responsavel VARCHAR(10);
```

### Remove column
```sql
ALTER TABLE estacoes
DROP responsavel;
```

### Add column at a specific POSITION
Por padrão a coluna nova entra no fim. Pra escolher onde:
```sql
ALTER TABLE estacoes
ADD responsavel VARCHAR(10) AFTER nome;   -- depois da coluna nome
```
```sql
ALTER TABLE estacoes
ADD protocolo int FIRST;                  -- como primeira coluna
```
# Nota: existe `FIRST` (primeira) e `AFTER` (depois de tal coluna). NÃO existe `BEFORE`.

### Modify a column's type / constraint
`MODIFY` muda o tipo e as regras, mas NÃO o nome da coluna.
```sql
ALTER TABLE estacoes
MODIFY responsavel VARCHAR(20) NOT NULL;
```
Pra a coluna não ficar sem valor quando viro NOT NULL, posso dar um default vazio:
```sql
ALTER TABLE estacoes
MODIFY responsavel VARCHAR(20) NOT NULL DEFAULT '';
```

### Rename column
`CHANGE` renomeia, preciso colocar o nome ANTIGO e o NOVO. (O CHANGE também serve pra modificar tipo, tipo o MODIFY, mas só uso quando vou trocar o nome.)
```sql
ALTER TABLE estacoes
CHANGE responsavel coordenador VARCHAR(20);    -- responsavel vira coordenador
```

### Rename the whole table
```sql
ALTER TABLE estacoes
RENAME TO postos_meteorologicos;
```

### Add primary key afterward
```sql
ALTER TABLE sensores
ADD idsensor int FIRST;

ALTER TABLE sensores
ADD PRIMARY KEY (idsensor);
```

## DROP TABLE
Apaga a tabela INTEIRA (estrutura + dados). Cuidado, não tem CTRL+Z.
```sql
DROP TABLE IF EXISTS rascunho;
```
# `IF EXISTS` evita erro caso a tabela não exista.

## MODIFY vs CHANGE difference (summary)
- `MODIFY` → muda tipo/constraint, mantém o nome
- `CHANGE` → muda tipo/constraint E permite renomear (precisa nome velho + novo)
 
