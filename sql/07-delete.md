# 07 - Delete (DML)

Apaga LINHAS. Não tem CTRL+Z.
```sql
DELETE FROM jogos WHERE id = 4;
```

Com LIMIT pra não apagar mais do que quero:
```sql
DELETE FROM jogos WHERE genero = 'FPS' LIMIT 1;
```

## Regra de ouro: sempre WHERE
DELETE sem WHERE apaga a tabela inteira, linha por linha. Sempre WHERE.
