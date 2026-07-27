# IF e SWITCH

## IF no script (cria campo novo)
```
LOAD
    ID, Produto, Valor,
    IF(Valor >= 5000, 'Premium',
       IF(Valor >= 1000, 'Alto',
          IF(Valor >= 500, 'Médio', 'Baixo')
       )
    ) AS Faixa
FROM [lib://Dados/vendas.xlsx]
(ooxml, embedded labels, table is Plan1);
```

## SWITCH (mais limpo que IF aninhado)
```
SWITCH(Regiao,
    'Sul',     'Região Sul',
    'Norte',   'Região Norte',
    'Sudeste', 'Região Sudeste',
    'Outros'
) AS RegiaoNome
```

## IF em expressão de gráfico
```
IF(SUM(Valor) >= $(vMeta), SUM(Valor), 0)

// cor condicional
IF(SUM(Valor) >= $(vMeta), RGB(0,200,0), RGB(200,0,0))
```
