# Aggregation

Usadas nas expressões dos gráficos para calcular sobre as linhas selecionadas.

```
SUM(Valor)               // soma total
COUNT(ID)                // contagem de linhas
COUNT(DISTINCT Produto)  // contagem sem repetição
AVG(Valor)               // média
MIN(Valor)               // menor valor
MAX(Valor)               // maior valor
ONLY(Categoria)          // retorna o valor só se todas as linhas forem iguais
```

## Combinando com IF
```
SUM(IF(Valor > 1000, Valor, 0))   // soma só os acima de 1000
COUNT(IF(Regiao = 'Sul', ID))     // conta só os do Sul
```
