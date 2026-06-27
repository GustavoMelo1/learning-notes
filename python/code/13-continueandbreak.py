#Break stops the loop completely as soon as the condition is true.
for n in range(0, 10):
    if n == 4:
        break
    print(n)

#0
#1
#2
#3

#Continue skips only that one iteration and keeps the loop going.
for n in range(0, 10):
    if n == 4:
        continue
    print(n)

#0
#1
#2
#3
#5
#6
#7
#8
#9