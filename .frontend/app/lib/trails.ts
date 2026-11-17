/**
 * Every guided sequence on the site is a trail. "Fundamentos" trails walk through the library notes;
 * "Projetos aplicados" use a small project to practise a subject.
 *
 * Step ids are what the browser stores as progress, so never change an existing id.
 * Project steps use their original URL as id, which keeps progress saved by the old "Guias" pages.
 */
export type TrailKind = 'fundamentos' | 'projeto'

export interface TrailStep {
  id: string
  title: string
  url: string
  outcome?: string
}

export interface LearningTrail {
  id: string
  kind: TrailKind
  title: string
  /** Short name used in sentences: "trilha de SQL". */
  short: string
  description: string
  level: string
  subjects: string[]
  prerequisites: string
  objectives: string[]
  /** Introduction page for project trails. */
  intro?: string
  source?: { name: string; url: string }
  steps: TrailStep[]
}

const projectStep = (title: string, url: string, outcome?: string): TrailStep => ({ id: url, title, url, outcome })

export const trails: LearningTrail[] = [
  {
    id: 'sql', kind: 'fundamentos', title: 'SQL: da consulta aos relacionamentos', short: 'SQL', level: 'Fundamentos',
    description: 'Aprenda a buscar, filtrar e combinar dados, avançando de uma consulta simples até JOIN.',
    subjects: ['Consultas', 'Filtros', 'Agregações', 'Relacionamentos'],
    prerequisites: 'Saber o que são linhas e colunas em uma tabela. Os exemplos usam SQL, com foco em MySQL.',
    objectives: ['Selecionar e ordenar os dados necessários.', 'Filtrar registros e reconhecer valores ausentes.', 'Resumir grupos e relacionar tabelas.'],
    steps: [
      { id: 'sql-select', title: 'Selecionar dados com SELECT', url: '/sql/09-select', outcome: 'Escolher colunas e dar nomes aos resultados.' },
      { id: 'sql-where', title: 'Filtrar linhas com WHERE', url: '/sql/11-where', outcome: 'Usar condições para responder uma pergunta específica.' },
      { id: 'sql-logical', title: 'Combinar condições', url: '/sql/14-logical-operators', outcome: 'Combinar filtros com AND, OR e NOT.' },
      { id: 'sql-null', title: 'Tratar valores ausentes', url: '/sql/16-is-null', outcome: 'Distinguir NULL e testar a ausência de um valor.' },
      { id: 'sql-order', title: 'Ordenar resultados', url: '/sql/10-order-by', outcome: 'Ler os resultados na ordem que faz sentido para a análise.' },
      { id: 'sql-distinct', title: 'Encontrar valores distintos', url: '/sql/20-distinct', outcome: 'Consultar combinações sem repetições.' },
      { id: 'sql-group', title: 'Resumir dados com GROUP BY', url: '/sql/18-group-by', outcome: 'Calcular contagens e medidas por grupo.' },
      { id: 'sql-having', title: 'Filtrar grupos com HAVING', url: '/sql/19-having', outcome: 'Aplicar condições aos resultados de uma agregação.' },
      { id: 'sql-join', title: 'Relacionar tabelas com JOIN', url: '/sql/26-join', outcome: 'Reconhecer como cada junção combina registros.' },
    ],
  },
  {
    id: 'python', kind: 'fundamentos', title: 'Python: primeiros programas', short: 'Python', level: 'Iniciante',
    description: 'Prepare o ambiente, entenda valores e decisões e organize pequenos programas com funções.',
    subjects: ['Ambiente', 'Tipos', 'Controle de fluxo', 'Coleções', 'Funções'],
    prerequisites: 'Nenhuma experiência prévia com Python. Para executar os exemplos, prepare o ambiente na primeira etapa.',
    objectives: ['Preparar um ambiente para executar Python.', 'Representar valores e controlar a execução do código.', 'Organizar coleções de dados e criar funções reutilizáveis.'],
    steps: [
      { id: 'python-environment', title: 'Preparar o ambiente', url: '/python/environment', outcome: 'Entender ambiente virtual e dependências.' },
      { id: 'python-types', title: 'Conhecer os tipos de valores', url: '/python/code/00-typevariables', outcome: 'Identificar números, textos e outros tipos básicos.' },
      { id: 'python-variables', title: 'Guardar valores em variáveis', url: '/python/code/01-variables', outcome: 'Nomear e reutilizar valores no programa.' },
      { id: 'python-strings', title: 'Trabalhar com textos', url: '/python/code/02-strings', outcome: 'Representar e manipular strings.' },
      { id: 'python-comparators', title: 'Comparar valores', url: '/python/code/04-comparators', outcome: 'Construir expressões que resultam em verdadeiro ou falso.' },
      { id: 'python-decisions', title: 'Tomar decisões', url: '/python/code/05-decisions', outcome: 'Escolher caminhos com condições.' },
      { id: 'python-loops', title: 'Repetir operações', url: '/python/code/06-forandwhile', outcome: 'Entender quando usar for e while.' },
      { id: 'python-lists', title: 'Organizar dados em listas', url: '/python/code/08-list', outcome: 'Guardar e acessar sequências de valores.' },
      { id: 'python-dictionaries', title: 'Associar chaves e valores', url: '/python/code/11-dictionary', outcome: 'Representar dados com dicionários.' },
      { id: 'python-functions', title: 'Criar funções', url: '/python/code/12-function', outcome: 'Separar responsabilidades com parâmetros e retorno.' },
    ],
  },
  {
    id: 'frontend', kind: 'fundamentos', title: 'Frontend: do HTML ao site', short: 'Frontend', level: 'Iniciante',
    description: 'Começa com HTML e CSS, adiciona interação e termina entendendo como este site é feito.',
    subjects: ['HTML', 'CSS', 'JavaScript', 'Vue'],
    prerequisites: 'Nenhum conhecimento prévio de frontend.',
    objectives: ['Estruturar uma página com HTML.', 'Dar aparência e espaço com CSS.', 'Adicionar interação com JavaScript e ver como o Vue organiza tudo.'],
    intro: '/frontend',
    source: { name: 'learning-notes', url: 'https://github.com/GustavoMelo1/learning-notes/tree/main/.frontend' },
    steps: [
      projectStep('HTML: estrutura da página', '/frontend/01-html', 'Organizar conteúdo com as tags certas.'),
      projectStep('CSS: aparência e espaço', '/frontend/02-css', 'Controlar cor, tipografia e caixa.'),
      projectStep('JavaScript: busca e interação', '/frontend/03-javascript', 'Responder ao que a pessoa digita.'),
      projectStep('Vue e Nuxt: o site completo', '/frontend/04-learning-notes', 'Ver as três camadas juntas em componentes.'),
    ],
  },
  {
    id: 'financas', kind: 'projeto', title: 'SQL aplicado: análise financeira', short: 'análise financeira', level: 'Projeto · SQL',
    description: 'Filtros, agregações e funções de janela para responder perguntas sobre transações.',
    subjects: ['SQL', 'Agregações', 'Window functions'],
    prerequisites: 'SELECT, WHERE e GROUP BY.',
    objectives: ['Entender uma tabela de transações.', 'Responder perguntas de negócio com SQL.', 'Comparar linhas sem perder o detalhe com funções de janela.'],
    intro: '/sql/aplicado/analise-financeira',
    source: { name: 'financial-analysis', url: 'https://github.com/GustavoMelo1/financial-analysis' },
    steps: [
      projectStep('Entender a tabela e preparar os dados', '/sql/aplicado/analise-financeira/01-preparar'),
      projectStep('Responder perguntas com SQL', '/sql/aplicado/analise-financeira/02-consultar'),
      projectStep('Comparar sem perder os detalhes', '/sql/aplicado/analise-financeira/03-comparar'),
    ],
  },
  {
    id: 'arquivos', kind: 'projeto', title: 'CSV e JSON em Python', short: 'CSV e JSON', level: 'Projeto · Python',
    description: 'Os módulos csv e json na prática: ler, padronizar e exportar arquivos.',
    subjects: ['Python', 'Biblioteca padrão', 'Arquivos'],
    prerequisites: 'Listas, dicionários e funções.',
    objectives: ['Ler duas fontes de dados diferentes.', 'Padronizar colunas antes de combinar.', 'Exportar e conferir o resultado.'],
    intro: '/python/libs/csv-json',
    source: { name: 'data-engineering-studies', url: 'https://github.com/GustavoMelo1/data-engineering-studies/tree/main/pipeline_dados_data' },
    steps: [
      projectStep('Ler e entender as duas fontes', '/python/libs/csv-json/01-extrair'),
      projectStep('Padronizar antes de combinar', '/python/libs/csv-json/02-transformar'),
      projectStep('Exportar e conferir o resultado', '/python/libs/csv-json/03-validar'),
    ],
  },
  {
    id: 'api', kind: 'projeto', title: 'Requests: consumo de APIs', short: 'Requests', level: 'Projeto · Python',
    description: 'Faça requisições HTTP, trate respostas e percorra páginas para coletar dados.',
    subjects: ['Python', 'HTTP', 'Paginação'],
    prerequisites: 'Dicionários, laços e ambiente Python.',
    objectives: ['Ler uma resposta de API.', 'Percorrer páginas sem esconder falhas.', 'Montar e validar uma tabela com o resultado.'],
    intro: '/python/libs/requests',
    source: { name: 'data-engineering-studies', url: 'https://github.com/GustavoMelo1/data-engineering-studies/tree/main/python_for_api' },
    steps: [
      projectStep('Entender a resposta da API', '/python/libs/requests/01-resposta'),
      projectStep('Paginar sem esconder falhas', '/python/libs/requests/02-paginacao'),
      projectStep('Montar e validar a tabela', '/python/libs/requests/03-tabela'),
    ],
  },
]

export const trailGroups: { kind: TrailKind; title: string; description: string }[] = [
  { kind: 'fundamentos', title: 'Fundamentos', description: 'Do zero, uma nota de cada vez, na ordem em que faz sentido aprender.' },
  { kind: 'projeto', title: 'Projetos aplicados', description: 'Um projeto pequeno e real para usar o que você já sabe.' },
]

export const trailUrl = (trail: LearningTrail) => `/trilhas/${trail.id}`
export const trailStepUrl = (trail: LearningTrail, step: TrailStep) => `${step.url}?trilha=${encodeURIComponent(trail.id)}`
export const findTrail = (id: string | null | undefined) => trails.find(trail => trail.id === id)
export const allStepIds = () => new Set(trails.flatMap(trail => trail.steps.map(step => step.id)))

/**
 * Where to continue: the first pending step after the furthest one completed, so finishing
 * step 7 leads to step 8 even if 1–6 were skipped. Skipped steps are reported as `gaps`.
 */
export function trailProgress(trail: LearningTrail, completed: readonly string[]) {
  const count = trail.steps.filter(step => completed.includes(step.id)).length
  const furthest = trail.steps.reduce((last, step, index) => completed.includes(step.id) ? index : last, -1)
  const next = trail.steps.find((step, index) => index > furthest && !completed.includes(step.id))
    || trail.steps.find(step => !completed.includes(step.id))
  const gaps = trail.steps.filter((step, index) => index < furthest && !completed.includes(step.id))
  return { count, total: trail.steps.length, percent: Math.round(count / trail.steps.length * 100), next, gaps, done: count === trail.steps.length }
}

/** Normalises a route or file path to the canonical note URL: no base, no ".html", no trailing slash. */
export function canonicalPath(path: string) {
  const clean = path.split(/[?#]/)[0].replace(/\.(html|md)$/, '').replace(/\/index$/, '').replace(/\/+$/, '')
  return clean || '/'
}

/**
 * The trail a page belongs to. An explicit ?trilha= wins; otherwise the first trail that uses the page.
 * Notes reached from the library still show where they fit, so progress is never hidden.
 */
export function resolveTrailContext(path: string, preferredId?: string | null) {
  const url = canonicalPath(path)
  const memberships = trails.flatMap(trail => {
    const index = trail.steps.findIndex(step => step.url === url)
    return index >= 0 ? [{ trail, index, step: trail.steps[index], explicit: trail.id === preferredId }] : []
  })
  return memberships.find(item => item.explicit) || memberships[0] || null
}

/** Project intro pages are not steps, but they belong to their trail. */
export const trailForIntro = (path: string) => trails.find(trail => trail.intro === canonicalPath(path))

/** First trail with progress and a pending step (see trailProgress); otherwise the first trail. */
export function resumePoint(completed: readonly string[]) {
  for (const trail of trails) {
    const progress = trailProgress(trail, completed)
    if (progress.count && progress.next) {
      return { trail, step: progress.next, index: trail.steps.indexOf(progress.next), started: true as const }
    }
  }
  return { trail: trails[0], step: trails[0].steps[0], index: 0, started: false as const }
}
