# 06 - Update (DML)

Altera dados de linhas que já existem. Uso o `WHERE` pra dizer QUAL linha, geralmente pelo `id`.
```sql
UPDATE sensores
SET nome = 'Pluviometro'
WHERE idsensor = '1';
```

Posso mudar VÁRIOS campos de uma vez, separando com vírgula:
```sql
UPDATE sensores
SET nome = 'Anemometro', ano = '2015'
WHERE idsensor = '4';
```

## The golden rule: always WHERE
Se eu esquecer o `WHERE`, o UPDATE muda TODAS as linhas da tabela. Por isso o `LIMIT 1` é uma trava de segurança, garante que mexe em uma linha só:
```sql
UPDATE sensores
SET nome = 'Termometro', ano = '2015', alcance = '40'
WHERE idsensor = '5'
LIMIT 1;
```
