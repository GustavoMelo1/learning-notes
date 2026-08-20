# Break e Continue

## Break

Para o loop completamente assim que a condição é verdadeira.

```python
for n in range(0, 10):
    if n == 4:
        break
    print(n)
```

```text
0
1
2
3
```

## Continue

Pula só aquela iteração e continua o loop.

```python
for n in range(0, 10):
    if n == 4:
        continue
    print(n)
```

```text
0
1
2
3
5
6
7
8
9
```
