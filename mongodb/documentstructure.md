# Documents of a Structure

O Mongo db armazena os registros e trabalha principalmente com Documentos BSON( Representacao binaria do JSON) ele basicamente tem maiores funcionalidades que o JSON.
O valor de um campo em um documento pode ser qualquer um dos tipos de dados BSON, incluindo outros documentos, matrizes e matrizes de documentos.

```
Tipos de dados
├── NULL         → valor nulo
├── Boolean      → true ou false
├── Number       → número com sinal (suporta notação exponencial E)
├── Inteiro      → 32 bits ou 64 bits (assinado)
├── String       → sequência de caracteres Unicode
├── Object       → documentos aninhados (chave/valor, não ordenado)
├── Array        → lista ordenada de qualquer tipo [ ]
├── ObjectId     → identificador único de um registro
└── Date
    ├── Date()       → data atual como string
    ├── new Date()   → objeto de data
    └── ISODate()    → objeto de data
```