# 21 - Subqueries

Uma subquery é um `SELECT` dentro de outro `SELECT`. O resultado da consulta interna é usado pela externa. Aparece muito no `WHERE` e no `FROM`.

Usando no WHERE, "quais alunos estão na Turma A?" sem saber o id dela:
```sql
SELECT nome FROM alunos
WHERE turma_id IN (
    SELECT id FROM turmas WHERE nome = 'Turma A'
);
```
O banco roda o `SELECT` de dentro primeiro, pega os ids, e usa no `WHERE` de fora.

Usando no FROM, pra tratar o resultado de uma consulta como se fosse uma tabela:
```sql
SELECT vendedor, total
FROM (
    SELECT vendedor, SUM(valor) AS total
    FROM vendas
    GROUP BY vendedor
) AS resumo
WHERE total > 700;
```
Resultado:
```text
Maria  1100
```
# Nota: a subquery no `FROM` precisa de um alias (`AS resumo`), o MySQL exige nomear a "tabela temporária".
