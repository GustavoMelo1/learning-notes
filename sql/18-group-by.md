# 18 - Group By

Agrupa linhas pra responder perguntas tipo "quanto cada um" ou "quantos por grupo". Vem sempre junto com COUNT, SUM, AVG, MIN ou MAX.

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
/*
╭────────────┬────────────╮
│ setor      │ quantidade │
╞════════════╪════════════╡
│ Financeiro │          1 │
│ RH         │          1 │
│ TI         │          3 │
╰────────────┴────────────╯
*/
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
/*
╭──────────┬───────────────╮
│ vendedor │ total_vendido │
╞══════════╪═══════════════╡
│ João     │           800 │
│ Maria    │          1100 │
│ Pedro    │           200 │
╰──────────┴───────────────╯
*/
```

Total geral gasto (SUM sem GROUP BY):
```sql
SELECT SUM(amount) FROM spending WHERE transaction_type = 'expense';
/*
╭─────────────╮
│ SUM(amount) │
╞═════════════╡
│       160.9 │
╰─────────────╯
*/
```

Total gasto por categoria:
```sql
SELECT SUM(amount), category FROM spending WHERE transaction_type = 'expense' GROUP BY category;
/*
╭─────────────┬───────────╮
│ SUM(amount) │ category  │
╞═════════════╪═══════════╡
│        55.9 │ Food      │
│         100 │ Leisure   │
│           5 │ Transport │
╰─────────────┴───────────╯
*/
```

## GROUP BY + AVG
Média salarial por departamento:
```sql
SELECT departamento, AVG(salario) AS media_salario
FROM colaboradores
GROUP BY departamento;
```

## GROUP BY + MIN and MAX
Maior e menor valor por grupo:
```sql
SELECT vendedor,
       MIN(valor) AS menor_venda,
       MAX(valor) AS maior_venda
FROM vendas
GROUP BY vendedor;
/*
╭──────────┬─────────────┬─────────────╮
│ vendedor │ menor_venda │ maior_venda │
╞══════════╪═════════════╪═════════════╡
│ João     │         300 │         500 │
│ Maria    │         400 │         700 │
│ Pedro    │         200 │         200 │
╰──────────┴─────────────┴─────────────╯
*/
```

## ORDER BY + GROUP BY
Ordenar os grupos pelo resultado da contagem:
```sql
SELECT setor, COUNT(*) AS quantidade
FROM funcionarios
GROUP BY setor
ORDER BY quantidade DESC;
/*
╭────────────┬────────────╮
│ setor      │ quantidade │
╞════════════╪════════════╡
│ TI         │          3 │
│ RH         │          1 │
│ Financeiro │          1 │
╰────────────┴────────────╯
*/
```
