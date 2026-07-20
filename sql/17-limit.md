# 17 - Limit

Limita quantas linhas aparecem no resultado. Muito usado pra pegar "os X primeiros" ou paginar dados:
```sql
-- só os 5 primeiros sensores em ordem alfabética
SELECT nome FROM sensores
ORDER BY nome
LIMIT 5;

-- pular os 5 primeiros e pegar os próximos 5 (página 2)
SELECT nome FROM sensores
ORDER BY nome
LIMIT 5 OFFSET 5;
```
