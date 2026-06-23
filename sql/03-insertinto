# 03 - Insert Into (DML)

DML = Data Manipulation Language. Comandos que mexem nos DADOS (inserir, atualizar, apagar linhas). Diferente do DDL que mexe na estrutura.

## A ordem dos campos
Os campos da tabela, na ordem do CREATE TABLE:
`(id, nome, instalacao, tipo, temp_media, precipitacao, regiao)`

## Inserindo especificando os campos
```sql
INSERT INTO estacoes
(nome, instalacao, tipo, temp_media, precipitacao, regiao)
VALUES
('Estacao Serra Negra', '2010-03-15', 'Fixa', '18.4', '120.5', 'Sudeste');
```
Aqui eu NÃO coloco o `id` porque ele é `auto_increment` (o banco preenche sozinho, em ordem).

## Usando DEFAULT
Como o `id` é auto_increment e a `regiao` tem default 'Sudeste', eu posso usar a palavra `DEFAULT` no lugar do valor que o banco preenche sozinho:
```sql
INSERT INTO estacoes VALUES
(DEFAULT, 'Estacao Serra Negra', '2010-03-15', 'Fixa', '18.4', '120.5', DEFAULT);
```
- `DEFAULT` no id → banco dá o próximo número
- `DEFAULT` na regiao → vira 'Sudeste'

## Inserindo SEM nomear os campos
Se eu colocar os valores na ORDEM EXATA da tabela, não preciso nomear os campos — só os valores. Mas a ordem TEM que bater:
```sql
INSERT INTO estacoes VALUES
(DEFAULT, 'Estacao Serra Negra', '2010-03-15', 'Fixa', '18.4', '120.5', DEFAULT);
```

## Inserindo VÁRIAS estações de uma vez
Separo cada registro com vírgula `,` e finalizo com `;`. Posso misturar (umas com default, outras não), desde que cada linha tenha a mesma quantidade de valores:
```sql
INSERT INTO estacoes
(nome, instalacao, tipo, temp_media, precipitacao, regiao)
VALUES
('Estacao Vale do Itajai', '1998-06-10', 'Fixa',  '21.3', '180.2', 'Sul'),
('Estacao Chapada',        '2015-09-01', 'Movel', '24.7', '45.0',  'Nordeste'),
('Estacao Serra Negra',    '2010-03-15', 'Fixa',  '18.4', '120.5', 'Sudeste');
```

## ⚠️ Erros que eu cometi e CORRIGI (gravar!)
- É `INSERT INTO`, NÃO `INSERT TO`. Sempre `INTO`.
- É `VALUES` (com S) pra inserir. `VALUE` sem S não é o certo aqui.
- Na lista de campos NÃO vai "e" antes do último: é `(nome, instalacao, tipo, temp_media, precipitacao, regiao)`, não `(... precipitacao e regiao)`. Em SQL separa TUDO com vírgula, sem "e".
- Se uso `auto_increment` no id, no INSERT com campos nomeados eu nem listo o id (ou uso DEFAULT se for inserir sem nomear).
