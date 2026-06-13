#Dictionaries store key-value pairs and allow fast access to values using their keys.

d = {'gustavo': 25, 'maria': 30}

#Accessing a specific value by its key
print(d['gustavo'])

#Storing a list as a value
d = {'gustavo': ['lindo', 'inteligente']}
print(d['gustavo'])

#Slicing the list retrieved from the dictionary
my_list = d['gustavo'][0:2]
print(my_list)

#25
#['lindo', 'inteligente']
#['lindo', 'inteligente']