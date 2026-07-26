## fact table

A tabela fato e basicamente a tabela que nao temos informacoes, sao coisas que iremos calcular.

Dimensoes, basicamente sao as tabelas que vamos calcular pelo que na nossa tabela fato.

```
PRODUTOS                    VENDAS                        CALENDÁRIO
────────────                ──────────────────────        ──────────────
produto_id ◄──────────────  produto_id                    data_venda
nome_produto                data_venda  ─────────────────► Semana
tipo                        vendedor_id                    ANO
                            quantidade_vendida             MES
VENDEDORES                  valor_venda                    DIA
──────────                  valor_compra                   CurYTDFlag
vendedor_id ◄───────────    faturamento_venda              LastYTDFlag
nome                        custo_venda                    MesAno
                            margem_venda                   Trimestre
                            teste                          SemanaAno
                                                           DiaSemana
                                                           Comp_test
```

