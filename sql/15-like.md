# 15 - Like

Busca parte de um texto. O `%` significa "qualquer coisa":
```sql
SELECT titulo FROM jogos WHERE titulo LIKE 'The%';      -- começa com "The"
SELECT titulo FROM jogos WHERE titulo LIKE '%Ring%';    -- contém "Ring"
SELECT titulo FROM jogos WHERE titulo LIKE '%a';        -- termina com "a"
```
