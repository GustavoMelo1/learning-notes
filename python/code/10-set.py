#Creating sets to remove duplicates and adding new elements.

#Convert a list with duplicates into a set to keep only unique values
set([1, 1, 1, 1, 2, 2, 2, 2, 3]) 
print(set([1, 1, 1, 1, 2, 2, 2, 2, 3]))

#Define a set and modify it
s = {1, 2, 3, 4, 5}
s.add(6)
print(s)

#{1, 2, 3}
#{1, 2, 3, 4, 5, 6}