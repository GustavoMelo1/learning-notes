# 01 - MongoDB (NoSQL)

NoSQL surgiu em 2009 pra suprir necessidades que o SQL não conseguia, principalmente com o crescimento gigante da internet e a quantidade absurda de dados sendo gerados ao mesmo tempo. O nome no começo era "Não SQL", mas causava confusão porque parecia um movimento contra o SQL. A tradução correta hoje é **Não apenas SQL**, porque o objetivo nunca foi substituir, e sim complementar.

## Why NoSQL
Com o crescimento da internet, surgiram necessidades que o banco relacional não resolvia bem:
- muito mais dados sendo gerados simultaneamente
- necessidade de maior armazenamento
- necessidade de maior desempenho nas consultas
- dados nem sempre estruturados (usuários de streaming gerando dados de formatos diferentes)

## Relational DB vs Non-relational DB
```text
Relacional                        Não relacional
Segue padrão ANSI                 Não segue padrão
Linguagem SQL                     Linguagem própria de consulta
Armazenamento em tabelas          Estrutura própria de armazenamento
Esquema fixo                      Sem esquema fixo (schemaless)
```

## Types of NoSQL databases
- **Documento** → armazena dados como documentos (objetos). Cada documento pode ter campos diferentes. Ex: **MongoDB**
- **Chave/valor** → banco inteiro funciona como uma tabela de duas colunas: chave e valor. Ex: **Redis**
- **Colunar** → estrutura parecida com tabela, mas orientada a colunas, cada registro pode ter quantas colunas precisar. Ex: **Cassandra**
- **Grafo** → tudo são nós e relacionamentos, sem tabelas ou documentos. Ex: **Neo4j**

## Knowing MongoDB
- 5° banco de dados mais utilizado no mundo
- Baseado em documentos (tipo documento é o foco)
- Formatação JSON (por baixo é BSON, mas a interface é JSON)
- Sem esquema fixo, cada documento pode ter campos diferentes na mesma coleção
- Usado por empresas como EA Sports FIFA pra armazenar dados de milhões de jogadores

## Versions
- **Community Edition** → gratuita, pra uso geral
- **Enterprise Edition** → paga, com suporte e recursos extras
- **Atlas** → versão cloud (não precisa instalar nada, roda no navegador)

---

## Database and collections

### Installation
Pra rodar local, instala os três:
- **Community Edition** → o banco em si
- **MongoDB Compass** → interface gráfica pra mexer no banco
- **mongosh** → shell de linha de comando (MongoDB Shell)

### Creating and removing a database
No Compass: botão "Create Database" na tela inicial.
No mongosh:
```js
use nomeDoBanco        // cria ou acessa o banco
db.dropDatabase()      // remove o banco atual
```

### Creating and removing a collection
No Compass: dentro do banco, botão "Create Collection".
No mongosh:
```js
db.createCollection("nomeDaColecao")   // cria
db.nomeDaColecao.drop()                // remove
```

> Nota: no MongoDB, banco e coleção só aparecem de verdade depois que o primeiro documento é inserido.

---

## Documents

### Structure
Documentos são objetos BSON (Binary JSON), compostos de pares campo/valor:
```json
{
  "_id": ObjectId("..."),
  "titulo": "Breaking Bad",
  "genero": "Drama",
  "temporadas": 5,
  "ativo": true
}
```
O `_id` é gerado automaticamente e funciona como a chave primária do documento.

### Data types
```text
String        → texto
Number        → inteiro ou decimal
Boolean       → true / false
Array         → lista de valores
Object        → objeto aninhado (documento dentro de documento)
Date          → data/hora
ObjectId      → identificador único gerado automaticamente
Null          → campo vazio
```

### Inserting documents

**MongoDB Compass:** botão "Insert Document" dentro da coleção.

**mongosh:**
```js
// inserir um documento
db.series.insertOne({
  titulo: "Breaking Bad",
  genero: "Drama",
  temporadas: 5
})

// inserir vários de uma vez
db.series.insertMany([
  { titulo: "Dark", genero: "Sci-fi", temporadas: 3 },
  { titulo: "Stranger Things", genero: "Sci-fi", temporadas: 4 }
])
```

### Importing documents
No Compass: botão "Import Data" dentro da coleção, aceita JSON e CSV.

---

## Find method

**MongoDB Compass:** aba "Find" dentro da coleção, com filtros em formato JSON.

**mongosh:**
```js
db.series.find()                          // retorna tudo
db.series.find({ genero: "Drama" })       // filtra por campo
db.series.find({ temporadas: { $gt: 3 } }) // temporadas > 3
```
Operadores comuns:
```text
$gt   → maior que
$lt   → menor que
$gte  → maior ou igual
$lte  → menor ou igual
$eq   → igual
$ne   → diferente
```

---

## Update and Delete methods

### MongoDB Compass
- **Editar documento** → ícone de lápis na linha do documento
- **Copiar documento** → ícone de cópia
- **Clonar documento** → cria uma cópia com novo `_id`
- **Remover documento** → ícone de lixeira

### mongosh — Update
```js
// atualiza o primeiro documento que bater no filtro
db.series.updateOne(
  { titulo: "Dark" },
  { $set: { temporadas: 3 } }
)

// atualiza todos que baterem no filtro
db.series.updateMany(
  { genero: "Sci-fi" },
  { $set: { genero: "Ficção científica" } }
)

// substitui o documento inteiro (mantém só o _id)
db.series.replaceOne(
  { titulo: "Dark" },
  { titulo: "Dark", genero: "Sci-fi", temporadas: 3, pais: "Alemanha" }
)
```

### mongosh — Delete
```js
// remove o primeiro que bater no filtro
db.series.deleteOne({ titulo: "Dark" })

// remove todos que baterem no filtro
db.series.deleteMany({ genero: "Sci-fi" })
```

> Nota: `$set` é o operador que diz "mude só esses campos", sem ele o documento inteiro seria sobrescrito.
