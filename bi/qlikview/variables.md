# Variables

`SET` guarda texto puro. `LET` avalia a expressão antes de guardar.

```
SET vCaminho  = 'lib://Dados/';
SET vMeta     = 50000;
LET vAnoAtual = Year(Today());
```

## No script
```
LOAD * FROM [$(vCaminho)vendas.xlsx]
(ooxml, embedded labels, table is Plan1);
```

## Em expressão de gráfico
```
SUM({<Ano={$(vAnoAtual)}>} Valor)
```

## Deletar
```
SET vNome =;    // deixar vazio apaga a variável
```
