# 08 - Truncate (DML)

Apaga TODOS os registros de uma vez (esvazia a tabela), mas mantém a estrutura. Mais rápido que DELETE pra limpar tudo.
```sql
TRUNCATE sensores;
```

## DELETE vs TRUNCATE vs DROP
```text
DELETE   → apaga linhas escolhidas (com WHERE), mais lento
TRUNCATE → apaga TODAS as linhas de uma vez, mais rápido, mantém a estrutura
DROP     → apaga a TABELA inteira (estrutura + dados), some tudo
```
