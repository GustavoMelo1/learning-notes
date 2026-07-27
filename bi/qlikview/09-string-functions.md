# String Functions

```
Upper(Produto)               // 'notebook' → 'NOTEBOOK'
Lower(Produto)               // 'NOTEBOOK' → 'notebook'
Proper(Produto)              // 'notebook gamer' → 'Notebook Gamer'

Trim(Produto)                // remove espaços no início e no fim
Left(Produto, 3)             // 3 primeiros caracteres
Right(Produto, 3)            // 3 últimos caracteres
Mid(Produto, 2, 4)           // 4 caracteres a partir da posição 2
Len(Produto)                 // quantidade de caracteres

Replace(Produto, 'NB', 'Notebook')          // substitui todas as ocorrências
Categoria & ' - ' & Produto                 // concatenar: 'Eletrônico - Notebook'
```

## SubField (separar campo por delimitador)
```
// campo: 'Notebook;Mouse;Teclado'
SubField(Produto, ';', 1)    // 'Notebook'
SubField(Produto, ';', 2)    // 'Mouse'
SubField(Produto, ';')       // cria uma linha pra cada parte
```
