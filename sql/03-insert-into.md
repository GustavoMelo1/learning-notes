# 03 - Insert Into (DML)

DML = Data Manipulation Language. Mexe nos DADOS (inserir, atualizar, apagar linhas).

## Inserindo com campos nomeados
```sql
INSERT INTO jogos (titulo, genero, nota, ano)
VALUES ('Minecraft', 'Survival', 9.5, 2011);
```
Não listo o `id` porque ele é `AUTO_INCREMENT`, o banco preenche sozinho.

## Usando DEFAULT
`DEFAULT` no lugar de qualquer valor que o banco preenche automaticamente:
```sql
INSERT INTO jogos VALUES
(DEFAULT, 'Minecraft', 'Survival', 9.5, 2011);
```

## Inserindo sem nomear os campos
Os valores precisam estar na ORDEM EXATA do CREATE TABLE:
```sql
INSERT INTO jogos VALUES
(DEFAULT, 'Valorant', 'FPS', 8.5, 2020);
```

## Inserindo vários de uma vez
```sql
INSERT INTO jogos (titulo, genero, nota, ano) VALUES
('Minecraft',     'Survival', 9.5, 2011),
('Terraria',      'Survival', 9.0, 2011),
('Valorant',      'FPS',      8.5, 2020),
('CS2',           'FPS',      8.0, 2023),
('The Witcher 3', 'RPG',      9.8, 2015),
('Elden Ring',    'RPG',      9.5, 2022);
```

## Erros que cometi e não esqueço
- É `INSERT INTO`, NÃO `INSERT TO`.
- É `VALUES` com S, não `VALUE`.
- Na lista de campos é tudo separado por vírgula, sem "e" antes do último.
