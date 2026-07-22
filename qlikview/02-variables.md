# 02 - Variables (LET e SET)

Variáveis guardam um valor pra reutilizar no script ou nas expressões dos gráficos.

## SET vs LET
```
SET vNome = 'Sul';           // guarda o texto "Sul" como está
LET vTotal = SUM(Valor);     // calcula a expressão e guarda o resultado
```

`SET` é texto puro. `LET` avalia a expressão antes de guardar.

## Exemplos práticos
```
// caminho dos arquivos
SET vCaminho = 'lib://Dados/';

// ano atual
LET vAnoAtual = Year(Today());

// meta mensal
SET vMeta = 50000;
```

## Usando variáveis no script
```
Vendas:
LOAD * FROM [$(vCaminho)vendas.xlsx]
(ooxml, embedded labels, table is Plan1);
```

## Usando variáveis em expressões de gráfico
```
SUM({<Ano={$(vAnoAtual)}>} Valor)
```

## Deletando uma variável
```
SET vNome =;
```
Deixar em branco apaga o valor da variável.
