---
title: Padronizar antes de combinar
description: Mapeie nomes, converta tipos e diferencie concatenar registros de fazer um JOIN.
path: arquivos
step: 2
prev: false
next: false
---
# Padronizar antes de combinar

A classe `Dados` do projeto original tem um método `rename_columns`. Ele traduz os nomes das colunas usando um dicionário. Aqui aplicamos a ideia a um registro pequeno.

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

No script original, a função chamada `join` usa `extend` para colocar uma lista depois da outra. Isso **concatena registros**; não procura correspondências por uma chave como um JOIN em SQL.

```python
combinados = loja_a + loja_b_padronizada
```

Se A tem uma linha e B tem uma linha, a lista combinada tem duas. Nenhuma coluna é cruzada por produto.

## Agora é contigo

Adiciona uma coluna `Desconto` ao registro da loja B. O mapeamento atual funciona?

<details><summary>Ver o que precisa mudar</summary>

`mapa["Desconto"]` causa `KeyError`: não existe uma regra para essa coluna. Decide se ela deve ser mapeada, ignorada explicitamente ou rejeitada. Não esconde a falha com um `except` genérico, porque isso pode descartar dados sem aviso.

</details>

## Lendo o código original com atenção

Em `data_joined.py`, o acesso `dados_empresaA.dados.nome_colunas` tenta buscar um atributo numa lista. A classe guarda as colunas no próprio objeto: `dados_empresaA.nome_colunas`. Os repositórios foram preservados; esta observação explica o ponto de refatoração em que o experimento está.

[Revisar funções](/python/code/12-function) · [Comparar com JOIN em SQL](/sql/26-join)
