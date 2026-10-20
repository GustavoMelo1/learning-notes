# BigQuery

BigQuery é um serviço do Google Cloud para armazenar e analisar dados usando SQL. Ele funciona como um Data Warehouse, sem precisar configurar um servidor de banco de dados.

## Exemplo simples

Imagina uma tabela `vendas` com o valor de cada venda. Para descobrir o total vendido:

```sql
SELECT SUM(valor) AS total_vendido
FROM `meu-projeto.loja.vendas`;
```

Nesse exemplo, `meu-projeto` é o projeto, `loja` é o dataset (um conjunto de tabelas) e `vendas` é a tabela. Se os valores forem 50 e 30, o resultado será 80.
