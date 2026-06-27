#In Python, everything is an object — variables hold objects that carry both data and built-in methods.

#Objects are essentially the value stored inside a variable

idade = 25
#Calling methods on an int object
print(idade.bit_length())  #How many bits to represent 25 (5 bits)
print(type(idade))         #Returns the class: <class 'int'>

numeros = [1, 2, 3]
#'mensagem' is the variable — "Olá Python" is the object
mensagem = "Olá Python"

#Calling string methods
print(mensagem.upper())
print(mensagem.split(' '))
print(len(mensagem))

texto = "Explorando"
#Listing all available methods for a string object
print(dir(texto))

#5
#<class 'int'>
#OLÁ PYTHON
#['Olá', 'Python']
#10
#['__add__', '__class__', ..., 'upper', 'zfill']