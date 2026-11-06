-- Dados ficticios para o percurso de aprendizado. Use um banco novo.
-- Modelo adaptado de GustavoMelo1/financial-analysis. Licenca MIT em LICENSE.txt.
BEGIN;
CREATE TABLE spending (
    id INTEGER PRIMARY KEY,
    date TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('income', 'expense'))
);
INSERT INTO spending VALUES
    (1, '2026-01-05', 'Entrada fictícia A', 'Trabalho', 1000, 'income'),
    (2, '2026-01-06', 'Mercado fictício', 'Alimentação', 80, 'expense'),
    (3, '2026-01-07', 'Ônibus fictício', 'Transporte', 20, 'expense'),
    (4, '2026-01-08', 'Almoço fictício', 'Alimentação', 40, 'expense'),
    (5, '2026-02-05', 'Entrada fictícia B', 'Trabalho', 1000, 'income'),
    (6, '2026-02-06', 'Passeio fictício', 'Lazer', 60, 'expense');
COMMIT;
