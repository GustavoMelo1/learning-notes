<script setup lang="ts">
import { computed, provide, watch } from 'vue'
import { canonicalPath, resolveTrailContext, trailForIntro, trailStepUrl, trailUrl } from '~/lib/trails'
import { neighbours, readingMinutes, sidebarFor } from '~/lib/notes'
import { subjects } from '~/lib/subjects'
import { useProgress } from '~/lib/progress'
import { sidebarOpen } from '~/lib/ui-state'
import { noteDirectory } from '~/lib/links'

const route = useRoute()
const path = computed(() => canonicalPath(route.path))
const { data: page } = await useAsyncData(() => `page:${path.value}`, () => queryCollection('notes').path(path.value).first())
if (!page.value) throw createError({ statusCode: 404, message: 'Página não encontrada', fatal: true })

// Relative links and images inside the note resolve against its folder (see ProseA/ProseImg).
provide('noteDir', computed(() => noteDirectory(page.value?.stem || '')))
// The first "# Title" of the note is the page header; ProseH1 skips it.
provide('noteTitleId', computed(() => {
  const first = (page.value?.body?.value as unknown[] | undefined)?.[0] as [string, { id?: string }] | undefined
  return first?.[0] === 'h1' ? first[1]?.id : undefined
}))

const notes = useNotes()
const { completed, message, toggle } = useProgress()

const folder = computed(() => path.value.split('/')[1] || '')
const subject = computed(() => subjects.find(item => item.folder === folder.value))
const showSidebar = computed(() => !!subject.value && page.value?.sidebar !== false)
const trailContext = computed(() => resolveTrailContext(path.value, typeof route.query.trilha === 'string' ? route.query.trilha : null))
const introOf = computed(() => trailForIntro(path.value))
// Project pages are read as a sequence: their sidebar is the project, and they belong to Trilhas.
const project = computed(() => trailContext.value?.trail.kind === 'projeto' ? trailContext.value.trail : introOf.value?.kind === 'projeto' ? introOf.value : undefined)
const groups = computed(() => {
  if (!showSidebar.value) return []
  if (project.value) {
    const trail = project.value
    return [{ title: trail.title, items: [{ text: 'Introdução', url: trail.intro! }, ...trail.steps.map((step, i) => ({ text: `${i + 1}. ${step.title}`, url: step.url }))] }]
  }
  return sidebarFor(folder.value, notes.value)
})
const note = computed(() => notes.value.find(item => item.url === path.value))
const toc = computed(() => (page.value?.body?.toc?.links || []) as { id: string; text: string; depth: number }[])

const turns = computed(() => {
  const context = trailContext.value
  if (context) {
    const { trail, index } = context
    const previous = trail.steps[index - 1]
    const next = trail.steps[index + 1]
    return {
      previous: previous ? { text: previous.title, url: trailStepUrl(trail, previous) } : trail.intro ? { text: 'Introdução', url: trail.intro } : { text: trail.title, url: trailUrl(trail) },
      next: next ? { text: next.title, url: trailStepUrl(trail, next) } : { text: 'Voltar à trilha', url: trailUrl(trail) },
    }
  }
  if (introOf.value) return { previous: undefined, next: { text: introOf.value.steps[0].title, url: trailStepUrl(introOf.value, introOf.value.steps[0]) } }
  return neighbours(path.value, groups.value)
})

// Done marks in the sidebar: trail steps are tracked by id, project steps by URL.
const doneUrls = computed(() => notes.value.filter(item => {
  const context = resolveTrailContext(item.url)
  return context && completed.value.includes(context.step.id)
}).map(item => item.url))

function countWords(node: unknown): number {
  if (typeof node === 'string') return node.split(/\s+/).filter(Boolean).length
  if (Array.isArray(node)) return node.slice(typeof node[0] === 'string' && typeof node[1] === 'object' ? 2 : 0).reduce((sum, child) => sum + countWords(child), 0)
  if (node && typeof node === 'object' && 'value' in node) return countWords((node as { value: unknown }).value)
  return 0
}
const minutes = computed(() => readingMinutes(countWords(page.value?.body)))
const updated = computed(() => page.value?.updatedAt ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(page.value.updatedAt)) : '')
const sourceUrl = computed(() => `https://github.com/GustavoMelo1/learning-notes/blob/main/${page.value?.stem}.md`)

watch(() => route.path, () => { sidebarOpen.value = false })
useSeoMeta({ title: () => page.value?.title, description: () => page.value?.description })
useHead({ link: [{ rel: 'canonical', href: () => `https://gustavomelo1.github.io/learning-notes${path.value === '/' ? '/' : path.value}` }] })
</script>

<template>
  <div v-if="page" class="doc-layout" :class="{ 'no-sidebar': !showSidebar }">
    <aside v-if="showSidebar" id="doc-sidebar" class="doc-sidebar" :class="{ 'is-open': sidebarOpen }">
      <DocSidebar :folder="folder" :groups="groups" :current="path" :done="doneUrls" />
    </aside>

    <article class="doc-main">
      <div v-if="showSidebar" class="doc-subbar">
        <button type="button" :aria-expanded="sidebarOpen" aria-controls="doc-sidebar" @click="sidebarOpen = !sidebarOpen">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7.2c5.4-.3 10.7-.3 16 0M4 12c5.4-.2 10.7-.2 16 .1M4 16.9c5.4-.3 10.7-.2 16 0" /></svg>
          {{ sidebarOpen ? 'Fechar' : project ? 'Etapas do projeto' : `Notas de ${subject?.name}` }}
        </button>
      </div>

      <header class="doc-header">
        <nav v-if="project" class="breadcrumb" aria-label="Localização">
          <NuxtLink to="/trilhas#projetos">Trilhas</NuxtLink>
          <span aria-hidden="true">/</span><NuxtLink :to="trailUrl(project)">{{ project.title }}</NuxtLink>
        </nav>
        <nav v-else-if="subject" class="breadcrumb" aria-label="Localização">
          <NuxtLink to="/biblioteca">Biblioteca</NuxtLink>
          <span aria-hidden="true">/</span><NuxtLink :to="subject.url">{{ subject.name }}</NuxtLink>
        </nav>
        <h1>{{ page.title }}</h1>
        <p class="doc-meta mono-meta">
          <span v-if="note">{{ note.kind }}</span>
          <span>{{ minutes }} min de leitura</span>
          <span v-if="updated">atualizada em {{ updated }}</span>
        </p>
        <TrailNote v-if="trailContext" :trail="trailContext.trail" :index="trailContext.index" :done="completed" />
        <aside v-else-if="introOf" class="trail-note" aria-label="Projeto aplicado">
          <div class="trail-note-head"><NuxtLink :to="trailUrl(introOf)">Projeto: {{ introOf.short }}</NuxtLink><span class="mono-meta">introdução · {{ introOf.steps.length }} etapas</span></div>
          <p>Leia a introdução e siga para a primeira etapa no fim da página.</p>
        </aside>
        <TocAside v-if="toc.length > 2" :links="toc" inline />
      </header>

      <ContentRenderer :value="page" class="prose" />

      <DocFooter :step="trailContext?.step" :trail="trailContext?.trail" :completed="completed" :message="message" :previous="turns.previous" :next="turns.next" @toggle="toggle" />
      <p class="doc-source">
        <a :href="sourceUrl">Ver esta nota no GitHub ↗</a>
        <span v-if="updated">Atualizada em {{ updated }}</span>
      </p>
    </article>

    <aside class="doc-aside">
      <TocAside v-if="toc.length" :links="toc" />
    </aside>
  </div>
</template>
