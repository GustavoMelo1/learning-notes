# 01 Basics (MySQL)

Antes de criar uma tabela preciso saber o tipo de cada coluna. Cada dado tem seu tipo certo.

```text
Numérico
├── Inteiro (sem vírgula)
│   ├── TinyInt    → bem pequeno (até ~127). Ex: idade
│   ├── SmallInt   → pequeno
│   ├── MediumInt  → médio
│   ├── Int        → padrão (até ~2 bi). Na dúvida, use esse
│   └── BigInt     → gigante. Ex: IDs de redes sociais
├── Real (com vírgula)
│   ├── Decimal    → EXATO. Dinheiro é SEMPRE aqui
│   ├── Float      → aproximado, leve
│   └── Double     → aproximado, mais precisão que Float
└── Lógico
    ├── Bit        → 0 ou 1
    └── Boolean    → true/false. Ex: cliente_ativo

Data/Tempo
├── Date       → só data (2026-06-12)
├── Time       → só hora (14:30)
├── DateTime   → data + hora
├── TimeStamp  → data + hora; usado pra "criado/alterado em"
└── Year       → só o ano

Literal
├── Caractere
│   ├── Char(n)    → tamanho FIXO, preenche com espaços. Ex: UF(2)
│   └── VarChar(n) → tamanho variável até o teto n. Ex: nome, email
├── Texto
│   └── TinyText → Text → MediumText → LongText (texto longo, muda só o limite)
├── Binário
│   └── TinyBlob → Blob → ... (arquivo cru no banco — na prática, salva só o caminho)
└── Coleção
    ├── Enum   → escolhe UM da lista. Ex: status(ativo, inativo)
    └── Set    → escolhe VÁRIOS da lista. Ex: toppings

Espacial
└── Geometry, Point, Polygon → mapas e coordenadas (= meus Polygons do GeoPandas)
```

**Mais usados:** Int, Decimal, Boolean, Date/DateTime, VarChar, Text

## Char vs VarChar (a pegadinha)
- `Char(30)` → tamanho FIXO. "Zé" vira "Zé" + 28 espaços ocupados de verdade. Bom pra coisa de tamanho cravado: UF(2), CEP.
- `VarChar(30)` → o 30 é só o TETO. "Zé" ocupa o tamanho de "Zé", os 28 nem existem. Pra nome, email (95% dos casos).

## Float vs Decimal (pegadinha de entrevista)
- `Float`/`Double` → APROXIMADO. 0.1 + 0.2 pode dar 0.30000004. Serve pra sensor, ciência.
- `Decimal` → EXATO. **Dinheiro é SEMPRE Decimal, nunca Float.**