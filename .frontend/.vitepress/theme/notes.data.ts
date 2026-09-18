import { createContentLoader } from 'vitepress'

export interface Note {
  title: string
  url: string
  category: string
  description: string
}

export const categories = {
  sql: 'SQL', python: 'Python', bi: 'BI', mongodb: 'MongoDB',
  'data-engineering': 'Engenharia de Dados',
}

declare const data: Note[]
export { data }

export default createContentLoader(
  Object.keys(categories).map(folder => `${folder}/**/*.md`),
  {
    includeSrc: true,
    transform(notes): Note[] {
      return notes.map(({ url, src = '', frontmatter }) => {
        const text = src.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
          .replace(/```[\s\S]*?```/g, '')
        const title = frontmatter.title || text.match(/^#\s+(.+)$/m)?.[1] || url.split('/').pop()
        const paragraph = text.split(/\r?\n\s*\r?\n/).find(block =>
          /^[\p{L}\p{N}*`]/u.test(block.trim()) && !block.trim().startsWith(':::'))
        const description = String(frontmatter.description || paragraph || 'Conceitos e exemplos das minhas anotações.')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*`_]/g, '').replace(/\s+/g, ' ').trim()
        return {
          title: String(title).replace(/`/g, ''), url,
          category: categories[url.split('/')[1] as keyof typeof categories],
          description: description.length > 150 ? `${description.slice(0, 147).trimEnd()}…` : description,
        }
      }).sort((a, b) => a.url.localeCompare(b.url, 'pt-BR', { numeric: true }))
    },
  },
)
