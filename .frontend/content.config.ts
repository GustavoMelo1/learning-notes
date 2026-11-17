import { fileURLToPath } from 'node:url'
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Notes live at the repository root (sql/, python/, ...), one level above this app.
const repositoryRoot = fileURLToPath(new URL('..', import.meta.url))

export default defineContentConfig({
  collections: {
    notes: defineCollection({
      type: 'page',
      source: {
        cwd: repositoryRoot,
        include: '**/*.md',
        exclude: [
          '.frontend/**', '.claude/**', '.github/**', '1/**', 'docs/**', 'public/**', 'node_modules/**',
          'README.md', 'biblioteca.md', 'indice.md', 'index.md', 'trilhas/**', 'pratica/index.md',
        ],
      },
      schema: z.object({
        // Last commit date of the source file, added at build time (see nuxt.config hooks).
        updatedAt: z.string().optional(),
        // Legacy VitePress keys still present in some notes.
        search: z.boolean().default(true),
        sidebar: z.boolean().default(true),
        layout: z.string().optional(),
      }),
    }),
  },
})
