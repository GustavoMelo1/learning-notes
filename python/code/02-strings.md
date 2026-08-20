# 02 - Strings

Strings são sequências de caracteres. Dá pra fatiar (slicing) pra pegar um pedaço, usando índice e passo.

## Slicing

```python
s = 'abcdefg'

s[0:]    # do índice 0 até o fim
s[0:4]   # do índice 0 até o 4 (não incluso)
s[0:7:2] # do 0 até o 7, pulando de 2 em 2
```

```text
'abcdefg'
'abcd'
'aceg'
```

O terceiro número no slice é o passo (step) — de quantos em quantos caracteres ele pula.
