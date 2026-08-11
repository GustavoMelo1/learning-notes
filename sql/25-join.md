# Join

Serve basicamente para unir duas tabelas, que tenham um campo em comum em ambas. Uma tabela deve conter uma coluna que seja uma referência para a outra tabela e somente então poderemos executar as junções.

```sql
SELECT j.titulo, d.nome AS desenvolvedor
FROM jogos j
JOIN desenvolvedores d ON j.desenvolvedor_id = d.id;

/*
╭──────────────────┬──────────────────╮
│ titulo           │ desenvolvedor    │
╞══════════════════╪══════════════════╡
│ Minecraft        │ Mojang           │
│ Elden Ring       │ FromSoftware     │
│ Valorant         │ Riot Games       │
╰──────────────────┴──────────────────╯
*/
```

# Inner Join 

Pode ser executado nas duas tabelas, porem e necessario que tenha pelo menos uma coluna em comum para executar o INNER JOIN, 
ele retornar tudo se a condicao especifica for atendida e as  linhas resultantes formarem uma nova tabela. 

```sql
SELECT t.name, d.dept
FROM Professores AS t 
INNER JOIN departamento AS d ON t.Id = d.Id;

/*
╭──────────────────┬──────────────────╮
│ name             │ dept             │
╞══════════════════╪══════════════════╡
│ Ana              │ Matemática       │
│ Carlos           │ Física           │
╰──────────────────┴──────────────────╯
  só retorna quem tem departamento cadastrado
*/
```

# Left Join

Left Join(LEFT OUTER JOIN) recupera todos os registros da tabela da esquerda e apenas os registros correspondentes da tabela da direita, caso nao for encontrado vai retornar null. 

```sql
SELECT Emp.EmpID, Emp.Name, department.department_name,
department.department_head, department.location 
FROM Emp
LEFT JOIN department ON Emp.department_id = department.department_id;

/*
╭───────┬────────┬─────────────────┬──────────────────┬──────────╮
│ EmpID │ Name   │ department_name │ department_head  │ location │
╞═══════╪════════╪═════════════════╪══════════════════╪══════════╡
│ 1     │ Ana    │ TI              │ João             │ SP       │
│ 2     │ Carlos │ RH              │ Maria            │ RJ       │
│ 3     │ Pedro  │ NULL            │ NULL             │ NULL     │
╰───────┴────────┴─────────────────┴──────────────────┴──────────╯
  Pedro aparece mesmo sem departamento cadastrado
*/
```

# Right Join

Right Join recupera todos os registros da tabela da direita e apenas os registros correspondentes da tabela da direita, caso nao for encontrado vai retornal null.

```sql
SELECT e.emp_no, e.emp_name, d.d_name, d.location
FROM employee e
RIGHT JOIN dept d ON e.dept_no = d.dept_no;

/*
╭────────┬──────────┬────────────┬──────────╮
│ emp_no │ emp_name │ d_name     │ location │
╞════════╪══════════╪════════════╪══════════╡
│ 1      │ Ana      │ TI         │ SP       │
│ NULL   │ NULL     │ Financeiro │ MG       │
╰────────┴──────────┴────────────┴──────────╯
  Financeiro aparece mesmo sem funcionário cadastrado
*/
```

# Full Outer Join 

O Outer Join (também conhecido por Full Outer Join ou Full Join), tem como resultado todoos os registros que estao na Tabela A e todos os registros da tabela B

```sql
SELECT a.Nome, b.Nome
FROM TabelaA AS a
FULL OUTER JOIN TabelaB AS b ON a.Nome = b.Nome;

/*
╭──────────┬──────────╮
│ a.Nome   │ b.Nome   │
╞══════════╪══════════╡
│ Ana      │ Ana      │
│ Carlos   │ NULL     │
│ NULL     │ Maria    │
╰──────────┴──────────╯
  Ana: match dos dois lados
  Carlos: só na TabelaA → NULL na B
  Maria: só na TabelaB → NULL na A
*/
```

# Anti Join

Retorna apenas os registros de uma tabela que não têm correspondência na outra. No MySQL não existe ANTI JOIN como palavra-chave — usa-se LEFT JOIN com WHERE IS NULL.

```sql
SELECT e.emp_no, e.emp_name
FROM employee e
LEFT JOIN dept d ON e.dept_no = d.dept_no
WHERE d.dept_no IS NULL;

/*
╭────────┬──────────╮
│ emp_no │ emp_name │
╞════════╪══════════╡
│ 3      │ Pedro    │
╰────────┴──────────╯
  Pedro não tem departamento — só ele aparece
*/
```