# 02 - Create Table (DDL)

DDL = Data Definition Language. Comandos que DEFINEM a estrutura (criar, alterar, apagar tabela). Não mexem nos dados, mexem na "forma".

## Simple table
```sql
CREATE TABLE estacoes (
    nome varchar(30),
    anos_operacao tinyint,
    tipo char(1),
    temp_media float,
    precipitacao float,
    regiao varchar(20)
);
```

## Creating the database before the table
```sql
CREATE DATABASE clima
DEFAULT CHARACTER SET utf8
DEFAULT COLLATE utf8_general_ci;
```

## Table with registration rules (improved version)
```sql
CREATE TABLE `estacoes` (
    `id`            int          NOT NULL AUTO_INCREMENT,
    `nome`          varchar(30)  NOT NULL,
    `instalacao`    date,
    `tipo`          enum('Fixa', 'Movel'),
    `temp_media`    decimal(4,1),
    `precipitacao`  decimal(5,1),
    `regiao`        varchar(20)  DEFAULT 'Sudeste',
    PRIMARY KEY (id)
) DEFAULT CHARSET = utf8;
```

## Improvements applied
```text
Encoding
├── character set utf8 / collate utf8_general_ci  → suporte a acentos e cedilha (PT-BR) no banco
└── default charset = utf8 (no CREATE TABLE)      → garante UTF-8 na tabela, independente do banco

Sintaxe
└── crases (`) nos nomes de tabela e coluna       → evita conflito com palavras reservadas do SQL

Identificador
├── id int not null auto_increment                → número único por registro, preenchido pelo banco
└── primary key (id)                              → sinaliza a coluna principal da tabela

Obrigatoriedade
└── not null (em id e nome)                       → impede salvar o registro sem esses campos

Dados mais precisos
├── instalacao date  (substituiu anos_operacao)   → tempo de operação é volátil; a data de instalação é fixa
├── enum('Fixa','Movel') (substituiu tipo char(1))→ trava o campo; char aceitaria qualquer letra
├── decimal(4,1)     (substituiu float em temp_media)    → exato: 4 dígitos totais, 1 após a vírgula
└── decimal(5,1)     (substituiu float em precipitacao)  → mesmo motivo; float é apenas aproximado

Valor padrão
└── default 'Sudeste' (em regiao)                 → campo vazio no cadastro? banco preenche sozinho
```

## IF NOT EXISTS
Usada pra NÃO sobrescrever tabela que já existe. Se já tem uma tabela `sensores`, o comando não deixa criar de novo (não dá erro de apagar a antiga). Se não existe, ela cria.
```sql
CREATE TABLE IF NOT EXISTS sensores (
    nome varchar(30) NOT NULL UNIQUE,
    descricao text,
    alcance int UNSIGNED,
    leituras_dia int UNSIGNED,
    ano year DEFAULT '2016'
) DEFAULT CHARSET=utf8;
```

> Nota minha: `UNSIGNED` = só aceita número positivo (sem sinal de menos). Bom pra coisa que nunca é negativa, tipo alcance de sensor.
> Nota minha: `NOT NULL` = campo obrigatório — o banco recusa o INSERT se não vier um valor pra essa coluna.
