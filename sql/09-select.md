# 09 - Select (DQL)

Agora começa o SQL "de verdade", buscar e responder perguntas sobre os dados. SELECT é o comando mais usado de todos.

# SELECT serve pra RESPONDER PERGUNTAS sobre os dados. Cada parte responde uma coisa: *quais colunas* (SELECT), *de onde* (FROM), *filtra quais linhas* (WHERE), *em que ordem* (ORDER BY).

## Select everything
O `*` pega TODOS os campos da tabela:
```sql
SELECT * FROM sensores;
```

## Column alias (AS)
Dá pra apelidar uma coluna no resultado usando `AS`. O apelido só aparece na saída, não muda o banco.
```sql
SELECT nome AS "Nome do sensor" FROM sensores;
```

## Select specific columns
```sql
SELECT idsensor FROM sensores;        -- só a coluna idsensor
SELECT nome, alcance FROM sensores;   -- só nome e alcance
```
