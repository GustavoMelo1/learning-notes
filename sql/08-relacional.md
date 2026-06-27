# 08 - Relational Model (explained simply and directly)

Modelo relacional é o jeito que o banco de dados usa para guardar informação em **caixas** (tabelas) e **ligar uma caixa na outra**. "Relacional" vem de "relação" — ou seja, como as caixas se conectam.

Vou explicar passo a passo, sem pressa, com exemplos bem concretos.

## 1. What is a table

Uma tabela é uma **caixa com etiquetas**. Cada etiqueta é uma coluna. Cada item dentro da caixa é uma linha.

Exemplo: uma caixa chamada `alunos`.

```text
+----+----------+--------+
| id | nome     | idade  |
+----+----------+--------+
| 1  | Lucas    | 10     |
| 2  | Marina   | 11     |
| 3  | Pedro    | 10     |
+----+----------+--------+
```

- A caixa se chama **alunos**.
- As etiquetas são: `id`, `nome`, `idade`. Isso são as **colunas**.
- Cada linha (1, 2, 3) é **uma pessoa só**. Isso são as **linhas**.

Regra fixa: cada coluna guarda sempre o mesmo tipo de coisa. A coluna `idade` é sempre número. A coluna `nome` é sempre texto. Isso nunca muda.

## 2. Primary Key — the row's "ID document"

Toda tabela precisa de uma coluna que **nunca se repete**. Essa coluna é a chave primária. Ela serve para identificar uma linha sem confusão, igual um documento de identidade.

```text
+----+----------+
| id | nome     |   <- "id" é a chave primária
+----+----------+
| 1  | Lucas    |
| 2  | Marina   |
| 3  | Pedro    |
+----+----------+
```

Regra fixa: o `id` 1 é sempre o Lucas. Nunca muda, nunca repete, nunca é igual ao de outra pessoa.

## 3. Foreign Key — the "wire" that connects one box to another

Quando uma tabela precisa apontar para uma linha de **outra** tabela, ela usa uma chave estrangeira. É um número que copia o `id` da outra tabela. Esse número é o fio que conecta as duas caixas.

Exemplo: cada aluno pertence a uma turma.

```text
Tabela: turmas
+----+----------+
| id | nome     |
+----+----------+
| 1  | Turma A  |
| 2  | Turma B  |
+----+----------+

Tabela: alunos
+----+----------+------------+
| id | nome     | turma_id   |   <- "turma_id" é a chave estrangeira
+----+----------+------------+
| 1  | Lucas    | 1          |   -> aponta para Turma A
| 2  | Marina   | 2          |   -> aponta para Turma B
| 3  | Pedro    | 1          |   -> aponta para Turma A
+----+----------+------------+
```

Regra fixa: `turma_id = 1` significa "esse aluno está na Turma A". O número 1 em `alunos.turma_id` é o mesmo número 1 do `id` de `turmas`. É o fio que liga as duas caixas.

## 4. Connection diagram

```text
   turmas                    alunos
+----+---------+        +----+--------+----------+
| id | nome    |        | id | nome   | turma_id |
+----+---------+        +----+--------+----------+
| 1  | Turma A | <------| 1  | Lucas  |    1     |
|    |         | <------| 3  | Pedro  |    1     |
| 2  | Turma B | <------| 2  | Marina |    2     |
+----+---------+        +----+--------+----------+
```

A flecha mostra: o `turma_id` do aluno aponta para o `id` da turma.

## 5. The 3 types of relationship

Existem só 3 jeitos de duas caixas se ligarem. Sempre é um desses três.

Antes de ver os exemplos, o que significa cada letra na notação:
- **1** = "um". Quer dizer: só existe **uma** linha do outro lado.
- **N** = "muitos". Quer dizer: pode existir **várias** linhas do outro lado.

Por isso "1:N" se lê "um para muitos", e "N:1" se lê "muitos para um". É a mesma relação, só que olhada de lados diferentes — vou mostrar isso no item 5.2.

### 5.1 — One to One (1:1)

Uma linha de uma tabela liga com **exatamente uma** linha da outra tabela. Nunca mais que uma.

Exemplo: cada pessoa tem **um** passaporte. Esse passaporte é só dela.

```text
pessoas                  passaportes
+----+--------+         +----+----------+-----------+
| id | nome   |         | id | numero   | pessoa_id |
+----+--------+         +----+----------+-----------+
| 1  | Ana    | <------- | 1  | AB1234   |     1     |
| 2  | Bruno  | <------- | 2  | CD5678   |     2     |
+----+--------+         +----+----------+-----------+
```

Regra fixa: 1 pessoa = 1 passaporte. Não existe pessoa com dois passaportes nesse exemplo.

### 5.2 — One to Many (1:N)

Uma linha de uma tabela liga com **várias** linhas da outra tabela. É o exemplo que já vimos: uma turma tem vários alunos.

```text
turmas                        alunos
+----+---------+         +----+--------+----------+
| id | nome    |         | id | nome   | turma_id |
+----+---------+         +----+--------+----------+
| 1  | Turma A | <------ | 1  | Lucas  |    1     |
|    |         | <------ | 3  | Pedro  |    1     |
| 2  | Turma B | <------ | 2  | Marina |    2     |
+----+---------+         +----+--------+----------+
```

Regra fixa: 1 turma pode ter muitos alunos. Mas 1 aluno está em uma turma só.

### 5.2.1 — Many to One (N:1) — the same relationship, seen from the other side

"1:N" e "N:1" não são duas relações diferentes. É **a mesma ligação**, só que cada nome olha de um lado:

- Olhando da turma para os alunos: **1 turma → N alunos** (1:N).
- Olhando dos alunos para a turma: **N alunos → 1 turma** (N:1).

```text
   alunos                       turmas
+----+--------+----------+         +----+---------+
| id | nome   | turma_id |         | id | nome    |
+----+--------+----------+         +----+---------+
| 1  | Lucas  |    1     | ------> | 1  | Turma A |
| 3  | Pedro  |    1     | ------> | 1  | Turma A |
| 2  | Marina |    2     | ------> | 2  | Turma B |
+----+--------+----------+         +----+---------+
```

Regra fixa: quem tem a chave estrangeira (o `turma_id`) é sempre o lado "N" (muitos). Quem é apontado é sempre o lado "1" (um).

### 5.3 — Many to Many (N:N)

Várias linhas de uma tabela ligam com várias linhas da outra tabela. Para isso, precisa de uma **terceira caixa** no meio, que só guarda os pares.

Exemplo: um aluno pode estar em várias matérias, e uma matéria tem vários alunos.

```text
alunos                tabela do meio: aluno_materia          materias
+----+--------+      +-----------+------------+         +----+-----------+
| id | nome   |      | aluno_id  | materia_id |         | id | nome      |
+----+--------+      +-----------+------------+         +----+-----------+
| 1  | Lucas  | <---- |    1      |     1      | ----->  | 1  | Matemática|
| 2  | Marina | <---- |    1      |     2      | ----->  | 2  | Português |
|    |        | <---- |    2      |     1      |
+----+--------+      +-----------+------------+         +----+-----------+
```

Como ler essa tabela do meio:
- Linha 1: Lucas (1) está em Matemática (1).
- Linha 2: Lucas (1) está em Português (2).
- Linha 3: Marina (2) está em Matemática (1).

Regra fixa: a tabela do meio só existe para guardar os pares. Ela não tem outra função.

## 6. Quick summary (for review)

| Relationship type | What it means | Example |
|---|---|---|
| 1:1 | uma linha liga com exatamente uma linha | pessoa → passaporte |
| 1:N | uma linha liga com várias linhas | turma → alunos |
| N:1 | várias linhas ligam com uma só (mesma coisa que 1:N, do outro lado) | alunos → turma |
| N:N | várias linhas ligam com várias linhas (precisa de tabela do meio) | alunos ↔ matérias |

Pontos fixos que nunca mudam:
1. Tabela = caixa. Coluna = etiqueta. Linha = item dentro da caixa.
2. Chave primária (`id`) nunca se repete dentro da mesma tabela.
3. Chave estrangeira é um número que copia o `id` de outra tabela — é o fio que liga as caixas.
4. Toda relação entre tabelas é sempre um desses três tipos: 1:1, 1:N ou N:N.
