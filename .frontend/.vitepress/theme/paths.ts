export const paths = [
  {
    id: 'financas', title: 'Para onde foi o dinheiro?', subject: 'SQL',
    description: 'Uma pergunta de negócio, uma tabela e consultas que tu consegue conferir.',
    source: 'financial-analysis', sourceUrl: 'https://github.com/GustavoMelo1/financial-analysis',
    prerequisite: 'SELECT, WHERE e GROUP BY',
    steps: [
      { title: 'Entender a tabela e preparar os dados', url: '/pratica/financas/01-preparar' },
      { title: 'Responder perguntas com SQL', url: '/pratica/financas/02-consultar' },
      { title: 'Comparar sem perder os detalhes', url: '/pratica/financas/03-comparar' },
    ],
  },
  {
    id: 'arquivos', title: 'Dois arquivos, uma linguagem', subject: 'Python · ETL',
    description: 'Ler CSV e JSON, acertar os nomes das colunas e juntar registros sem perder informação.',
    source: 'data-engineering-studies', sourceUrl: 'https://github.com/GustavoMelo1/data-engineering-studies/tree/main/pipeline_dados_data',
    prerequisite: 'Listas, dicionários e funções',
    steps: [
      { title: 'Ler e entender as duas fontes', url: '/pratica/arquivos/01-extrair' },
      { title: 'Padronizar antes de combinar', url: '/pratica/arquivos/02-transformar' },
      { title: 'Exportar e conferir o resultado', url: '/pratica/arquivos/03-validar' },
    ],
  },
  {
    id: 'api', title: 'Da API à tabela', subject: 'Python · HTTP',
    description: 'Entender requisições, percorrer páginas e transformar repositórios em dados.',
    source: 'data-engineering-studies', sourceUrl: 'https://github.com/GustavoMelo1/data-engineering-studies/tree/main/python_for_api',
    prerequisite: 'Dicionários, laços e ambiente Python',
    steps: [
      { title: 'Entender a resposta da API', url: '/pratica/api/01-resposta' },
      { title: 'Paginar sem esconder falhas', url: '/pratica/api/02-paginacao' },
      { title: 'Montar e validar a tabela', url: '/pratica/api/03-tabela' },
    ],
  },
] as const

export const subjects = [
  { name: 'SQL', description: 'Consultar, relacionar e conferir dados.', url: '/sql/09-select' },
  { name: 'Python', description: 'Da lógica aos scripts de tratamento.', url: '/python/code/00-typevariables' },
  { name: 'Engenharia de Dados', description: 'Fluxos, armazenamento e nuvem.', url: '/data-engineering/business-intelligence' },
  { name: 'BI', description: 'Modelos e perguntas de negócio.', url: '/bi/docs' },
  { name: 'MongoDB', description: 'Dados organizados em documentos.', url: '/mongodb/notes' },
] as const
