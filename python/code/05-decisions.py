#Decision structures (if / elif / else) run different code blocks based on conditions being true or false.

#if = runs if condition is true
#else = runs if no condition matched
#elif = middle ground — checked only if if was false

nota = 4
#Simple pass/fail check
if nota >= 7:
    print("Aprovado")
else:
    print("Reprovado")

#Three-way grade classification
if nota <= 4:
    print("Reprovado")
elif nota > 4 and nota <= 6:
    print("Exame")
else:
    print("Aprovado")

gustavo = 7
#Decision based on a numeric range
if gustavo == 4:
    print("Vai ficar em casa")
elif 4 < gustavo <= 6:
    print("Pensar")
else:
    print("Vai pro carnaval")

#Reprovado
#Reprovado
#Vai pro carnaval