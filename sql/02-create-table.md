# 02 - Create Table (DDL)

DDL = Data Definition Language. Define a ESTRUTURA do banco, não mexe nos dados.

## Tabela simples
```sql
CREATE TABLE jogos (
    titulo VARCHAR(50),
    genero VARCHAR(30),
    nota   DECIMAL(3,1),
    ano    YEAR
);
```

## Criando o banco antes
```sql
CREATE DATABASE meus_jogos
DEFAULT CHARACTER SET utf8
DEFAULT COLLATE utf8_general_ci;
```

## Tabela com regras
```sql
CREATE TABLE jogos (
    id     INT         NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    genero VARCHAR(30),
    nota   DECIMAL(3,1),
    ano    YEAR,
    PRIMARY KEY (id)
) DEFAULT CHARSET = utf8;
```

## O que cada regra faz
```text
AUTO_INCREMENT  → o banco numera sozinho (1, 2, 3...)
PRIMARY KEY(id) → id é a coluna principal, nunca repete
NOT NULL        → campo obrigatório, não aceita vazio
DECIMAL(3,1)    → número com 1 casa decimal (ex: 9.5)
DEFAULT CHARSET → suporte a acentos
```

## IF NOT EXISTS
Cria a tabela só se ela ainda não existe. Sem isso, dá erro se já tiver uma com o mesmo nome.
```sql
CREATE TABLE IF NOT EXISTS jogos (
    id     INT         NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    genero VARCHAR(30),
    nota   DECIMAL(3,1),
    ano    YEAR,
    PRIMARY KEY (id)
) DEFAULT CHARSET = utf8;
```
