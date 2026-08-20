# Function

Funções encapsulam blocos de código reutilizáveis, que podem aceitar parâmetros e retornar valores.

## Parâmetro com valor padrão

```python
def my_func(name='default name'):
    print('Hello ' + name)

my_func()
my_func('Jose')
```

```text
Hello default name
Hello Jose
```

## Docstring e return

```python
def square(num):
    """
    THIS IS A DOCSTRING
    """
    return num**2

output = square(2)
print(output)
```

```text
4
```
