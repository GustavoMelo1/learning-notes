# SQL 01-Basics 

# Tipos Primitivos (MySQL)
```text
Numérico
├── Inteiro (sem vírgula)
│   ├── TinyInt    → bem pequeno (até ~127). Ex: idade
│   ├── SmallInt   → pequeno
│   ├── MediumInt  → médio
│   ├── Int        → padrão (até ~2 bi). Na dúvida, use esse
│   └── BigInt     → gigante. Ex: IDs de redes sociais
├── Real (com vírgula)
│   ├── Decimal    → EXATO. Dinheiro é SEMPRE aqui
│   ├── Float      → aproximado, leve
│   └── Double     → aproximado, mais precisão que Float
└── Lógico
    ├── Bit        → 0 ou 1
    └── Boolean    → true/false. Ex: cliente_ativo

Data/Tempo
├── Date       → só data (2026-06-12)
├── Time       → só hora (14:30)
├── DateTime   → data + hora
├── TimeStamp  → data + hora; usado pra "criado/alterado em"
└── Year       → só o ano

Literal
├── Caractere
│   ├── Char(n)    → tamanho FIXO, preenche com espaços. Ex: UF(2)
│   └── VarChar(n) → tamanho variável até o teto n. Ex: nome, email
├── Texto
│   └── TinyText → Text → MediumText → LongText (texto longo, muda só o limite)
├── Binário
│   └── TinyBlob → Blob → ... (arquivo cru no banco — na prática, salva só o caminho)
└── Coleção
    ├── Enum   → escolhe UM da lista. Ex: status(ativo, inativo)
    └── Set    → escolhe VÁRIOS da lista. Ex: toppings

Espacial
└── Geometry, Point, Polygon → mapas e coordenadas (= meus Polygons do GeoPandas)
```

**Mais usados:** Int, Decimal, Boolean, Date/DateTime, VarChar, Text

-----------------------------------------------------------------------------------------------------

# Create a Table

# Criando, inserindo e deletando tabelas

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

# Table atualizada e com regras de cadastro

```sql
create database cadastro
default character set utf8
default collate utf8_general_ci;

create table `pessoas` (
    `id`            int          not null auto_increment,
    `nome`          varchar(30)  not null,
    `nascimento`    date,
    `sexo`          enum('M', 'F'),
    `peso`          decimal(5,2),
    `altura`        decimal(3,2),
    `nacionalidade` varchar(20)  default 'Brasil',
    primary key (id)
) default charset = utf8;
```

# Melhorias aplicadas
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