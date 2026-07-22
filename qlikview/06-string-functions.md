# 06 - String Functions

Funções pra manipular texto no script ou em expressões.

## Maiúscula / Minúscula
```
Upper(Produto)        // 'notebook' → 'NOTEBOOK'
Lower(Produto)        // 'NOTEBOOK' → 'notebook'
Proper(Produto)       // 'notebook gamer' → 'Notebook Gamer'
```

## Remover espaços
```
Trim(Produto)         // remove espaços no início e no fim
LTrim(Produto)        // remove só do início (left)
RTrim(Produto)        // remove só do fim (right)
```

## Pegar parte de um texto
```
Left(Produto, 3)      // 3 primeiros caracteres
Right(Produto, 3)     // 3 últimos caracteres
Mid(Produto, 2, 4)    // 4 caracteres a partir da posição 2
```

## Tamanho
```
Len(Produto)          // quantidade de caracteres
```

## Dividir campo por delimitador
`SubField` é muito usado pra separar campos que vêm colados:
```
// campo Produto tem 'Notebook;Mouse;Teclado'
SubField(Produto, ';', 1)   // 'Notebook' (primeira parte)
SubField(Produto, ';', 2)   // 'Mouse'    (segunda parte)

// sem índice, cria uma linha pra cada parte (explode o campo)
SubField(Produto, ';')
```

## Substituir texto
```
Replace(Produto, 'Notebook', 'Laptop')   // troca todas as ocorrências
```

## Concatenar
```
Categoria & ' - ' & Produto    // 'Eletrônico - Notebook'
```
