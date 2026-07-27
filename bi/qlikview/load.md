# LOAD

Lê dados de uma fonte e carrega na memória.

## De arquivo
```
Vendas:
LOAD ID, Produto, Categoria, Valor, Data, Regiao
FROM [lib://Dados/vendas.xlsx]
(ooxml, embedded labels, table is Plan1);
```

## De banco SQL
```
Vendas:
LOAD *;
SQL SELECT * FROM dbo.vendas WHERE Regiao = 'Sul';
```

## INLINE (tabela direto no script)
```
Metas:
LOAD * INLINE [
    Regiao,  Meta
    Sul,     50000
    Norte,   40000
    Sudeste, 80000
];
```

## RESIDENT (de outra tabela já na memória)
```
VendasSul:
LOAD ID, Produto, Valor
RESIDENT Vendas
WHERE Regiao = 'Sul';
```
