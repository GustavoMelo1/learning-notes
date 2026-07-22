# 07 - Date Functions

Datas no QlikView são números por baixo. As funções convertem, extraem e formatam.

## Converter texto em data
Quando a data vem como texto do arquivo:
```
Date#(DataTexto, 'DD/MM/YYYY')       // texto → número de data
Date#(DataTexto, 'YYYY-MM-DD')       // formato ISO
```

## Formatar data pra exibição
```
Date(Data, 'DD/MM/YYYY')             // número → texto formatado
Date(Today(), 'DD/MM/YYYY')          // data de hoje formatada
```

## Extrair partes da data
```
Year(Data)          // 2024
Month(Data)         // 7 (número do mês)
Day(Data)           // 15
Quarter(Data)       // 3 (trimestre)
Week(Data)          // 29 (semana do ano)
WeekDay(Data)       // 3 (dia da semana, 0=segunda)

MonthName(Data)     // 'Jul 2024'
QuarterName(Data)   // 'Q3 2024'
WeekName(Data)      // 'Sem 29 2024'
```

## Hoje e agora
```
Today()             // data de hoje (sem hora)
Now()               // data e hora atual
```

## Calcular diferença entre datas
```
// dias entre duas datas
Data2 - Data1

// meses entre duas datas
(Year(Data2) * 12 + Month(Data2)) - (Year(Data1) * 12 + Month(Data1))
```

## Início e fim de períodos
```
MonthStart(Data)    // primeiro dia do mês
MonthEnd(Data)      // último dia do mês
YearStart(Data)     // primeiro dia do ano
YearEnd(Data)       // último dia do ano
QuarterStart(Data)  // primeiro dia do trimestre
```

## Caso típico no script
Data vem como texto do Excel, converte e já extrai o que precisa:
```
LOAD
    ID,
    Produto,
    Valor,
    Date#(DataTexto, 'DD/MM/YYYY')  AS Data,
    Year(Date#(DataTexto, 'DD/MM/YYYY'))    AS Ano,
    Month(Date#(DataTexto, 'DD/MM/YYYY'))   AS Mes,
    MonthName(Date#(DataTexto, 'DD/MM/YYYY')) AS MesAno
FROM [lib://Dados/vendas.xlsx]
(ooxml, embedded labels, table is Plan1);
```
