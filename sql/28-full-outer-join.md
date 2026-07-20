# 28 - Full Outer Join

Mostra tudo dos dois lados, com ou sem par. MySQL não tem `FULL OUTER JOIN` nativo. Pra simular, junta `LEFT JOIN` + `RIGHT JOIN` com `UNION`:
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
