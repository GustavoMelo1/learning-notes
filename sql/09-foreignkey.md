# 09 - Foreign Keys and Storage Engines

Antes de ligar tabelas de verdade preciso entender DUAS coisas: como o MySQL guarda os dados por baixo (Engine) e como criar a chave estrangeira (Foreign Key) que conecta uma tabela na outra.

## What is a Storage Engine
A Engine é o "motor" que realmente guarda e organiza os dados no disco. A sintaxe do SQL (`SELECT`, `INSERT`...) é sempre a mesma por cima, mas por baixo cada engine lida diferente com travamento de linha, transação e índice. Cada tabela pode até ter uma engine diferente dentro do mesmo banco.

## InnoDB (a engine padrão)
`InnoDB` é a engine padrão do MySQL desde a versão 5.5, e é praticamente sempre a escolha certa porque:
- Suporta **FOREIGN KEY** (chave estrangeira), sem ela não dá pra ligar tabelas de verdade.
- Suporta **transações** (várias operações que só "valem" se todas derem certo).
- Trava por LINHA, não a tabela inteira, várias pessoas conseguem mexer no banco ao mesmo tempo sem travar tudo.

## Outras engines (rapidinho, só pra saber que existem)
- `MyISAM` → engine antiga, NÃO suporta FK nem transação, trava a TABELA inteira pra escrever. Hoje em dia evitar.
- `MEMORY` → guarda tudo na RAM. Rápido, mas some quando o servidor reinicia. Útil só pra tabela temporária.
- `NDB` (cluster) → também suporta FK, mas só aparece em banco distribuído de cluster. Raro no dia a dia.

Na prática: **97% das vezes é InnoDB.**

## Why MyISAM fell out of use
Resumo direto:
- Sem FK → não dá pra garantir que os dados ligados entre tabelas fazem sentido (integridade referencial).
- Sem transação → não dá pra desfazer (rollback) se algo no meio do processo der errado.
- Trava a tabela inteira → se duas pessoas tentam escrever ao mesmo tempo, uma espera a outra terminar.

## What is A.C.I.D.
ACID é o conjunto de 4 garantias que uma engine séria (tipo InnoDB) precisa cumprir numa transação. Pra ficar concreto, vou usar sempre o mesmo exemplo: **transferir R$100 da conta do João pra conta da Maria.**

- **Atomicidade** → ou faz TUDO, ou não faz NADA. Debitar do João e creditar na Maria é uma operação só. Se debitar e o sistema cair antes de creditar, a transação inteira é desfeita, o João não fica sem o dinheiro "no limbo".
- **Consistência** → o banco sai de um estado válido e cai em outro estado válido. Se existe uma regra tipo "saldo não pode ficar negativo", a transação não pode deixar o banco num estado que quebra essa regra.
- **Isolamento** → transações acontecendo ao mesmo tempo não enxergam o "meio do caminho" uma da outra. Se outra pessoa consultar o saldo do João no meio da transferência, ela vê o saldo ANTES ou DEPOIS da operação completa, nunca um estado quebrado no meio.
- **Durabilidade** → depois que a transação termina (`COMMIT`), o dado tá salvo de verdade. Mesmo que o servidor caia um segundo depois, a transferência não se perde.

## Which engines support ACID
`InnoDB` → sim, todas as 4 garantias.
`MyISAM` → não, não tem transação nem isolamento de verdade.

## Choosing the engine when creating a table
```sql
CREATE TABLE turmas (
    id   INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB;
```
Regra prática: na dúvida, **sempre `ENGINE = InnoDB`**. Como já é o padrão do MySQL moderno, na maioria das vezes nem precisa escrever, mas é bom saber declarar pra não cair numa tabela MyISAM por engano em banco antigo.

---

## One-to-Many relationship — recap rápido
Já vi a teoria completa no [08-relacional.md](08-relacional.md). Resumindo: numa relação 1:N, o lado "muitos" guarda uma coluna a mais, a chave estrangeira, que aponta pro `id` do lado "um".

## Rule for creating a one-to-many relationship
1. A tabela do lado "1" (ex: `turmas`) precisa existir ANTES, com sua `PRIMARY KEY`.
2. A tabela do lado "N" (ex: `alunos`) ganha uma coluna extra (ex: `turma_id`) do MESMO TIPO da chave primária referenciada.
3. Essa coluna vira `FOREIGN KEY`, apontando pra `turmas(id)`.
4. As duas tabelas precisam estar numa engine que suporte FK (`InnoDB`).

## Practical part: creating the Foreign Key
```sql
CREATE TABLE turmas (
    id   INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE alunos (
    id        INT NOT NULL AUTO_INCREMENT,
    nome      VARCHAR(50) NOT NULL,
    turma_id  INT,
    PRIMARY KEY (id)
) ENGINE = InnoDB;
```

Adicionando a FK depois, com `ALTER TABLE` (jeito mais comum quando a tabela já existe):
```sql
ALTER TABLE alunos
ADD FOREIGN KEY (turma_id)
REFERENCES turmas(id);
```

## What is MUL?
Depois de criar a FK, rodando `DESCRIBE alunos;`, a coluna `turma_id` aparece com `MUL` na coluna `Key`. `MUL` significa que essa coluna é a primeira de um índice onde o valor PODE se repetir, faz sentido porque vários alunos podem ter o mesmo `turma_id`. O MySQL cria esse índice sozinho quando você cria a FK (ele precisa do índice pra checar a integridade rápido).

## Registering the foreign keys
```sql
INSERT INTO turmas (nome) VALUES
('Turma A'),
('Turma B');

INSERT INTO alunos (nome, turma_id) VALUES
('Lucas',  1),
('Marina', 2),
('Pedro',  1);
```

## Referential Integrity — por que a FK importa de verdade
A chave estrangeira não é só decoração, ela TRAVA o banco pra impedir dado quebrado.

Tentando inserir um aluno numa turma que não existe:
```sql
INSERT INTO alunos (nome, turma_id) VALUES ('Ana', 99);
-- Error: Cannot add or update a child row: a foreign key constraint fails
```

Tentando apagar uma turma que ainda tem aluno vinculado:
```sql
DELETE FROM turmas WHERE id = 1;
-- Error: Cannot delete or update a parent row: a foreign key constraint fails
```

Isso é a **integridade referencial**: o banco nunca deixa um aluno apontar pra uma turma que não existe (nem deixa apagar a turma e abandonar os alunos órfãos).

# Nota: as opções de `ON DELETE` e `ON UPDATE` ao criar a FK:
# - `NO ACTION` / `RESTRICT` → **padrão**. Retorna erro se tentar apagar/alterar o pai enquanto tiver filho apontando pra ele. Ex: deletar o livro que tem estoque vinculado vai retornar erro.
# - `CASCADE` → apaga/altera o filho automaticamente junto com o pai.
# - `SET NULL` → zera a coluna FK do filho quando o pai some.
# Na dúvida, `NO ACTION` é o mais seguro, o banco avisa antes de deixar dado órfão.
