-- Adaptado de GustavoMelo1/financial-analysis. Licenca MIT em LICENSE.txt.
-- Esperado: 200.
SELECT SUM(amount) AS total_despesas FROM spending WHERE transaction_type = 'expense';

-- Esperado: Alimentacao 120, Lazer 60, Transporte 20.
SELECT category, SUM(amount) AS total FROM spending
WHERE transaction_type = 'expense' GROUP BY category ORDER BY total DESC, category;

-- Esperado: Alimentacao 120 e Lazer 60.
SELECT category, SUM(amount) AS total FROM spending
WHERE transaction_type = 'expense' GROUP BY category
HAVING SUM(amount) > 50 ORDER BY total DESC, category;

-- Quatro linhas; total de Alimentacao repetido nas duas transacoes.
SELECT description, category, amount,
    SUM(amount) OVER (PARTITION BY category) AS total_categoria
FROM spending WHERE transaction_type = 'expense' ORDER BY category, id;

-- Esperado: 1800.
SELECT SUM(CASE WHEN transaction_type = 'income' THEN amount
    WHEN transaction_type = 'expense' THEN -amount ELSE 0 END) AS saldo
FROM spending;
