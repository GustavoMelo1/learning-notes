# Python Ambiente e Dependências

O ambiente Python reúne as ferramentas necessárias para executar um projeto e controlar suas dependências.
A ideia principal é manter cada projeto **isolado**, evitando que as bibliotecas de um projeto interfiram em outro.

## Verificando a instalação

Antes de criar um ambiente, verifique se o Python está instalado.

### Windows

```bash
python --version
```

```bash
pip --version
```

### Linux / macOS

```bash
python3 --version
```

```bash
pip3 --version
```

Dependendo da configuração do sistema, `python` e `pip` também podem funcionar no Linux/macOS.

# Ambiente Virtual

Um ambiente virtual (`venv`) cria uma instalação isolada para um projeto.
Por exemplo:

```text
projeto/
├── venv/
├── main.py
└── requirements.txt
```
As bibliotecas instaladas dentro desse ambiente ficam associadas ao projeto, sem alterar as dependências dos outros projetos.

## Windows

### Criar

```bash
python -m venv venv
```

### Ativar

```bash
venv\Scripts\activate
```

Depois de ativado:

```text
(venv) C:\projeto>
```

### Desativar

```bash
deactivate
```

## Linux / macOS

### Criar

```bash
python3 -m venv venv
```

### Ativar

```bash
source venv/bin/activate
```

Depois de ativado:

```text
(venv) usuario@computador:~/projeto$
```

### Desativar

```bash
deactivate
```

# Pip

O `pip` é o gerenciador de pacotes utilizado para instalar e gerenciar bibliotecas Python.

### Instalar uma biblioteca

```bash
pip install numpy
```

Exemplo:

```bash
pip install pandas
```

### Instalar uma versão específica

```bash
pip install numpy==2.3.0
```

### Remover uma biblioteca

```bash
pip uninstall numpy
```

### Ver bibliotecas instaladas

```bash
pip list
```

### Atualizar o pip

Windows:

```bash
python -m pip install --upgrade pip
```

Linux / macOS:

```bash
python3 -m pip install --upgrade pip
```

---

# Requirements.txt

O `requirements.txt` é utilizado para registrar as dependências do projeto.
Exemplo:

```text
numpy==2.3.0
pandas==2.3.1
pytest==8.4.1
```

## Criando o requirements.txt

Com o ambiente ativado:

```bash
pip freeze > requirements.txt
```

## Instalando as dependências

Quando o projeto for executado em outro ambiente:

```bash
pip install -r requirements.txt
```

Assim, as bibliotecas necessárias podem ser instaladas novamente.

# Import

Depois que uma biblioteca foi instalada no ambiente, ela pode ser utilizada no código através do `import`.
Por exemplo:

```bash
pip install numpy
```

Depois, no Python:

```python
import numpy as np
```

O `pip install` e o `import` são coisas diferentes:

```text
pip install
     ↓
Instala a biblioteca no ambiente

import
     ↓
Carrega a biblioteca no código
```

Exemplo:

```python
import numpy as np

mt = np.array([12, 34, 26, 18, 10])

print(mt)
```

### Alias

É comum utilizar um apelido para facilitar o uso da biblioteca:

```python
import numpy as np
```

Nesse caso:

```text
numpy → nome da biblioteca
np    → apelido utilizado no código
```

# `.gitignore`

O ambiente virtual não deve ser enviado para o Git.
A pasta `venv` pode conter muitos arquivos específicos da máquina e não precisa estar no repositório.
Um `.gitignore` básico:

```gitignore
venv/
__pycache__/
*.pyc
.env
```

Também é comum ignorar o `.env`, pois ele pode conter informações privadas, como:

```text
API_KEY
DATABASE_URL
SECRET_KEY
```

# Estrutura básica de um projeto

Depois de configurar o ambiente, uma estrutura simples pode ser:

```text
projeto/
│
├── venv/
│
├── src/
│   └── main.py
│
├── .gitignore
├── requirements.txt
└── README.md
```

O `venv` fica separado do código do projeto, enquanto o `requirements.txt` registra as dependências necessárias.

# Fluxo básico

```text
Criar projeto
      ↓
Criar ambiente virtual
      ↓
Ativar ambiente
      ↓
Instalar bibliotecas
      ↓
Registrar dependências
      ↓
Importar bibliotecas no código
      ↓
Desenvolver
      ↓
Desativar ambiente
```

# Comandos rápidos

### Windows
```bash
python -m venv venv

venv\Scripts\activate

pip install nome-da-biblioteca

pip freeze > requirements.txt

pip install -r requirements.txt

deactivate
```

### Linux / macOS
```bash
python3 -m venv venv

source venv/bin/activate

pip install nome-da-biblioteca

pip freeze > requirements.txt

pip install -r requirements.txt

deactivate
```
