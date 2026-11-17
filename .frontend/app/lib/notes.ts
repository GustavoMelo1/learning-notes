import { subjects } from './subjects'
import { canonicalPath, trails } from './trails'

/** The fields every page needs from a note; pages select only these from the content collection. */
export interface NoteDoc {
  path: string
  title: string
  description?: string
  search?: boolean
}

export type NoteKind = 'Anotação' | 'Projeto'

export interface Note {
  title: string
  /** Short label for the sidebar. */
  label: string
  url: string
  folder: string
  category: string
  description: string
  kind: NoteKind
}

// Friendlier sidebar labels where a note's file title is terse or in English.
const labels: Record<string, string> = {
  '01-data-types': 'Tipos de dados', '22-relational-model': 'Modelo relacional',
  '23-storage-engines': 'Motores de armazenamento', '25-foreign-key': 'Chaves estrangeiras',
  '14-logical-operators': 'Operadores lógicos', '27-window-function': 'Window functions',
  '00-typevariables': 'Tipos de variáveis', '04-comparators': 'Comparadores',
  '05-decisions': 'Decisões', '06-forandwhile': 'Laços de repetição',
  '07-continueandbreak': 'Break e continue', '08-list': 'Listas', '09-tuple': 'Tuplas',
  '10-set': 'Conjuntos', '11-dictionary': 'Dicionários', '12-function': 'Funções', '13-objects': 'Objetos',
  environment: 'Ambiente e dependências', 'pytest-notes': 'Testes com pytest', numpy: 'NumPy',
  docs: 'OLTP, OLAP e arquitetura', 'star-schema': 'Esquema estrela',
  '00-asks': 'Perguntas de negócio', '01-setanalysis': 'Set Analysis',
  documentstructure: 'Estrutura de documentos', 'business-intelligence': 'Business Intelligence',
  'initial-gcp': 'Primeiros passos no GCP', 'initial-bigquery': 'Primeiros passos no BigQuery',
  // SQL commands read best as the keywords you type.
  '02-create-table': 'CREATE TABLE', '03-insert-into': 'INSERT INTO', '04-alter-table': 'ALTER TABLE',
  '05-drop-table': 'DROP TABLE', '06-update': 'UPDATE', '07-delete': 'DELETE', '08-truncate': 'TRUNCATE',
  '09-select': 'SELECT', '10-order-by': 'ORDER BY', '11-where': 'WHERE', '12-between': 'BETWEEN', '13-in': 'IN',
  '15-like': 'LIKE', '16-is-null': 'IS NULL e IS NOT NULL', '17-limit': 'LIMIT', '18-group-by': 'GROUP BY',
  '19-having': 'HAVING', '20-distinct': 'DISTINCT', '21-subqueries': 'Subconsultas', '24-acid': 'ACID', '26-join': 'JOIN',
}
const folderLabels: Record<string, string> = { 'bi/qlikview/notes': 'Anotações de QlikView', 'mongodb/notes': 'Anotações gerais' }

const projectUrls = new Set(trails.filter(trail => trail.kind === 'projeto').flatMap(trail => [trail.intro, ...trail.steps.map(step => step.url)]))
const subjectOrder = new Map(subjects.map((subject, index) => [subject.folder, index]))
const clean = (value: string) => value.replace(/`/g, '').replace(/\s*\([^)]*\)/g, '').trim()

export function toNote(doc: NoteDoc): Note | null {
  const url = canonicalPath(doc.path)
  const folder = url.split('/')[1]
  const subject = subjects.find(item => item.folder === folder)
  if (!subject) return null
  const slug = url.split('/').pop() || ''
  const title = clean(doc.title || slug)
  const description = (doc.description || 'Conceitos e exemplos das minhas anotações.').replace(/\s+/g, ' ').trim()
  return {
    title, url, folder, category: subject.name,
    label: folderLabels[url.slice(1)] || labels[slug] || title,
    description: description.length > 150 ? `${description.slice(0, 147).trimEnd()}…` : description,
    kind: projectUrls.has(url) ? 'Projeto' : 'Anotação',
  }
}

/** Notes in reading order: subjects as in the summary, then numeric file order inside each subject. */
export function toNotes(docs: NoteDoc[]): Note[] {
  return docs.map(toNote).filter((note): note is Note => !!note).sort((a, b) =>
    (subjectOrder.get(a.folder)! - subjectOrder.get(b.folder)!) || a.url.localeCompare(b.url, 'pt-BR', { numeric: true }))
}

export interface SidebarGroup { title: string; items: { text: string; url: string }[] }

/** Chapters of one subject, shown beside its notes. */
export function sidebarFor(folder: string, notes: Note[]): SidebarGroup[] {
  const own = notes.filter(note => note.folder === folder)
  const projects = trails.filter(trail => trail.kind === 'projeto' && trail.intro?.startsWith(`/${folder}/`))
  const projectPages = new Set(projects.flatMap(trail => [trail.intro, ...trail.steps.map(step => step.url)]))
  const pages = own.filter(note => !projectPages.has(note.url))
  const items = (list: Note[]) => list.map(note => ({ text: note.label, url: note.url }))
  const groups: SidebarGroup[] = []
  const number = (note: Note) => Number(note.url.split('/').pop()!.split('-')[0])

  if (folder === 'sql') {
    const sections: [string, (n: number) => boolean][] = [
      ['Consultar e filtrar', n => (n >= 9 && n <= 17) || n === 20],
      ['Agrupar e relacionar', n => [18, 19, 21, 26, 27].includes(n)],
      ['Criar e alterar dados', n => n >= 2 && n <= 8],
      ['Fundamentos', n => n === 1 || (n >= 22 && n <= 25)],
    ]
    const covered = new Set<string>()
    for (const [title, matches] of sections) {
      const list = pages.filter(note => matches(number(note)))
      list.forEach(note => covered.add(note.url))
      groups.push({ title, items: items(list) })
    }
    const other = pages.filter(note => !covered.has(note.url))
    if (other.length) groups.push({ title: 'Mais anotações', items: items(other) })
  } else if (folder === 'python') {
    groups.push({ title: 'Fundamentos da linguagem', items: items(pages.filter(note => note.url.includes('/code/'))) })
    groups.push({ title: 'Ambiente, bibliotecas e testes', items: items(pages.filter(note => !note.url.includes('/code/'))) })
  } else if (folder === 'bi') {
    groups.push({ title: 'Conceitos de BI', items: items(pages.filter(note => !note.url.includes('/qlikview/'))) })
    groups.push({ title: 'QlikView', items: items(pages.filter(note => note.url.includes('/qlikview/'))) })
  } else if (folder === 'frontend') {
    groups.push({ title: 'Frontend', items: items(own) })
    return groups
  } else {
    groups.push({ title: subjects.find(subject => subject.folder === folder)?.name || folder, items: items(pages) })
  }
  for (const trail of projects) {
    groups.push({ title: `Projeto: ${trail.short}`, items: [
      { text: 'Introdução', url: trail.intro! },
      ...trail.steps.map((step, index) => ({ text: `${index + 1}. ${step.title}`, url: step.url })),
    ] })
  }
  return groups.filter(group => group.items.length)
}

/** Previous and next note in sidebar order, used when the page is not part of a trail. */
export function neighbours(url: string, groups: SidebarGroup[]) {
  const flat = groups.flatMap(group => group.items)
  const index = flat.findIndex(item => item.url === url)
  return { previous: index > 0 ? flat[index - 1] : undefined, next: index >= 0 ? flat[index + 1] : undefined }
}

export function readingMinutes(words: number) {
  return Math.max(1, Math.round(words / 200))
}
