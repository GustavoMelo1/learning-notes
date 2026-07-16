# 10 - JOIN (combining tables)

`JOIN` serve pra literalmente JUNTAR duas tabelas numa consulta só. Sem ele, eu só consigo ver o `turma_id` (um número cru) na tabela `alunos`, com `JOIN` eu consigo mostrar o nome da turma de verdade, puxando da tabela `turmas`.

Vou usar as mesmas tabelas do [09-foreignkey.md](09-foreignkey.md):
```sql
-- turmas: id 1 = Turma A, id 2 = Turma B
-- alunos: Lucas (turma 1), Marina (turma 2), Pedro (turma 1)
```

## Why we need JOIN
```sql
SELECT * FROM alunos;
```
```text
id  nome    turma_id
1   Lucas   1
2   Marina  2
3   Pedro   1
```
Isso mostra `1`, `2`, `1` mas ninguém lembra de cabeça qual `id` é qual turma. O `JOIN` resolve isso buscando o nome direto na tabela `turmas`.

## Showing the class name instead of the ID
```sql
SELECT alunos.nome, turmas.nome
FROM alunos
JOIN turmas ON alunos.turma_id = turmas.id;
```
Repare que escrevi `alunos.nome` e `turmas.nome` porque as DUAS tabelas têm uma coluna chamada `nome`, então preciso dizer de qual tabela é cada uma (`tabela.coluna`), senão o MySQL não sabe qual usar.

Pra ficar mais legível, dou um apelido (`AS`) pra cada coluna:
```sql
SELECT alunos.nome AS aluno, turmas.nome AS turma
FROM alunos
JOIN turmas ON alunos.turma_id = turmas.id;
```
Resultado:
```text
aluno    turma
Lucas    Turma A
Marina   Turma B
Pedro    Turma A
```

## The ON clause
O `ON` diz QUAL coluna de uma tabela bate com qual coluna da outra, é a "cola" que junta as linhas certas. Sem o `ON` certo, o banco não sabe quem é parente de quem.
```sql
... JOIN turmas ON alunos.turma_id = turmas.id;
--                 ^ coluna da tabela da esquerda = coluna da tabela da direita
```
O `ON` decide COMO juntar, o `WHERE` (se eu usar depois) filtra o resultado já juntado. São coisas diferentes.

## INNER JOIN
`JOIN` sozinho já É um `INNER JOIN` por padrão, só estou escrevendo o nome completo aqui pra deixar claro. Ele só mostra as linhas que TÊM correspondência nos DOIS lados.
```sql
SELECT alunos.nome AS aluno, turmas.nome AS turma
FROM alunos
INNER JOIN turmas ON alunos.turma_id = turmas.id;
```
Se eu tivesse um aluno sem turma (`turma_id` vazio) ou uma turma sem nenhum aluno, NENHUM dos dois apareceria no resultado. O `INNER JOIN` só mostra a "interseção".

## OUTER JOIN — quando eu quero ver tudo, com ou sem relacionamento
Às vezes eu quero ver TODOS os alunos, mesmo os que ainda não têm turma. Pra isso existe o `OUTER JOIN`, em duas variações: `LEFT` e `RIGHT`.

### LEFT JOIN (LEFT OUTER JOIN)
Mostra TUDO da tabela da ESQUERDA (a que vem logo depois do `FROM`), completando com `NULL` quando não tem correspondência na tabela da direita.

Imagina que cadastrei um aluno novo sem turma ainda:
```sql
INSERT INTO alunos (nome, turma_id) VALUES ('Ana', NULL);

SELECT alunos.nome AS aluno, turmas.nome AS turma
FROM alunos
LEFT JOIN turmas ON alunos.turma_id = turmas.id;
```
```text
aluno    turma
Lucas    Turma A
Marina   Turma B
Pedro    Turma A
Ana      NULL
```
A Ana aparece mesmo sem turma, isso o `INNER JOIN` nunca mostraria.

### RIGHT JOIN (RIGHT OUTER JOIN)
É o espelho: mostra TUDO da tabela da DIREITA, completando com `NULL` quando não tem aluno correspondente.
```sql
SELECT alunos.nome AS aluno, turmas.nome AS turma
FROM alunos
RIGHT JOIN turmas ON alunos.turma_id = turmas.id;
```
Se existisse uma `Turma C` sem nenhum aluno matriculado, ela apareceria com `aluno = NULL`.

## Another way to think about LEFT and RIGHT JOIN
```text
INNER JOIN  -> só a interseção (bate nos dois lados)
LEFT JOIN   -> tudo da tabela da ESQUERDA + o que bater na direita
RIGHT JOIN  -> tudo da tabela da DIREITA  + o que bater na esquerda
```
O lado que ganha "TUDO" é o lado do nome (`LEFT` = esquerda = primeira tabela escrita, `RIGHT` = direita = segunda tabela escrita).

## FULL OUTER JOIN — tudo dos dois lados (com ou sem par)
MySQL não tem `FULL OUTER JOIN` nativo. Pra simular, junta `LEFT JOIN` + `RIGHT JOIN` com `UNION`:
```sql
SELECT alunos.nome AS aluno, turmas.nome AS turma
FROM alunos
LEFT JOIN turmas ON alunos.turma_id = turmas.id

UNION

SELECT alunos.nome AS aluno, turmas.nome AS turma
FROM alunos
RIGHT JOIN turmas ON alunos.turma_id = turmas.id;
```
Resultado: todos os alunos (com ou sem turma) + todas as turmas (com ou sem aluno). Onde não há par, aparece `NULL`.

# Nota: pouco usado no dia a dia mas cai em entrevista. PostgreSQL tem o `FULL OUTER JOIN` nativo e dispensa o `UNION`.

## Anti JOIN — excluindo a interseção
Mais útil que o FULL OUTER JOIN na prática. Serve pra achar registros que não têm correspondência no outro lado, ótimo pra encontrar dados órfãos ou inconsistências.

Alunos sem turma (o que está em `alunos` mas não tem par em `turmas`):
```sql
SELECT alunos.nome AS aluno
FROM alunos
LEFT JOIN turmas ON alunos.turma_id = turmas.id
WHERE turmas.id IS NULL;
```

Turmas sem nenhum aluno (o que está em `turmas` mas não tem par em `alunos`):
```sql
SELECT turmas.nome AS turma
FROM alunos
RIGHT JOIN turmas ON alunos.turma_id = turmas.id
WHERE alunos.id IS NULL;
```

A lógica: faz o `LEFT`/`RIGHT JOIN` (que traz `NULL` onde não tem par) e depois filtra só os `NULL`, sobram exatamente os que não têm correspondência.

## Practical tips
Sempre que as duas tabelas tiverem coluna com o MESMO nome, prefixe com `tabela.coluna` senão o MySQL acusa erro de ambiguidade. `JOIN` sem `INNER`/`LEFT`/`RIGHT` na frente já é `INNER JOIN`, escrever `INNER` é só pra deixar explícito.
