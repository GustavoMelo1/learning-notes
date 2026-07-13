# 07 - Select (2) — GROUP BY, HAVING, DISTINCT

Continuação do SELECT. Agora a ideia é AGRUPAR linhas pra responder perguntas tipo "quanto cada um", "quantos por grupo". Vem sempre junto com COUNT, SUM, AVG.

## GROUP BY + COUNT
Quantos funcionários existem em cada setor?
```sql
CREATE TABLE funcionarios (
    id INT,
    nome VARCHAR(50),
    setor VARCHAR(50)
);

INSERT INTO funcionarios VALUES
(1, 'João', 'TI'),
(2, 'Maria', 'RH'),
(3, 'Pedro', 'TI'),
(4, 'Ana', 'Financeiro'),
(5, 'Carlos', 'TI');

SELECT setor, COUNT(*) AS quantidade
FROM funcionarios
GROUP BY setor;
```
Resultado:
```text
Financeiro  1
RH          1
TI          3
```

## GROUP BY + SUM
Quanto cada vendedor vendeu?
```sql
CREATE TABLE vendas (
    id INT,
    vendedor VARCHAR(50),
    valor DECIMAL(10,2)
);

INSERT INTO vendas VALUES
(1, 'João', 500),
(2, 'Maria', 700),
(3, 'João', 300),
(4, 'Maria', 400),
(5, 'Pedro', 200);

SELECT vendedor, SUM(valor) AS total_vendido
FROM vendas
GROUP BY vendedor;
```
Resultado:
```text
João   800
Maria  1100
Pedro  200
```

## GROUP BY + AVG
Média salarial por departamento:
```sql
CREATE TABLE colaboradores (
    id INT,
    nome VARCHAR(50),
    departamento VARCHAR(50),
    salario DECIMAL(10,2)
);

INSERT INTO colaboradores VALUES
(1, 'João', 'TI', 5000),
(2, 'Maria', 'TI', 6000),
(3, 'Ana', 'RH', 4000),
(4, 'Carlos', 'RH', 5000);

SELECT departamento, AVG(salario) AS media_salario
FROM colaboradores
GROUP BY departamento;
```
Resultado:
```text
RH  4500
TI  5500
```

## GROUP BY + MIN and MAX
Maior e menor valor por grupo — os dois mais simples de todos:
```sql
SELECT vendedor,
       MIN(valor) AS menor_venda,
       MAX(valor) AS maior_venda
FROM vendas
GROUP BY vendedor;
```
Resultado:
```text
João   300   500
Maria  400   700
Pedro  200   200
```

## HAVING (filtering groups)
O WHERE filtra LINHAS antes de agrupar. O HAVING filtra GRUPOS depois do GROUP BY — por isso não dá pra usar COUNT/SUM/AVG dentro do WHERE.

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

## DISTINCT (no repetition)
Pega os valores ÚNICOS de uma coluna — diferente do GROUP BY, aqui não agrupa nem conta, só remove repetidos:
```sql
CREATE TABLE clientes (
    id INT,
    nome VARCHAR(50),
    cidade VARCHAR(50)
);

INSERT INTO clientes VALUES
(1, 'João', 'Porto Alegre'),
(2, 'Maria', 'São Paulo'),
(3, 'Pedro', 'Porto Alegre'),
(4, 'Ana', 'Rio de Janeiro');

SELECT DISTINCT cidade
FROM clientes;
```
Resultado:
```text
Porto Alegre
São Paulo
Rio de Janeiro
```

## ORDER BY + GROUP BY
Ordenar os grupos pelo resultado da contagem/soma:
```sql
SELECT setor, COUNT(*) AS quantidade
FROM funcionarios
GROUP BY setor
ORDER BY quantidade DESC;
```
Resultado:
```text
TI          3
RH          1
Financeiro  1
```

---

> A ordem lógica é sempre: **WHERE → GROUP BY → HAVING → ORDER BY**. WHERE filtra linha por linha antes de agrupar, HAVING filtra o grupo já formado. Essa sequência é bem cobrada em entrevista de SQL/Engenharia de Dados.

## Subqueries (consulta dentro de consulta)
Uma subquery é um `SELECT` dentro de outro `SELECT`. O resultado da consulta interna é usado pela externa. Aparece muito no `WHERE` e no `FROM`.

Usando no WHERE — "quais alunos estão na Turma A?" sem saber o id dela:
```sql
SELECT nome FROM alunos
WHERE turma_id IN (
    SELECT id FROM turmas WHERE nome = 'Turma A'
);
```
O banco roda o `SELECT` de dentro primeiro, pega os ids, e usa no `WHERE` de fora.

Usando no FROM — tratar o resultado de uma consulta como se fosse uma tabela:
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
> A subquery no `FROM` precisa de um alias (`AS resumo`) — o MySQL exige nomear a "tabela temporária".
