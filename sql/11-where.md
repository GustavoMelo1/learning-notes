# 11 - Where

Filtra quais LINHAS aparecem. O SELECT escolhe as colunas, o WHERE escolhe as linhas.
```sql
SELECT nome, alcance FROM sensores
WHERE ano = '2016'
ORDER BY nome;
```

## Comparison operators
```text
=    igual
<>   diferente (também pode ser !=)
>    maior que
<    menor que
>=   maior ou igual
<=   menor ou igual
```
Exemplo, tudo que NÃO é de 2016:
```sql
SELECT nome, alcance FROM sensores
WHERE ano <> '2016'
ORDER BY nome;
```
