# 05 - Update, Delete and Truncate (DML)

Comandos que mexem nos DADOS já inseridos. Os três mais perigosos do dia a dia, sempre com cuidado.

## UPDATE
Altera dados de linhas que já existem. Uso o `WHERE` pra dizer QUAL linha, geralmente pelo `id`, porque é o mais fácil de identificar com certeza.
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

### The golden rule of UPDATE: always WHERE
Se eu esquecer o `WHERE`, o UPDATE muda TODAS as linhas da tabela. Por isso o `LIMIT 1` é uma trava de segurança, garante que mexe em uma linha só:
```sql
UPDATE sensores
SET nome = 'Termometro', ano = '2015', alcance = '40'
WHERE idsensor = '5'
LIMIT 1;
```

## DELETE
Apaga LINHAS. Cuidado, não tem CTRL+Z.
```sql
DELETE FROM sensores
WHERE idsensor = '8';
```
Com LIMIT pra não apagar demais sem querer:
```sql
DELETE FROM sensores
WHERE ano = '2050'
LIMIT 2;
```

### DELETE without WHERE deletes EVERYTHING
Mesma regra do UPDATE: DELETE sem WHERE = apaga a tabela inteira (linha por linha). Sempre WHERE.

## TRUNCATE
Apaga TODOS os registros de uma vez (esvazia a tabela), mas mantém a estrutura. Mais rápido que DELETE pra limpar tudo.
```sql
TRUNCATE sensores;
```

## Summary of differences (important)
```text
DELETE   → apaga linhas escolhidas (com WHERE), pode desfazer com cuidado, mais lento
TRUNCATE → apaga TODAS as linhas de uma vez, reinicia, mais rápido, mantém a estrutura
DROP     → apaga a TABELA inteira (estrutura + dados), some tudo
```
