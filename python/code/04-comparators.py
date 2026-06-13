#Comparison operators, logical operators, and conditional statements.

#Define base values for comparison
a = 10
b = 5
c = 16

#Equal to and Not equal to
print(a == b)
print(a != b)

#Greater than and Less than
print(a > b)
print(a < b)

#Greater than or equal to and Less than or equal to
print(a >= 10)
print(b <= 5)

#Logical operators (True and False combinations)
print(a < b) and (b > c)
print(a > b) or (b > c) or (a == a)

#Conditional blocks (if/elif/else)
if 1 < 2:
    print("hola")

if 1 == 2:
    print("hola")
elif 5 == 5:
    print("meio termo")
else:
    print("adios")

#False
#True
#True
#False
#True
#True
#False
#True
#hola
#meio termo