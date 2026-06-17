# 02 - Create Table (DDL)

DDL = Data Definition Language. Comandos que DEFINEM a estrutura (criar, alterar, apagar tabela). Não mexem nos dados, mexem na "forma".

## Tabela simples
```sql
CREATE TABLE pessoas (
    nome varchar(30),
    idade tinyint,
    sexo char(1),
    peso float,
    altura float,
    nacionalidade varchar(20)
);
```

## Criando o banco antes da tabela
```sql
CREATE DATABASE cadastro
DEFAULT CHARACTER SET utf8
DEFAULT COLLATE utf8_general_ci;
```

## Tabela com regras de cadastro (versão melhorada)
```sql
CREATE TABLE `pessoas` (
    `id`            int          NOT NULL AUTO_INCREMENT,
    `nome`          varchar(30)  NOT NULL,
    `nascimento`    date,
    `sexo`          enum('M', 'F'),
    `peso`          decimal(5,2),
    `altura`        decimal(3,2),
    `nacionalidade` varchar(20)  DEFAULT 'Brasil',
    PRIMARY KEY (id)
) DEFAULT CHARSET = utf8;
```

## Melhorias aplicadas
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
├── nascimento date  (substituiu idade)           → idade é volátil; a data de nascimento é fixa
├── enum('M','F')    (substituiu char(1))         → trava o campo; char aceitaria qualquer letra
├── decimal(5,2)     (substituiu float em peso)   → exato: 5 dígitos totais, 2 após a vírgula
└── decimal(3,2)     (substituiu float em altura) → mesmo motivo; float é apenas aproximado

Valor padrão
└── default 'Brasil' (em nacionalidade)           → campo vazio no cadastro? banco preenche sozinho
```

## IF NOT EXISTS
Usada pra NÃO sobrescrever tabela que já existe. Se já tem uma tabela `cursos`, o comando não deixa criar de novo (não dá erro de apagar a antiga). Se não existe, ela cria.
```sql
CREATE TABLE IF NOT EXISTS cursos (
    nome varchar(30) NOT NULL UNIQUE,
    descricao text,
    carga int UNSIGNED,
    totalaulas int UNSIGNED,
    ano year DEFAULT '2016'
) DEFAULT CHARSET=utf8;
```

> Nota minha: `UNSIGNED` = só aceita número positivo (sem sinal de menos). Bom pra coisa que nunca é negativa, tipo carga horária.