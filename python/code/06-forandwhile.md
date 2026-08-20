# For e While

`for` itera sobre uma sequência, rodando um bloco pra cada elemento. `while` repete um bloco enquanto uma condição continuar `True`.

## For básico

```python
seq = [1, 2, 3, 4, 5]

for num in seq:
    print('hello')

for x in seq:
    print(x)
```

```text
hello
hello
hello
hello
hello
1
2
3
4
5
```

## Construindo lista com for vs list comprehension

```python
x = [1, 2, 3, 4]

out = []
for num in x:
    out.append(num**2)
print(out)

# equivalente, mais direto
out = [num**2 for num in x]
print(out)
```

```text
[1, 4, 9, 16]
[1, 4, 9, 16]
```

## While

```python
i = 1

while i < 5:
    print('i is: {}'.format(i))
    i = i + 1
```

```text
i is: 1
i is: 2
i is: 3
i is: 4
```

Contando até um número fixo:

```python
count = 1
while count <= 1000:
    print(count)
    count += 1
```
