# Window function

Window function calcula sobre um conjunto de linhas (a janela) e
mantem cada linha na saida. GROUP BY esmaga as linhas num resumo;
a window function mantem tudo e so cola o resumo do lado.

OVER() = "essa conta é de janela". Vazio, a linha enxerga a tabela toda.
PARTITION BY = encolhe a vizinhança pra um grupo (só do mesmo cliente, por ex).
ORDER BY = põe as vizinhas em fila, e faz a conta virar acumulada (do começo até a linha atual).
ROWS BETWEEN = tu mesmo define quantas vizinhas entram.
