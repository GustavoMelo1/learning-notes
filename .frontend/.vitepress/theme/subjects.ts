// Shared by the home page, catalog and sidebar so their subjects stay aligned.
export const subjects = [
  { folder: 'frontend', name: 'Frontend', description: 'HTML, CSS e interação usando este site como exemplo.', url: '/frontend/' },
  { folder: 'sql', name: 'SQL', description: 'Consultar, relacionar e conferir dados.', url: '/sql/09-select' },
  { folder: 'python', name: 'Python', description: 'Da lógica aos scripts de tratamento.', url: '/python/code/00-typevariables' },
  { folder: 'data-engineering', name: 'Engenharia de Dados', description: 'Fluxos, armazenamento e nuvem.', url: '/data-engineering/business-intelligence' },
  { folder: 'bi', name: 'BI', description: 'Modelos e perguntas de negócio.', url: '/bi/docs' },
  { folder: 'mongodb', name: 'MongoDB', description: 'Dados organizados em documentos.', url: '/mongodb/notes' },
] as const
