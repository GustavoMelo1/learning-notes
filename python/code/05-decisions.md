# 05 - Estruturas de Decisão

`if` / `elif` / `else` rodam blocos diferentes de código dependendo da condição.

## Checagem simples

```python
nota = 4

if nota >= 7:
    print("Aprovado")
else:
    print("Reprovado")
```

```text
Reprovado
```

## Classificação em três faixas

```python
if nota <= 4:
    print("Reprovado")
elif nota > 4 and nota <= 6:
    print("Exame")
else:
    print("Aprovado")
```

```text
Reprovado
```

## Decisão por faixa numérica

```python
gustavo = 7

if gustavo == 4:
    print("Vai ficar em casa")
elif 4 < gustavo <= 6:
    print("Pensar")
else:
    print("Vai pro carnaval")
```

```text
Vai pro carnaval
```
