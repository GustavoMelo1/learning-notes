# 14 - Logical Operators (AND / OR / NOT)

Combinam condições no WHERE, igual à lógica do Python:
```sql
SELECT nome FROM sensores
WHERE ano = 2016 AND alcance > 30;     -- as DUAS condições

SELECT nome FROM sensores
WHERE ano = 2014 OR ano = 2016;        -- QUALQUER uma das duas

SELECT nome FROM sensores
WHERE NOT ano = 2016;                  -- tudo que NÃO é 2016 (equivale a <>)
```

Despesas com valor maior que 10:
```sql
SELECT * FROM spending WHERE transaction_type = 'expense' AND amount > 10;
```
