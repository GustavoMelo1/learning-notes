#Um esquema estrela é um tipo de banco de dados relacional esquema composto por uma única tabela de fatos central cercada por tabelas de dimensões. ## Esquema Estrela (Star Schema)

O **Esquema Estrela** é um modelo de banco de dados utilizado em **Data Warehouses** para organizar informações de forma simples e otimizar consultas e relatórios.

Sua estrutura é formada por:

- **Tabela Fato:** armazena os dados numéricos do negócio (vendas, quantidade, lucro, etc.).
- **Tabelas Dimensão:** armazenam informações descritivas (cliente, produto, data, loja, etc.).

### Exemplo

Uma venda foi realizada:

> João comprou um notebook em 15/06/2025 por R$ 4.000.

Essa informação pode ser organizada assim:

**Tabela Fato**

| Cliente | Produto | Data | Valor |
|---------|----------|------|-------|
| ID 3 | ID 10 | ID 5 | R$ 4.000 |

**Dimensão Cliente**

| ID | Nome |
|----|------|
| 3 | João |

**Dimensão Produto**

| ID | Produto |
|----|----------|
| 10 | Notebook |

**Dimensão Data**

| ID | Data |
|----|------------|
| 5 | 15/06/2025 |

### Estrutura

```text
             DIM_TEMPO
                 │
                 │
DIM_CLIENTE ─ FATO_VENDAS ─ DIM_PRODUTO
                 │
                 │
              DIM_LOJA
```

### Resumo

A **Tabela Fato** armazena os acontecimentos do negócio, enquanto as **Tabelas Dimensão** armazenam os detalhes que descrevem esses acontecimentos. Essa separação torna o banco de dados mais organizado e as consultas mais rápidas.