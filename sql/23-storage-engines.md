# 23 - Storage Engines

A Engine é o "motor" que realmente guarda e organiza os dados no disco. A sintaxe do SQL (`SELECT`, `INSERT`...) é sempre a mesma por cima, mas por baixo cada engine lida diferente com travamento de linha, transação e índice. Cada tabela pode até ter uma engine diferente dentro do mesmo banco.

## InnoDB (a engine padrão)
`InnoDB` é a engine padrão do MySQL desde a versão 5.5, e é praticamente sempre a escolha certa porque:
- Suporta **FOREIGN KEY** (chave estrangeira), sem ela não dá pra ligar tabelas de verdade.
- Suporta **transações** (várias operações que só "valem" se todas derem certo).
- Trava por LINHA, não a tabela inteira, várias pessoas conseguem mexer no banco ao mesmo tempo sem travar tudo.

## Outras engines (só pra saber que existem)
- `MyISAM` → engine antiga, NÃO suporta FK nem transação, trava a TABELA inteira pra escrever. Hoje em dia evitar.
- `MEMORY` → guarda tudo na RAM. Rápido, mas some quando o servidor reinicia. Útil só pra tabela temporária.
- `NDB` (cluster) → também suporta FK, mas só aparece em banco distribuído. Raro no dia a dia.

Na prática: **97% das vezes é InnoDB.**

## Por que o MyISAM caiu em desuso
- Sem FK → não dá pra garantir que os dados ligados entre tabelas fazem sentido.
- Sem transação → não dá pra desfazer (rollback) se algo no meio do processo der errado.
- Trava a tabela inteira → se duas pessoas tentam escrever ao mesmo tempo, uma espera a outra terminar.

## Declarando a engine no CREATE TABLE
```sql
CREATE TABLE turmas (
    id   INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB;
```
Na dúvida, **sempre `ENGINE = InnoDB`**. Como já é o padrão do MySQL moderno, na maioria das vezes nem precisa escrever, mas é bom saber declarar pra não cair numa tabela MyISAM por engano em banco antigo.
