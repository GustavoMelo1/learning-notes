# NumPy

Biblioteca usada para cálculos numéricos e manipulação de arrays.

## Importação

```python
import numpy as np
```

## Array

```python
mt = np.array([12, 34, 26, 18, 10])

print(mt)
print(type(mt))
```

`np.array()` cria um `ndarray`.

`type()` mostra o tipo do objeto:

```text
<class 'numpy.ndarray'>
```

## Shape

Mostra o formato do array.

```python
print(mt.shape)
```

```text
(5,)
```

Array com linhas e colunas:

```python
mt = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

print(mt.shape)
```

```text
(2, 3)
```

## Acessando valores

Funciona parecido com listas do Python:

```python
mt = np.array([12, 34, 26, 18, 10])

print(mt[0])
print(mt[2])
print(mt[-1])
```

Array 2D:

```python
print(mt[0, 1])
```

## Operações

As operações são aplicadas nos elementos:

```python
mt = np.array([10, 20, 30, 40])

print(mt * 2)
print(mt + 10)
print(mt / 2)
```

```text
[20 40 60 80]
[20 30 40 50]
[ 5. 10. 15. 20.]
```

Isso é **vetorização**: não precisa usar `for` para operações simples no array.

## Filtros

Pode usar condições para filtrar valores:

```python
mt = np.array([10, 20, 30, 40, 50])

print(mt[mt > 30])
```

```text
[40 50]
```

Mais de uma condição:

```python
print(mt[(mt > 20) & (mt < 50)])
```

```text
[30 40]
```

## Broadcasting

Permite operar arrays com formatos compatíveis.

```python
mt = np.array([10, 20, 30, 40])

print(mt + 5)
```

```text
[15 25 35 45]
```

O `5` é aplicado em todos os elementos.

## O que lembrar

```text
np.array()     → cria array
.shape         → mostra o formato
array[index]   → acessa valores
array * 2      → operação vetorizada
array[condição]→ filtro
broadcasting   → opera arrays de shapes compatíveis
```

