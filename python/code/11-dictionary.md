# 11 - Dictionary

Dicionários guardam pares chave-valor e permitem acesso rápido ao valor pela chave.

## Acesso por chave

```python
d = {'gustavo': 25, 'maria': 30}

print(d['gustavo'])
```

```text
25
```

## Guardando uma lista como valor

```python
d = {'gustavo': ['lindo', 'inteligente']}
print(d['gustavo'])

my_list = d['gustavo'][0:2]
print(my_list)
```

```text
['lindo', 'inteligente']
['lindo', 'inteligente']
```

Dá pra fatiar o valor normalmente, já que aqui o valor é uma lista.
