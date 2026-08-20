# Objects

Em Python, tudo é objeto — as variáveis guardam objetos, que carregam dado e métodos prontos.

## Métodos de um int

```python
idade = 25

print(idade.bit_length())  # quantos bits pra representar 25
print(type(idade))         # a classe do objeto
```

```text
5
<class 'int'>
```

## Métodos de uma string

```python
numeros = [1, 2, 3]
mensagem = "Olá Python"

print(mensagem.upper())
print(mensagem.split(' '))
print(len(mensagem))
```

```text
OLÁ PYTHON
['Olá', 'Python']
10
```

## Descobrindo métodos disponíveis

```python
texto = "Explorando"
print(dir(texto))
```

`dir()` lista todos os métodos e atributos disponíveis pra aquele objeto.
