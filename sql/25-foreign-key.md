# 25 - Foreign Key

Chave estrangeira é uma coluna que aponta pro `id` de outra tabela, criando a ligação entre elas. Ver teoria completa em [22-relational-model.md](22-relational-model.md).

## Regra pra criar uma relação 1:N
1. A tabela do lado "1" (ex: `turmas`) precisa existir ANTES, com sua `PRIMARY KEY`.
2. A tabela do lado "N" (ex: `alunos`) ganha uma coluna extra (ex: `turma_id`) do MESMO TIPO da chave primária referenciada.
3. Essa coluna vira `FOREIGN KEY`, apontando pra `turmas(id)`.
4. As duas tabelas precisam estar em `InnoDB`.

## Criando as tabelas
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

Adicionando a FK com `ALTER TABLE` (jeito mais comum quando a tabela já existe):
```sql
ALTER TABLE alunos
ADD FOREIGN KEY (turma_id)
REFERENCES turmas(id);
```

## O que é MUL?
Depois de criar a FK, rodando `DESCRIBE alunos;`, a coluna `turma_id` aparece com `MUL` na coluna `Key`. `MUL` significa que essa coluna é um índice onde o valor PODE se repetir (faz sentido, vários alunos podem ter o mesmo `turma_id`). O MySQL cria esse índice sozinho quando você cria a FK.

## Inserindo os dados
```sql
INSERT INTO turmas (nome) VALUES ('Turma A'), ('Turma B');

INSERT INTO alunos (nome, turma_id) VALUES
('Lucas',  1),
('Marina', 2),
('Pedro',  1);
```

## Integridade referencial — por que a FK importa
A chave estrangeira TRAVA o banco pra impedir dado quebrado.

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

# Nota: opções de `ON DELETE` e `ON UPDATE` ao criar a FK:
# - `NO ACTION` / `RESTRICT` → **padrão**. Retorna erro se tentar apagar/alterar o pai enquanto tiver filho apontando.
# - `CASCADE` → apaga/altera o filho automaticamente junto com o pai.
# - `SET NULL` → zera a coluna FK do filho quando o pai some.
# Na dúvida, `NO ACTION` é o mais seguro.
