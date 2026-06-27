#Functions encapsulate reusable blocks of code that can accept parameters and return values.

#Defining a function with a default parameter value
def my_func(name='default name'):
    print('Hello ' + name)

my_func()
my_func('Jose')

#Defining a function with a docstring and a return statement
def square(num):
    """
    THIS IS A DOCSTRING
    """
    return num**2

output = square(2)
print(output)

#Hello default name
#Hello Jose
#4