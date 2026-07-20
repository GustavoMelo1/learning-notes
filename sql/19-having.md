# 19 - Having

O WHERE filtra LINHAS antes de agrupar. O HAVING filtra GRUPOS depois do GROUP BY, por isso não dá pra usar COUNT/SUM/AVG dentro do WHERE.

Mostrar só setores com mais de 2 funcionários:
```sql
SELECT setor, COUNT(*) AS quantidade
FROM funcionarios
GROUP BY setor
HAVING COUNT(*) > 2;
```
Resultado:
```text
TI  3
```

## WHERE + GROUP BY + HAVING together
Vendas acima de R$300, e só vendedores cujo total passou de R$700:
```sql
SELECT vendedor, SUM(valor) AS total
FROM vendas
WHERE valor > 300
GROUP BY vendedor
HAVING SUM(valor) > 700;
```
Resultado:
```text
Maria  1100
```

# A ordem lógica é sempre: **WHERE → GROUP BY → HAVING → ORDER BY**. WHERE filtra linha por linha antes de agrupar, HAVING filtra o grupo já formado. Essa sequência é bem cobrada em entrevista de SQL/Engenharia de Dados.
