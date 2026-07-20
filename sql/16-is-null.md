# 16 - IS NULL / IS NOT NULL

Pra checar se um campo está vazio (sem valor). NÃO dá pra usar `= NULL`, isso nunca funciona em SQL. O jeito certo é `IS NULL`:
```sql
-- alunos que ainda não têm turma
SELECT nome FROM alunos
WHERE turma_id IS NULL;

-- alunos que já têm turma
SELECT nome FROM alunos
WHERE turma_id IS NOT NULL;
```
