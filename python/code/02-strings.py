#Strings are sequences of characters that support slicing to extract subsets by index and step.

s = 'abcdefg'
#Slicing from index 0 to end
s[0:]    #'abcdefg'

#Slicing a specific range
s[0:4]   #'abcd'

#Slicing with a step — every 2nd character
s[0:7:2] #'aceg'