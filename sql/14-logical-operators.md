# 14 - Logical Operators (AND / OR / NOT)

Combinam condições no WHERE, igual à lógica do Python:
```sql
SELECT titulo FROM jogos
WHERE genero = 'RPG' AND nota > 9.0;       -- as DUAS condições

SELECT titulo FROM jogos
WHERE genero = 'FPS' OR genero = 'RPG';    -- QUALQUER uma das duas

SELECT titulo FROM jogos
WHERE NOT genero = 'FPS';                  -- tudo que NÃO é FPS
```

Despesas com valor maior que 10:
```sql
SELECT * FROM spending WHERE transaction_type = 'expense' AND amount > 10;
```
