# Date Functions

Datas no QlikView são números. As funções convertem, extraem e formatam.

## Converter texto em data
```
Date#(DataTexto, 'DD/MM/YYYY')    // texto → número de data
Date#(DataTexto, 'YYYY-MM-DD')    // formato ISO
```

## Formatar pra exibição
```
Date(Data, 'DD/MM/YYYY')          // número → texto formatado
```

## Extrair partes
```
Year(Data)          // 2024
Month(Data)         // 7
Day(Data)           // 15
Quarter(Data)       // 3
MonthName(Data)     // 'Jul 2024'
QuarterName(Data)   // 'Q3 2024'
Today()             // data de hoje
```

## Início e fim de períodos
```
MonthStart(Data)    // primeiro dia do mês
MonthEnd(Data)      // último dia do mês
YearStart(Data)     // primeiro dia do ano
YearEnd(Data)       // último dia do ano
```

## No script (data vindo como texto do Excel)
```
LOAD
    ID, Produto, Valor,
    Date#(DataTexto, 'DD/MM/YYYY') AS Data,
    Year(Date#(DataTexto, 'DD/MM/YYYY'))      AS Ano,
    MonthName(Date#(DataTexto, 'DD/MM/YYYY')) AS MesAno
FROM [lib://Dados/vendas.xlsx]
(ooxml, embedded labels, table is Plan1);
```
