# 15 - Like

Pra buscar parte de um texto. O `%` é "qualquer coisa":
```sql
SELECT nome FROM sensores
WHERE nome LIKE 'P%';        -- começa com P (Pluviometro)
WHERE nome LIKE '%ometro%';  -- contém "ometro" (anemometro, termometro...)
```
