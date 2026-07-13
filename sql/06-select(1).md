# 06 - Select (DML / DQL)

Agora começa o SQL "de verdade" — buscar e responder perguntas sobre os dados. SELECT é o comando mais usado de todos.

> Como pensar (meu lembrete do "ver o todo"): SELECT serve pra RESPONDER PERGUNTAS sobre os dados. Cada parte responde uma coisa — *quais colunas* (SELECT), *de onde* (FROM), *filtra quais linhas* (WHERE), *em que ordem* (ORDER BY).

## Select everything
O `*` pega TODOS os campos da tabela:
```sql
SELECT * FROM sensores;
```
## Column alias (AS)
Dá pra apelidar uma coluna no resultado usando `AS` — o apelido só aparece na saída, não muda o banco.
```sql
SELECT nome AS "Nome do sensor" FROM sensores;
```

## Select specific columns
```sql
SELECT idsensor FROM sensores;        -- só a coluna idsensor
SELECT nome, alcance FROM sensores;   -- só nome e alcance
```

## ORDER BY (sorting)
Ordena o resultado. `ASC` = crescente (padrão), `DESC` = decrescente.
```sql
SELECT * FROM sensores
ORDER BY nome DESC;
```

## WHERE (filtering rows)
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
Exemplo — tudo que NÃO é de 2016:
```sql
SELECT nome, alcance FROM sensores
WHERE ano <> '2016'
ORDER BY nome;
```

## BETWEEN (range of values)
Pega tudo DENTRO de um intervalo (inclusivo):
```sql
SELECT nome, ano FROM sensores
WHERE ano BETWEEN 2014 AND 2016;
```

## IN (list of exact values)
Pega linhas que batem com QUALQUER um dos valores da lista. Mais limpo que escrever vários `OR`:
```sql
SELECT nome, ano FROM sensores
WHERE ano IN (2014, 2016, 2018);
```

## Logical operators (AND / OR / NOT)
Combinam condições no WHERE — igual eu vi na lógica do Python:
```sql
SELECT nome FROM sensores
WHERE ano = 2016 AND alcance > 30;     -- as DUAS condições

SELECT nome FROM sensores
WHERE ano = 2014 OR ano = 2016;        -- QUALQUER uma das duas

SELECT nome FROM sensores
WHERE NOT ano = 2016;              -- tudo que NÃO é 2016 (equivale a <>)
```

## LIKE (searching similar text)
Pra buscar parte de um texto. O `%` é "qualquer coisa":
```sql
SELECT nome FROM sensores
WHERE nome LIKE 'P%';        -- começa com P (Pluviometro)
WHERE nome LIKE '%ometro%';  -- contém "ometro" (quase todo sensor: anemometro, termometro...)
```

