# 05 - IF e SWITCH

Lógica condicional no script e nas expressões.

## IF no script (criando campo novo)
```
LOAD
    ID,
    Produto,
    Valor,
    IF(Valor >= 1000, 'Alto', 'Baixo') AS Ticket
FROM [lib://Dados/vendas.xlsx]
(ooxml, embedded labels, table is Plan1);
```

## IF aninhado
```
IF(Valor >= 5000, 'Premium',
   IF(Valor >= 1000, 'Alto',
      IF(Valor >= 500, 'Médio', 'Baixo')
   )
) AS Faixa
```

## SWITCH (mais limpo que vários IF)
Quando o campo tem valores fixos conhecidos, SWITCH é mais legível:
```
SWITCH(Regiao,
    'Sul',      'Região Sul',
    'Norte',    'Região Norte',
    'Sudeste',  'Região Sudeste',
    'Nordeste', 'Região Nordeste',
    'Outros'    // valor padrão se não bater com nenhum
) AS RegiaoNome
```

## IF em expressão de gráfico
```
// mostra o valor só se a meta foi batida
IF(SUM(Valor) >= $(vMeta), SUM(Valor), 0)

// cor condicional (usado em cores de fundo)
IF(SUM(Valor) >= $(vMeta), RGB(0,200,0), RGB(200,0,0))
```
