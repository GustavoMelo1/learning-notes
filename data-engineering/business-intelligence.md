# Business Intelligence

Business intelligence e um composto de diferentes estrategias, procedimentos, tecnologias e infraestruturas, como por exemplo ferramentas que usamos para analisar dados.

## Os 3 pilares

- **Estratégias** → o porquê: quais perguntas de negócio eu quero responder.
- **Tecnologias** → as ferramentas que processam e exibem o dado (ETL, dashboards, bancos analíticos).
- **Infraestruturas** → onde tudo isso roda (servidores, Data Warehouse, cloud).

## O que entra em "Data Analysis"

Dentro de BI, análise de dados não é uma etapa só, é um conjunto de atividades:

- **Data gathering** → coletar o dado bruto de várias fontes.
- **Data storing** → guardar isso de forma organizada (normalmente num Data Warehouse).
- **Reporting** → transformar em relatórios.
- **Data visualization** → gráficos e dashboards.
- **Data mining** → procurar padrões escondidos no meio do dado.
- **Predictive analytics** → usar esses padrões pra prever o que ainda vai acontecer.

## O fluxo, resumido

```text
Fontes de dados → Staging → Transformações → Data Warehouse → Análises e decisões
```

Dado bruto sozinho não serve pra nada. Só depois de passar por uma transformação (limpar, padronizar, agregar) e ser carregado num Data Warehouse é que ele vira informação capaz de gerar insight e apoiar uma decisão.

## Área de preparação — Staging

A staging é a área de chegada dos dados extraídos das fontes. A ideia é tirar uma cópia do que precisamos e trabalhar nela, sem ficar fazendo todas as transformações direto no sistema operacional da empresa.

No modelo apresentado na aula, os dados de diferentes fontes e formatos, como arquivos JSON, são colocados em tabelas de um banco relacional separado. A partir dessas tabelas, a ferramenta de ETL aplica as transformações e carrega a camada principal do Data Warehouse, que fica disponível para usuários e aplicações de análise.

### Por que ter essa camada?

| Motivo | O que isso resolve |
| --- | --- |
| Reduzir o impacto na origem | Os sistemas operacionais precisam continuar atendendo a empresa. A extração busca ocupar esses sistemas pelo menor tempo possível. |
| Reunir fontes diferentes | Na arquitetura da aula, dados de arquivos e sistemas diferentes chegam a tabelas relacionais para serem trabalhados. |
| Separar extração e transformação | Depois de extrair, podemos limpar, combinar e transformar a cópia no nosso ambiente. |
| Apoiar o reprocessamento | Se os dados extraídos forem preservados, podemos repetir uma transformação sem precisar buscar tudo na origem novamente. |

Existe uma cópia adicional dos dados e mais uma camada pra administrar. Em troca, as transformações ficam separadas da operação do negócio. A staging não é a camada que o usuário final consulta para fazer análise.

### Exemplo: carga de vendas

1. Extraímos os registros de vendas do sistema de origem para a staging.
2. Combinamos esses dados com outras tabelas, acrescentando as informações necessárias.
3. Carregamos o resultado no Data Warehouse.
4. Na próxima execução, identificamos os novos registros e repetimos o processo.

## Staging temporária vs persistente

| Tipo | Como funciona | Vantagem | Limitação |
| --- | --- | --- | --- |
| Temporária | Os dados do lote são descartados entre os ciclos de ETL. Na aula, a limpeza é feita com `TRUNCATE`. | Mantém apenas os dados necessários para a carga atual. | Depois da limpeza, reprocessar lotes anteriores pode exigir uma nova extração da origem. |
| Persistente | Preserva os dados extraídos entre os ciclos, sem truncar toda a camada a cada execução. | Permite voltar aos dados preservados e refazer transformações sem consultar novamente a origem. | Precisa de mais armazenamento e organização dos dados mantidos. |

O `TRUNCATE` do exemplo limpa a **staging**, não o Data Warehouse. A camada principal continua com os dados já carregados.

Se uma transformação der errado, a staging persistente facilita o reprocessamento. Ela guarda a matéria-prima; isso não significa que as alterações feitas no Data Warehouse sejam desfeitas automaticamente.

Na experiência relatada pelo professor, a staging temporária é mais comum. Isso é uma observação da aula, não uma regra para toda arquitetura.

## Carga incremental — lógica delta

Em vez de buscar todos os dados a cada execução, buscamos apenas o que entrou desde a última carga. Pra isso, precisamos de uma **coluna delta** e de um marco que indique até onde os dados já foram carregados.

### Exemplo com ID

Se o último ID carregado foi `5`, a próxima extração busca os registros seguintes:

```sql
SELECT *
FROM vendas
WHERE id > 5;
```

Isso funciona para novas linhas quando o ID é estritamente crescente e os novos registros aparecem depois do marco salvo. Se um registro antigo for alterado, o filtro por ID não captura essa alteração.

### Exemplo com data

Também podemos usar uma coluna de data. No exemplo da aula, depois de carregar janeiro, buscamos os registros a partir do começo de fevereiro:

```sql
SELECT *
FROM vendas
WHERE data_criacao >= '2026-02-01';
```

O ano acima é só ilustrativo. O ponto é definir o limite da próxima extração sem perder registros nem carregar o mesmo intervalo de novo. Uma data de criação identifica inclusões; para acompanhar alterações, a coluna precisa refletir essas atualizações.

Depois da extração, aplicamos as transformações e carregamos o lote no Data Warehouse. O marco da última carga deve avançar somente quando o processamento terminar com sucesso, para não pular dados se houver uma falha.

```text
Ler o último marco → Extrair o delta → Staging → Transformar
    → Carregar no Data Warehouse → Registrar o novo marco
```

## Resumo

BI não é uma ferramenta, é a combinação de estratégia + tecnologia + infraestrutura que transforma dado bruto em decisão. O Data Warehouse é a peça de infraestrutura que sustenta esse processo de transformação — é aonde o dado bruto vira dado pronto pra análise.

A staging recebe os dados antes das transformações e reduz a necessidade de trabalhar direto na origem. Ela pode ser temporária ou persistente. Já a lógica delta define quais dados buscar na próxima execução, evitando repetir uma extração completa a cada ciclo.
