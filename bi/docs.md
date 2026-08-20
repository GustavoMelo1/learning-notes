# BI — OLTP, OLAP e Arquitetura de Dados

## 1 · OLTP vs OLAP — o porquê de tudo
https://learn.microsoft.com/en-us/azure/architecture/data-guide/relational-data/online-analytical-processing

A ideia central que tu vai encontrar: transações e registros de negócio ficam em bancos OLTP, otimizados para entrada de registros individuais — eles guardam informação valiosa, mas não foram feitos para análise, então extrair dado dali é lento e difícil. E OLAP organiza bancos grandes para cálculos complexos e análise de tendência, permitindo consultas pesadas sem atrapalhar os sistemas transacionais. 
EDUCBA
EDUCBA

O detalhe técnico que fecha a compreensão: OLTP usa armazenamento orientado a linha (tudo de um registro junto, rápido pra ler ou atualizar o registro inteiro); OLAP usa orientado a coluna, eficiente pra varrer um atributo específico em milhões de linhas. É por isso que são bancos diferentes, não teimosia.

## 2 · Onde o dado mora — data lake vs warehouse
https://learn.microsoft.com/en-us/azure/architecture/data-guide/scenarios/data-lake

O conceito-chave aqui é schema-on-read vs schema-on-write: data lake guarda tudo no formato original e só transforma quando o dado é necessário; data warehouse impõe estrutura e transforma na entrada.

## 3 · Warehouse, data mart e camadas
https://learn.microsoft.com/en-us/azure/databricks/sql/get-started/data-warehousing-concepts

Aqui entra o vocabulário de camadas (medallion: bronze, prata, ouro). E olha a conexão com o que tu vai estudar depois: data marts são frequentemente modelos dimensionais — um conjunto de tabelas relacionadas que captura uma perspectiva específica do negócio. Ou seja, o Kimball vive dentro dessa arquitetura. 
Microsoft Azure

## 4 · ETL vs ELT
https://learn.microsoft.com/en-us/data-engineering/playbook/solutions/modern-data-warehouse/

A diferença em uma linha: ETL é preferido no data warehousing tradicional; no moderno, usa-se ELT — o dado é primeiro ingerido no lake como está, e só depois transformado. Tu já fez ETL na Agromai; aqui é o nome e a variante.

## 5 · Kimball — modelagem dimensional (sábado)
https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/
https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/

## 6 · Qlik (semana que vem)
Modelo associativo: https://help.qlik.com/en-US/sense/August2023/Subsystems/Hub/Content/Sense_Hub/Selections/associative-selection-model.htm
Set analysis: https://help.qlik.com/en-US/sense/May2026/Subsystems/Hub/Content/Sense_Hub/ChartFunctions/SetAnalysis/set-analysis-expressions.htm