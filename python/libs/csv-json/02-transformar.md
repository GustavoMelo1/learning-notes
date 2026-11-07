---
title: Padronizar antes de combinar
description: Mapeie nomes, converta tipos e diferencie concatenar registros de fazer um JOIN.
path: arquivos
step: 2
prev: false
next: false
---
# Padronizar antes de combinar

Padronizar significa definir nomes e tipos comuns para dados que vieram de fontes diferentes. Um dicionário de mapeamento traduz os nomes de entrada para o esquema que queremos usar.

## Mapear os nomes

```python
mapa = {
    "Nome do Item": "produto",
    "Valor em Reais (R$)": "preco",
    "Nome da Loja": "filial",
}

registro = {"Nome do Item": "Caneta", "Valor em Reais (R$)": "3.50", "Nome da Loja": "B"}
padronizado = {mapa[chave]: valor for chave, valor in registro.items()}
padronizado["preco"] = float(padronizado["preco"])
```

Agora temos `{"produto": "Caneta", "preco": 3.5, "filial": "B"}`. A conversão acima supõe um número com ponto decimal; outras representações precisam de uma regra própria.

## Concatenar não é relacionar

Somar duas listas ou usar `extend` **concatena registros**. Essa operação não procura correspondências por uma chave como um JOIN em SQL.

```python
combinados = loja_a + loja_b_padronizada
```

Se A tem uma linha e B tem uma linha, a lista combinada tem duas. Nenhuma coluna é cruzada por produto.

## Agora é contigo

Adiciona uma coluna `Desconto` ao registro da loja B. O mapeamento atual funciona?

<details><summary>Ver o que precisa mudar</summary>

`mapa["Desconto"]` causa `KeyError`: não existe uma regra para essa coluna. Decide se ela deve ser mapeada, ignorada explicitamente ou rejeitada. Não esconde a falha com um `except` genérico, porque isso pode descartar dados sem aviso.

</details>

## Nome igual não basta

Depois de renomear, ainda precisamos validar o tipo. O texto `"3.50"` e o número `3.5` podem representar o mesmo preço, mas se comportam de formas diferentes ao somar e ordenar. A próxima etapa confere essa conversão antes de exportar.

[Revisar funções](/python/code/12-function) · [Comparar com JOIN em SQL](/sql/26-join)
