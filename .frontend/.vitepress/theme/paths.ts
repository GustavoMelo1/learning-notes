export const paths = [
  {
    id: 'frontend', title: 'Frontend: do HTML ao site', subject: 'Frontend',
    url: '/frontend/',
    description: 'Começa com HTML e CSS, adiciona interação e entende o Learning Notes.',
    source: 'learning-notes', sourceUrl: 'https://github.com/GustavoMelo1/learning-notes/tree/main/.frontend',
    prerequisite: 'Nenhum conhecimento prévio de frontend',
    steps: [
      { title: 'HTML: estrutura da página', url: '/frontend/01-html' },
      { title: 'CSS: aparência e espaço', url: '/frontend/02-css' },
      { title: 'JavaScript: busca e interação', url: '/frontend/03-javascript' },
      { title: 'Vue e VitePress: o site completo', url: '/frontend/04-learning-notes' },
    ],
  },
  {
    id: 'financas', title: 'SQL aplicado: análise financeira', subject: 'SQL',
    url: '/sql/aplicado/analise-financeira/',
    description: 'Filtros, agregações e funções de janela para responder perguntas sobre transações.',
    source: 'financial-analysis', sourceUrl: 'https://github.com/GustavoMelo1/financial-analysis',
    prerequisite: 'SELECT, WHERE e GROUP BY',
    steps: [
      { title: 'Entender a tabela e preparar os dados', url: '/sql/aplicado/analise-financeira/01-preparar' },
      { title: 'Responder perguntas com SQL', url: '/sql/aplicado/analise-financeira/02-consultar' },
      { title: 'Comparar sem perder os detalhes', url: '/sql/aplicado/analise-financeira/03-comparar' },
    ],
  },
  {
    id: 'arquivos', title: 'CSV e JSON em Python', subject: 'Python · Biblioteca padrão',
    url: '/python/libs/csv-json/',
    description: 'Aprenda os módulos csv e json: leitura, transformação e escrita de arquivos.',
    source: 'data-engineering-studies', sourceUrl: 'https://github.com/GustavoMelo1/data-engineering-studies/tree/main/pipeline_dados_data',
    prerequisite: 'Listas, dicionários e funções',
    steps: [
      { title: 'Ler e entender as duas fontes', url: '/python/libs/csv-json/01-extrair' },
      { title: 'Padronizar antes de combinar', url: '/python/libs/csv-json/02-transformar' },
      { title: 'Exportar e conferir o resultado', url: '/python/libs/csv-json/03-validar' },
    ],
  },
  {
    id: 'api', title: 'Requests: consumo de APIs', subject: 'Python · Bibliotecas',
    url: '/python/libs/requests/',
    description: 'Faça requisições HTTP, trate respostas e percorra páginas para coletar dados.',
    source: 'data-engineering-studies', sourceUrl: 'https://github.com/GustavoMelo1/data-engineering-studies/tree/main/python_for_api',
    prerequisite: 'Dicionários, laços e ambiente Python',
    steps: [
      { title: 'Entender a resposta da API', url: '/python/libs/requests/01-resposta' },
      { title: 'Paginar sem esconder falhas', url: '/python/libs/requests/02-paginacao' },
      { title: 'Montar e validar a tabela', url: '/python/libs/requests/03-tabela' },
    ],
  },
] as const

export const subjects = [
  { name: 'Frontend', description: 'HTML, CSS e interação usando este site como exemplo.', url: '/frontend/' },
  { name: 'SQL', description: 'Consultar, relacionar e conferir dados.', url: '/sql/09-select' },
  { name: 'Python', description: 'Da lógica aos scripts de tratamento.', url: '/python/code/00-typevariables' },
  { name: 'Engenharia de Dados', description: 'Fluxos, armazenamento e nuvem.', url: '/data-engineering/business-intelligence' },
  { name: 'BI', description: 'Modelos e perguntas de negócio.', url: '/bi/docs' },
  { name: 'MongoDB', description: 'Dados organizados em documentos.', url: '/mongodb/notes' },
] as const
