# 01 - MongoDB (NoSQL)

NoSQL surgiu em 2009. O nome significa **Não apenas SQL**, não veio pra substituir o banco relacional, veio pra complementar em casos onde ele não resolve bem, principalmente dados sem estrutura fixa e volume muito alto.

## Relational DB vs Non-relational DB
```text
Relacional                        Não relacional
Segue padrão ANSI                 Não segue padrão
Linguagem SQL                     Linguagem própria
Armazenamento em tabelas          Estrutura própria
Esquema fixo                      Sem esquema fixo (schemaless)
```

## Types of NoSQL databases
- **Documento** → dados como objetos, cada um pode ter campos diferentes. Ex: **MongoDB**
- **Chave/valor** → tabela de duas colunas só: chave e valor. Ex: **Redis**
- **Colunar** → orientado a colunas, cada registro tem as colunas que precisar. Ex: **Cassandra**
- **Grafo** → tudo são nós e relacionamentos. Ex: **Neo4j**

## MongoDB
- 5° banco de dados mais utilizado no mundo, no mesmo nível de SQL Server, PostgreSQL, MySQL e Oracle
- Baseado em documentos em formato JSON (por baixo é BSON)
- Sem esquema fixo, cada documento pode ter campos diferentes na mesma coleção
- Open source, gratuito, roda em Linux, Mac e Windows
- **Réplicas**: além do servidor principal, dá pra ter mais 2 cópias em outras máquinas, garantindo disponibilidade se um cair
- **Cluster**: espalha os dados em várias máquinas, garantindo capacidade pra lidar com grande volume
- Versões:
  - **Community** → gratuita, pra desenvolvimento e uso geral, cobre tudo que precisa no dia a dia
  - **Enterprise** → paga, adiciona segurança avançada, suporte especializado e ferramentas extras
  - **Atlas** → hospedada na nuvem, tem tier gratuito com cluster de 512 MB

---

## Database and collections

```js
use nomeDoBanco              // cria ou acessa o banco
db.dropDatabase()            // remove o banco atual

db.createCollection("series") // cria coleção
db.series.drop()              // remove coleção
```

> Nota: banco e coleção só aparecem depois que o primeiro documento é inserido.

---

## Documents

Documento é um objeto BSON, composto de pares campo/valor:
```json
{
  "_id": ObjectId("..."),
  "titulo": "Breaking Bad",
  "genero": "Drama",
  "temporadas": 5,
  "ativo": true
}
```
O `_id` é gerado automaticamente, funciona como chave primária.

### Data types
```text
String    → texto
Number    → inteiro ou decimal
Boolean   → true / false
Array     → lista de valores
Object    → documento dentro de documento
Date      → data/hora
ObjectId  → identificador único gerado automaticamente
Null      → campo vazio
```

### Inserting
```js
db.series.insertOne({
  titulo: "Breaking Bad",
  genero: "Drama",
  temporadas: 5
})

db.series.insertMany([
  { titulo: "Dark", genero: "Sci-fi", temporadas: 3 },
  { titulo: "Stranger Things", genero: "Sci-fi", temporadas: 4 }
])
```

---

## Find
```js
db.series.find()                              // retorna tudo
db.series.find({ genero: "Drama" })           // filtra por campo
db.series.find({ temporadas: { $gt: 3 } })   // temporadas > 3
```
```text
$gt  → maior que       $lt  → menor que
$gte → maior ou igual  $lte → menor ou igual
$eq  → igual           $ne  → diferente
```

---

## Update
```js
db.series.updateOne(
  { titulo: "Dark" },
  { $set: { temporadas: 3 } }      // $set = altera só esses campos
)

db.series.updateMany(
  { genero: "Sci-fi" },
  { $set: { genero: "Ficção científica" } }
)

db.series.replaceOne(               // substitui o documento inteiro
  { titulo: "Dark" },
  { titulo: "Dark", genero: "Sci-fi", temporadas: 3, pais: "Alemanha" }
)
```

## Delete
```js
db.series.deleteOne({ titulo: "Dark" })
db.series.deleteMany({ genero: "Sci-fi" })
```