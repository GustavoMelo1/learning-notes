#For loops iterate over a sequence, executing a block of code for each element.
seq = [1, 2, 3, 4, 5]

#Iterating and printing a fixed string for each element
for num in seq:
    print('hello')

#Iterating and printing each element value
for x in seq:
    print(x)

#Building a list of squares using a for loop and append
x = [1, 2, 3, 4]

out = []
for num in x:
    out.append(num**2)
print(out)

#Equivalent using list comprehension (more concise)
out = [num**2 for num in x]
print(out)
#hello
#hello
#hello
#hello
#hello
#1
#2
#3
#4
#5
#[1, 4, 9, 16]
#[1, 4, 9, 16]

#While loops repeat a block of code as long as a condition remains True.
i = 1

while i < 5:
    print('i is: {}'.format(i))
    i = i + 1

#i is: 1
#i is: 2
#i is: 3
#i is: 4
#Functions encapsulate reusable blocks of code that can accept parameters and return values.

