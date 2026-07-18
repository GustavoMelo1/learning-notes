# pytest

`pytest` é uma biblioteca do Python pra rodar testes automáticos. Em vez de abrir o programa e testar na mão toda vez que muda algo, você escreve um teste uma vez e o pytest roda pra você e avisa se quebrou alguma coisa.

## Why test
Imagina que você tem uma função que soma dois números. Você muda ela um dia pra fazer outra coisa e sem querer ela para de somar certo. Sem teste, só descobre quando o usuário reclama. Com teste, o pytest avisa na hora.

## Installing pytest
```bash
pip install pytest
```

## How to write a basic test
Regras fixas:
- O arquivo de teste começa com `test_` (ex: `test_calculadora.py`).
- Cada função de teste começa com `test_`.
- Usar o `assert` para verificar as expectativas do teste.

```python
# arquivo: test_calculadora.py

def soma(a, b):
    return a + b

def test_soma():
    assert soma(2, 3) == 5
```

## How to run
Dentro da pasta onde está o arquivo, roda:
```bash
pytest
```
O pytest acha sozinho qualquer arquivo que começa com `test_` e roda todos os testes dentro.

## Reading the result
```text
. = teste passou
F = teste falhou
```
Se falhar, o pytest mostra exatamente o que era esperado e o que veio — pra saber onde está o problema.

Exemplo de saída quando passa:
```text
collected 1 item

test_calculadora.py .                    [ 100%]

1 passed in 0.01s
```

Exemplo quando falha (mudei a função pra retornar errado de propósito):
```text
FAILED test_calculadora.py::test_soma - AssertionError: assert 0 == 5
```

## Useful flags
```bash
pytest -v        # verbose: mostra o nome de cada teste e se passou ou falhou
pytest -s        # mostra prints dentro dos testes (útil pra debugar)
pytest -q        # quiet: saída resumida, só o essencial
```

## Test classes
Para manter melhor organização, dá pra agrupar testes em uma classe. Útil quando vários testes pertencem ao mesmo contexto.

```python
class TestCalculadora:
    def test_soma(self):
        assert soma(2, 3) == 5

    def test_subtracao(self):
        assert subtracao(5, 3) == 2
```

Benefícios:
- Agrupa testes relacionados num mesmo bloco
- Permite compartilhar fixtures só entre os testes daquela classe
- Dá pra aplicar marcadores no nível da classe inteira
