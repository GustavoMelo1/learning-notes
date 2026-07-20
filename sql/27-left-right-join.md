# 27 - Left and Right Join (OUTER JOIN)

Às vezes eu quero ver TODOS os registros de um lado, mesmo os que não têm correspondência no outro. Pra isso existe o `OUTER JOIN`, em duas variações: `LEFT` e `RIGHT`.

## LEFT JOIN
Mostra TUDO da tabela da ESQUERDA (a que vem logo depois do `FROM`), completando com `NULL` quando não tem correspondência na tabela da direita.

Imagina que cadastrei um aluno novo sem turma ainda:
```sql
INSERT INTO alunos (nome, turma_id) VALUES ('Ana', NULL);

SELECT alunos.nome AS aluno, turmas.nome AS turma
FROM alunos
LEFT JOIN turmas ON alunos.turma_id = turmas.id;
/*
╭────────┬─────────╮
│ aluno  │ turma   │
╞════════╪═════════╡
│ Lucas  │ Turma A │
│ Marina │ Turma B │
│ Pedro  │ Turma A │
│ Ana    │ NULL    │
╰────────┴─────────╯
*/
```
A Ana aparece mesmo sem turma, isso o `INNER JOIN` nunca mostraria.

## RIGHT JOIN
É o espelho: mostra TUDO da tabela da DIREITA, completando com `NULL` quando não tem correspondência no outro lado.
```sql
SELECT alunos.nome AS aluno, turmas.nome AS turma
FROM alunos
RIGHT JOIN turmas ON alunos.turma_id = turmas.id;
```
Se existisse uma `Turma C` sem nenhum aluno matriculado, ela apareceria com `aluno = NULL`.

## Como pensar em LEFT e RIGHT
```text
INNER JOIN  -> só a interseção (bate nos dois lados)
LEFT JOIN   -> tudo da tabela da ESQUERDA + o que bater na direita
RIGHT JOIN  -> tudo da tabela da DIREITA  + o que bater na esquerda
```
O lado que ganha "TUDO" é o lado do nome: `LEFT` = primeira tabela escrita, `RIGHT` = segunda tabela escrita.
