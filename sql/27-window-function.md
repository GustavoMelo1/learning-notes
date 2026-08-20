# 27 - Window Function

Window function calcula sobre um conjunto de linhas (a janela) e
mantem cada linha na saida. GROUP BY esmaga as linhas num resumo;
a window function mantem tudo e so cola o resumo do lado.

Agregação — SUM, AVG, COUNT, MIN, MAX com OVER. Aí sim é conta.
Ranking — ROW_NUMBER, RANK, DENSE_RANK, NTILE. Ordena e numera, não calcula nada.
Navegação entre linhas — LAG, LEAD, FIRST_VALUE, LAST_VALUE. Pega o valor da linha anterior ou seguinte. É o que permite comparar uma linha com a outra sem juntar a tabela com ela mesma.
