import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath, URL as NodeURL } from 'node:url'
import type { DefaultTheme } from 'vitepress'
import { paths } from './theme/paths'
import { subjects as subjectRegistry } from './theme/subjects'

const subjects = subjectRegistry.map(subject => ({ text: subject.name, folder: subject.folder, link: subject.url }))
const explore: DefaultTheme.SidebarItem = { text: 'Explorar', items: [
  { text: 'Biblioteca', link: '/biblioteca' }, { text: 'Todas as notas', link: '/indice' },
  { text: 'Guias por assunto', link: '/pratica/' },
  ...subjects.map(({ text, link, folder }) => ({ text, link, activeMatch: `^/${folder}/` })),
] }
const labels: Record<string, string> = {
  '01-data-types': 'Tipos de dados', '22-relational-model': 'Modelo relacional',
  '23-storage-engines': 'Motores de armazenamento', '25-foreign-key': 'Chaves estrangeiras',
  '14-logical-operators': 'Operadores lógicos', '27-window-function': 'Window Functions',
  '00-typevariables': 'Tipos de variáveis', '04-comparators': 'Comparadores',
  '05-decisions': 'Decisões', '06-forandwhile': 'Laços de repetição',
  '07-continueandbreak': 'Break e continue', '08-list': 'Listas', '09-tuple': 'Tuplas',
  '10-set': 'Conjuntos', '11-dictionary': 'Dicionários', '12-function': 'Funções', '13-objects': 'Objetos',
  environment: 'Ambiente e dependências', 'pytest-notes': 'Testes com pytest', numpy: 'NumPy',
  docs: 'OLTP, OLAP e arquitetura', 'star-schema': 'Esquema estrela',
  '00-asks': 'Perguntas frequentes', '01-setanalysis': 'Set Analysis',
  documentstructure: 'Estrutura de documentos', 'business-intelligence': 'Business Intelligence',
}

function notes(folder: string): DefaultTheme.SidebarItem[] {
  const directory = fileURLToPath(new NodeURL(`../../${folder}/`, import.meta.url))
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.isDirectory()) return notes(`${folder}/${entry.name}`)
    if (!entry.name.endsWith('.md')) return []
    const slug = entry.name.slice(0, -3)
    const title = readFileSync(`${directory}/${entry.name}`, 'utf8').match(/^#\s+(.+)$/m)?.[1] || slug
    return [{ text: labels[slug] || (slug === 'notes' ? 'Anotações gerais' : title.replace(/\s*\([^)]*\)/g, '').replace(/`/g, '')), link: `/${folder}/${slug}` }]
  }).sort((a, b) => a.link!.localeCompare(b.link!, 'pt-BR', { numeric: true }))
}

export function createSidebar(): DefaultTheme.SidebarMulti {
  const sidebar = Object.fromEntries(subjects.map(subject => {
    const pages = notes(subject.folder).filter(page => !paths.some(path => page.link!.startsWith(path.url)))
    const groups: DefaultTheme.SidebarItem[] = []
    if (subject.folder === 'sql') {
      const sections: [string, (number: number) => boolean][] = [
        ['Consultar e filtrar', n => n >= 9 && n <= 17 || n === 20],
        ['Agrupar e relacionar', n => [18, 19, 21, 26, 27].includes(n)],
        ['Criar e alterar dados', n => n >= 2 && n <= 8],
        ['Fundamentos', n => n === 1 || n >= 22 && n <= 25],
      ]
      const covered = new Set<string>()
      for (const [text, matches] of sections) {
        const items = pages.filter(page => matches(Number(page.link!.split('/').pop()!.split('-')[0])))
        items.forEach(page => covered.add(page.link!))
        groups.push({ text, collapsed: true, items })
      }
      const other = pages.filter(page => !covered.has(page.link!))
      if (other.length) groups.push({ text: 'Mais anotações', collapsed: true, items: other })
    } else if (subject.folder === 'python') {
      groups.push({ text: 'Fundamentos da linguagem', collapsed: true, items: pages.filter(page => page.link!.includes('/code/')) })
      groups.push({ text: 'Ambiente, bibliotecas e testes', collapsed: true, items: pages.filter(page => !page.link!.includes('/code/')) })
    } else if (subject.folder === 'bi') {
      groups.push({ text: 'Conceitos de BI', collapsed: false, items: pages.filter(page => !page.link!.includes('/qlikview/')) })
      groups.push({ text: 'QlikView', collapsed: true, items: pages.filter(page => page.link!.includes('/qlikview/')) })
    } else groups.push({ text: subject.text, items: pages })
    const guides = paths.filter(path => path.url.startsWith(`/${subject.folder}/`))
    if (guides.length) groups.push({ text: subject.folder === 'python' ? 'Bibliotecas e arquivos' : 'SQL aplicado', items: guides.map(path => ({ text: path.title, link: path.url })) })
    return [`/${subject.folder}/`, [
      explore,
      ...groups,
    ]]
  }))
  for (const path of paths) {
    const covered = new Set([`${path.url}index`, ...path.steps.map(step => step.url)])
    const additional = notes(path.url.slice(1, -1)).filter(page => !covered.has(page.link!))
    sidebar[path.url] = [
      explore,
      { text: path.subject, items: [{ text: 'Introdução ao assunto', link: path.url }] },
      { text: path.title, items: path.steps.map((step, index) => ({ text: `${index + 1}. ${step.title}`, link: step.url })) },
      ...(additional.length ? [{ text: 'Mais sobre o assunto', items: additional }] : []),
    ]
  }
  return sidebar
}
