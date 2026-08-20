# 04 - Comparadores e Operadores Lógicos

Operadores de comparação, operadores lógicos e estruturas condicionais (`if`/`elif`/`else`).

## Comparação

```python
a = 10
b = 5
c = 16

print(a == b)   # igual
print(a != b)   # diferente
print(a > b)    # maior
print(a < b)    # menor
print(a >= 10)  # maior ou igual
print(b <= 5)   # menor ou igual
```

```text
False
True
True
False
True
True
```

## Operadores lógicos

```python
print(a < b) and (b > c)
print(a > b) or (b > c) or (a == a)
```

```text
False
True
```

## Condicionais

- `if` → roda se a condição é verdadeira
- `elif` → meio-termo, só é checado se o `if` foi falso
- `else` → roda se nenhuma condição bateu

```python
if 1 < 2:
    print("hola")

if 1 == 2:
    print("hola")
elif 5 == 5:
    print("meio termo")
else:
    print("adios")
```

```text
hola
meio termo
```
