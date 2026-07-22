# 01 - LOAD

LOAD é o comando principal do script do QlikView. Ele lê dados de algum lugar e carrega na memória.

## LOAD de arquivo
```
Vendas:
LOAD
    ID,
    Produto,
    Categoria,
    Valor,
    Data,
    Regiao
FROM [lib://Dados/vendas.xlsx]
(ooxml, embedded labels, table is Plan1);
```

## LOAD com SELECT (banco de dados)
Quando a fonte é um banco SQL, o LOAD fica em cima do SELECT:
```
Vendas:
LOAD *;
SQL SELECT ID, Produto, Categoria, Valor, Data, Regiao
FROM dbo.vendas
WHERE Regiao = 'Sul';
```

## LOAD INLINE (dados na mão, sem arquivo)
Útil pra criar tabelas de mapeamento pequenas direto no script:
```
Metas:
LOAD * INLINE [
    Regiao,     Meta
    Sul,        50000
    Norte,      40000
    Sudeste,    80000
    Nordeste,   35000
];
```

## LOAD RESIDENT (de outra tabela já carregada)
Cria uma tabela nova a partir de uma que já está na memória:
```
VendasSul:
LOAD
    ID,
    Produto,
    Valor
RESIDENT Vendas
WHERE Regiao = 'Sul';
```

## LOAD *
O `*` carrega todos os campos sem precisar listar um por um:
```
Vendas:
LOAD * FROM [lib://Dados/vendas.xlsx]
(ooxml, embedded labels, table is Plan1);
```
