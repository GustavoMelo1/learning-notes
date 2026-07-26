# 02 - Chamados reais

## O fluxo

```
BANCO      tabela de consultas, guias, internações da Unimed
SCRIPT     o código que busca essas consultas
QVD        consultas.qvd — as consultas guardadas num arquivo
RELOAD     roda tudo e atualiza
GRÁFICO    "total de consultas por médico" na tela
```

## Chamado 1 — "o painel de consultas tá desatualizado, faltam as de ontem"
As consultas de ontem já estão no BANCO, mas o QVD é de anteontem.
→ Rodar o RELOAD. Ele vai no banco, atualiza o QVD, e o gráfico mostra as de ontem.
(mexeu em nada, só cozinhou de novo)

## Chamado 2 — "quero ver a especialidade do médico no relatório"
A especialidade existe no BANCO, mas ninguém trouxe ela pro QVD.
→ Mexe no SCRIPT pra incluir o campo especialidade → RELOAD → agora aparece no gráfico.
(mudou a receita, cozinhou de novo)

## Chamado 3 — "o custo total tá aparecendo o dobro do real"
O número inflou. O dado tá certo no banco, mas a ligação tá errada.
→ Olha o MODELO (data model viewer). Provável $Syn ou tabela ligada errado, duplicando cada consulta.

## Chamado 4 — "o médico fez 32 consultas mas o painel mostra 30"
Faltando. → MODELO (2 consultas sem par na tabela de médico) ou filtro escondido no GRÁFICO.

---

## O padrão que fixa tudo

```
desatualizado → reload
campo novo    → script + reload
número errado → modelo
```
