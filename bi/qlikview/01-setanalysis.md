# Set Analysis

Set Analysis só pode ser feito com operadores de agregação.

# Identificadores
Os identificadores definem a relação entre a expressão definida e os valores de campo ou expressão que está sendo avaliada.
Exemplo de Identificador seria o $

```qlik
Sum({$} Vendas)
```

Retorna as vendas da seleção atual, ou seja, o mesmo que sum(Vendas).

# Operadores
Os operadores são usados para incluir, excluir ou cruzar partes ou conjuntos de dados inteiros. Todos os operadores usam conjuntos como operandos e retornam um conjunto como resultado.
Exemplo de Operadores seria os +, -, *, /

```qlik
Sum({1-$} Vendas)
```

Devolve vendas para tudo o que é excluído pela seleção.

# Modificadores
Modificadores são usados para fazer adições ou alterações em uma seleção. Tais modificações podem ser escritas na expressão definida. Um modificador consiste em um ou vários nomes de campo, cada um seguido por uma ou várias seleções que podem ser feitas no campo.
Exemplo de Modificadores <>

```qlik
sum({1<Regiao = {EUA}>} Vendas)
```

Retorna as vendas da região dos EUA, desconsiderando a seleção atual.