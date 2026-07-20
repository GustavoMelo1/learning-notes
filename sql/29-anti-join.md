# 29 - Anti Join

Mais útil que o FULL OUTER JOIN na prática. Serve pra achar registros que NÃO têm correspondência no outro lado, ótimo pra encontrar dados órfãos ou inconsistências.

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
