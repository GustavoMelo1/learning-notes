# 03 - Aggregation

Funções de agregação calculam um valor a partir de várias linhas. Usadas nas expressões dos gráficos.

## As principais
```
SUM(Valor)              // soma
COUNT(ID)               // contagem de linhas
COUNT(DISTINCT Produto) // contagem sem repetição
AVG(Valor)              // média
MIN(Valor)              // menor valor
MAX(Valor)              // maior valor
```

## Exemplos
```
// total de vendas
SUM(Valor)

// quantos pedidos
COUNT(ID)

// quantos produtos diferentes foram vendidos
COUNT(DISTINCT Produto)

// ticket médio
AVG(Valor)

// menor e maior venda
MIN(Valor)
MAX(Valor)
```

## Combinando com IF
```
// soma só das vendas acima de 1000
SUM(IF(Valor > 1000, Valor, 0))

// conta só os pedidos da região Sul
COUNT(IF(Regiao = 'Sul', ID))
```

## ONLY
Retorna o valor quando todas as linhas têm o mesmo resultado. Se tiver mais de um valor diferente, retorna NULL:
```
ONLY(Categoria)   // útil pra mostrar o valor de um campo quando não precisa agregar
```
