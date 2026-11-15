export interface TrailStep {
  /** Stable identifier: keep it when renaming a title or moving a Markdown file. */
  id: string
  title: string
  url: string
  outcome: string
}
export interface LearningTrail {
  id: string
  title: string
  description: string
  level: string
  subjects: string[]
  prerequisites: string
  objectives: string[]
  steps: TrailStep[]
}

export const trails: LearningTrail[] = [
  {
    id: 'sql', title: 'SQL: da consulta aos relacionamentos', level: 'Fundamentos',
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
    id: 'python', title: 'Python: primeiros programas', level: 'Iniciante',
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
]

export const trailUrl = (trail: LearningTrail) => `/trilhas/${trail.id}/`
export const trailStepUrl = (trail: LearningTrail, step: TrailStep) => `${step.url}?trilha=${encodeURIComponent(trail.id)}`
export function trailProgress(trail: LearningTrail, completed: readonly string[]) {
  const count = trail.steps.filter(step => completed.includes(step.id)).length
  return { count, total: trail.steps.length, percent: Math.round(count / trail.steps.length * 100),
    next: trail.steps.find(step => !completed.includes(step.id)) }
}
export function resolveTrailContext(relativePath: string, id: string | null) {
  const trail = trails.find(item => item.id === id)
  const url = '/' + relativePath.replace(/\.md$/, '').replace(/\/index$/, '/')
  const index = trail?.steps.findIndex(step => step.url === url) ?? -1
  return trail && index >= 0 ? { trail, index, step: trail.steps[index] } : null
}
