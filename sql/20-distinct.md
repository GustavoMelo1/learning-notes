# 20 - Distinct

Pega os valores ÚNICOS de uma coluna. Diferente do GROUP BY: aqui não agrupa nem conta, só remove repetidos.
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
