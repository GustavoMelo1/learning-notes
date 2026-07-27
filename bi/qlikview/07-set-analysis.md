# Set Analysis

Define qual conjunto de dados uma expressão usa, independente do filtro do usuário.

```
SUM( {SetExpression} Campo )
```

## Sets base
```
{$}   // seleção atual do usuário (padrão)
{1}   // todos os dados, ignora qualquer filtro
```

## Filtrando por valor fixo
```
SUM({<Ano={2024}>} Valor)                       // só 2024
SUM({<Regiao={'Sul'}>} Valor)                   // só Sul
SUM({<Ano={2024}, Regiao={'Sul'}>} Valor)       // 2024 E Sul
SUM({<Regiao-={'Norte'}>} Valor)                // tudo EXCETO Norte
```

## Casos práticos
```
// % da seleção sobre o total geral
SUM({$} Valor) / SUM({1} Valor)

// ano anterior
SUM({<Ano={$(=vAnoAtual - 1)}>} Valor)
```
