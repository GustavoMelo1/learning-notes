# 06 - Select (DML / DQL)

Agora começa o SQL "de verdade" — buscar e responder perguntas sobre os dados. SELECT é o comando mais usado de todos.

> Como pensar (meu lembrete do "ver o todo"): SELECT serve pra RESPONDER PERGUNTAS sobre os dados. Cada parte responde uma coisa — *quais colunas* (SELECT), *de onde* (FROM), *filtra quais linhas* (WHERE), *em que ordem* (ORDER BY).

## Selecionar tudo
O `*` pega TODOS os campos da tabela:
```sql
SELECT * FROM sensores;
```

## Selecionar colunas específicas
```sql
SELECT idsensor FROM sensores;        -- só a coluna idsensor
SELECT nome, alcance FROM sensores;   -- só nome e alcance
```

## ORDER BY (ordenar)
Ordena o resultado. `ASC` = crescente (padrão), `DESC` = decrescente.
```sql
SELECT * FROM sensores
ORDER BY nome DESC;
```

## WHERE (filtrar linhas)
Filtra quais LINHAS aparecem. O SELECT escolhe as colunas, o WHERE escolhe as linhas.
```sql
SELECT nome, alcance FROM sensores
WHERE ano = '2016'
ORDER BY nome;
```

## Operadores de comparação
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

## BETWEEN (faixa de valores)
Pega tudo DENTRO de um intervalo (inclusivo):
```sql
SELECT nome, ano FROM sensores
WHERE ano BETWEEN 2014 AND 2016;
```

## IN (lista de valores exatos)
Pega linhas que batem com QUALQUER um dos valores da lista. Mais limpo que escrever vários `OR`:
```sql
SELECT nome, ano FROM sensores
WHERE ano IN (2014, 2016, 2018);
```

## Operadores lógicos (AND / OR / NOT)
Combinam condições no WHERE — igual eu vi na lógica do Python:
```sql
SELECT nome FROM sensores
WHERE ano = 2016 AND alcance > 30;     -- as DUAS condições

SELECT nome FROM sensores
WHERE ano = 2014 OR ano = 2016;        -- QUALQUER uma das duas
```

## LIKE (busca por texto parecido)
Pra buscar parte de um texto. O `%` é "qualquer coisa":
```sql
SELECT nome FROM sensores
WHERE nome LIKE 'P%';        -- começa com P (Pluviometro)
WHERE nome LIKE '%ometro%';  -- contém "ometro" (quase todo sensor: anemometro, termometro...)
```

---

## >>> Próximo: GROUP BY (ainda vou estudar)
GROUP BY agrupa linhas pra CONTAR ou SOMAR por grupo. Responde perguntas tipo "quantos sensores por ano?", "qual o alcance total por ano?". Vem junto com COUNT, SUM, AVG. **É meu critério de Fase 1.** Anotar quando chegar nessa aula.
