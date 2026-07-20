# 26 - Inner Join

`JOIN` serve pra juntar duas tabelas numa consulta só. Sem ele, eu só consigo ver o `turma_id` (um número cru), com `JOIN` eu consigo mostrar o nome da turma de verdade, puxando da tabela `turmas`.

Tabelas usadas:
```sql
-- turmas: id 1 = Turma A, id 2 = Turma B
-- alunos: Lucas (turma 1), Marina (turma 2), Pedro (turma 1)
```

## Por que precisamos do JOIN
```sql
SELECT * FROM alunos;
/*
╭────┬────────┬──────────╮
│ id │ nome   │ turma_id │
╞════╪════════╪══════════╡
│  1 │ Lucas  │        1 │
│  2 │ Marina │        2 │
│  3 │ Pedro  │        1 │
╰────┴────────┴──────────╯
*/
```
Isso mostra `1`, `2`, `1` mas ninguém lembra de cabeça qual `id` é qual turma. O `JOIN` resolve isso buscando o nome direto na tabela `turmas`.

## Mostrando o nome da turma em vez do ID
```sql
SELECT alunos.nome AS aluno, turmas.nome AS turma
FROM alunos
JOIN turmas ON alunos.turma_id = turmas.id;
/*
╭────────┬─────────╮
│ aluno  │ turma   │
╞════════╪═════════╡
│ Lucas  │ Turma A │
│ Marina │ Turma B │
│ Pedro  │ Turma A │
╰────────┴─────────╯
*/
```
Escrevi `alunos.nome` e `turmas.nome` porque as DUAS tabelas têm uma coluna chamada `nome`, então preciso dizer de qual tabela é cada uma, senão o MySQL não sabe qual usar.

## A cláusula ON
O `ON` diz QUAL coluna de uma tabela bate com qual coluna da outra, é a "cola" que junta as linhas certas.
```sql
... JOIN turmas ON alunos.turma_id = turmas.id;
--                 ^ coluna da tabela da esquerda = coluna da tabela da direita
```
O `ON` decide COMO juntar. O `WHERE` (se eu usar depois) filtra o resultado já juntado. São coisas diferentes.

## INNER JOIN
`JOIN` sozinho já É um `INNER JOIN` por padrão. Ele só mostra as linhas que TÊM correspondência nos DOIS lados.
```sql
SELECT alunos.nome AS aluno, turmas.nome AS turma
FROM alunos
INNER JOIN turmas ON alunos.turma_id = turmas.id;
```
Se eu tivesse um aluno sem turma (`turma_id` vazio) ou uma turma sem nenhum aluno, NENHUM dos dois apareceria. O `INNER JOIN` só mostra a "interseção".

# Nota: sempre que as duas tabelas tiverem coluna com o MESMO nome, prefixe com `tabela.coluna`, senão o MySQL acusa erro de ambiguidade.
