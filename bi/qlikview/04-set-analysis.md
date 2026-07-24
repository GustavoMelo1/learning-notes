# 04 - Set Analysis

Set analysis define QUAL conjunto de dados uma expressão usa, independente do que o usuário selecionou nos filtros.

## Sintaxe
```
SUM( {SetExpression} Campo )
```

## Os dois sets base
```
{$}   // só os dados da seleção atual do usuário (padrão, mesmo que não escrever)
{1}   // TODOS os dados, ignora qualquer seleção
```

```
SUM({$} Valor)    // total com a seleção atual
SUM({1} Valor)    // total geral, ignora filtros
```

## Filtrando por um valor fixo
```
// só vendas de 2024
SUM({<Ano={2024}>} Valor)

// só a região Sul
SUM({<Regiao={'Sul'}>} Valor)

// 2024 E região Sul
SUM({<Ano={2024}, Regiao={'Sul'}>} Valor)
```

## Excluindo um valor
```
// tudo EXCETO a região Norte
SUM({<Regiao-={'Norte'}>} Valor)
```

## Casos práticos
```
// % da seleção em relação ao total geral
SUM({$} Valor) / SUM({1} Valor)

// meta fixa que não muda com o filtro
SUM({1<Ano={2024}>} Meta)

// ano anterior (usando variável)
SUM({<Ano={$(=vAnoAtual - 1)}>} Valor)
```

# Nota: expressões dentro de `{}` são calculadas no nível do SET, antes das agregações. Por isso o sinal de `=` dentro do `$()` avalia a expressão primeiro.
