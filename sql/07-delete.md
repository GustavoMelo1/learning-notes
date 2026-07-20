# 07 - Delete (DML)

Apaga LINHAS. Cuidado, não tem CTRL+Z.
```sql
DELETE FROM sensores
WHERE idsensor = '8';
```
Com LIMIT pra não apagar demais sem querer:
```sql
DELETE FROM sensores
WHERE ano = '2050'
LIMIT 2;
```

## DELETE without WHERE deletes EVERYTHING
Mesma regra do UPDATE: DELETE sem WHERE = apaga a tabela inteira (linha por linha). Sempre WHERE.
