<script setup lang="ts">
import { computed, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from 'vitepress'
import { paths } from '../paths'
import { subjects } from '../subjects'
import { celebrate } from '../motion'
import HandCheck from './HandCheck.vue'
import { useProgress } from '../progress'
import { activeTrailId, syncTrailLocation } from '../trail-context'
import { resolveTrailContext, trails, trailStepUrl } from '../trails'
import TrailLessonContext from './TrailLessonContext.vue'
const { frontmatter, page } = useData()
onMounted(() => syncTrailLocation(window.location.href))
const trailContext = computed(() => resolveTrailContext(page.value.relativePath, activeTrailId.value))
const { completed, message, toggle } = useProgress()
const path = computed(() => paths.find(path => path.id === frontmatter.value.path))
const position = computed(() => Number(frontmatter.value.step) - 1)
const step = computed(() => path.value?.steps[position.value])
const next = computed(() => path.value?.steps[position.value + 1])
const previous = computed(() => path.value?.steps[position.value - 1])
// Notes opened from the library: show which subject they belong to and whether a trail uses them.
const pageUrl = computed(() => '/' + page.value.relativePath.replace(/\.md$/, '').replace(/\/index$/, '/'))
const subject = computed(() => subjects.find(item => page.value.relativePath.startsWith(item.folder + '/')))
const trailMembership = computed(() => {
  for (const trail of trails) {
    const index = trail.steps.findIndex(item => item.url === pageUrl.value)
    if (index >= 0) return { trail, index, step: trail.steps[index] }
  }
  return null
})
function toggleStep(id: string, event: Event) {
  const wasDone = completed.value.includes(id)
  toggle(id)
  if (!wasDone) celebrate(event.currentTarget as Element)
}
</script>

<template>
  <DefaultTheme.Layout :class="{ 'in-learning-trail': !!trailContext }">
    <template #not-found>
      <main class="notebook missing-page"><p class="eyebrow">Página não encontrada</p><h1>Essa anotação não está aqui.</h1><p>O endereço pode ter mudado. A biblioteca é um bom lugar para procurar.</p><a class="text-link" :href="withBase('/biblioteca')">Buscar na biblioteca</a></main>
    </template>
    <template #doc-before>
      <TrailLessonContext v-if="trailContext" :trail="trailContext.trail" :index="trailContext.index" placement="top" />
      <template v-else>
      <nav v-if="path && step" class="lesson-context" aria-label="Percurso atual">
        <a :href="withBase(path.url)">{{ path.title }}</a><span aria-hidden="true">/</span><span>Aplicação</span>
        <span class="lesson-position">Etapa {{ position + 1 }} de {{ path.steps.length }} · {{ step.title }}</span>
      </nav>
      <details v-if="path && step" class="lesson-outline"><summary>Ver etapas deste guia</summary><ol><li v-for="(item, index) in path.steps" :key="item.url"><a :href="withBase(item.url)" :aria-current="item.url === step.url ? 'step' : undefined">{{ index + 1 }}. {{ item.title }}<span v-if="completed.includes(item.url)"> · Estudada</span></a></li></ol></details>
      <template v-else>
        <nav class="note-context" aria-label="Localização"><a :href="withBase('/biblioteca')">Biblioteca</a><template v-if="subject"><span aria-hidden="true">/</span><a :href="withBase(subject.url)">{{ subject.name }}</a></template><template v-if="frontmatter.title || page.title"><span aria-hidden="true">/</span><span>{{ frontmatter.title || page.title }}</span></template></nav>
        <aside v-if="trailMembership" class="margin-note trail-hint">esta nota é a etapa {{ trailMembership.index + 1 }} da trilha de {{ trailMembership.trail.title.split(':')[0] }}. <a :href="withBase(trailStepUrl(trailMembership.trail, trailMembership.step))">seguir pela trilha</a></aside>
      </template>
      </template>
    </template>
    <template #doc-after>
      <TrailLessonContext v-if="trailContext" :trail="trailContext.trail" :index="trailContext.index" placement="bottom" />
      <section v-else-if="path && step" class="lesson-footer" aria-label="Seu próximo passo">
        <div class="lesson-check"><div><h2>Fez o exercício?</h2><p>Marque para encontrar seu lugar depois.</p></div><button class="action check-action" :aria-pressed="completed.includes(step.url)" @click="toggleStep(step.url, $event)"><HandCheck :done="completed.includes(step.url)" />{{ completed.includes(step.url) ? 'Estudada' : 'Marcar como estudada' }}</button></div>
        <p role="status" class="save-message">{{ message }}</p>
        <nav class="lesson-navigation" aria-label="Etapas do percurso">
          <a :href="withBase(previous?.url || path.url)"><small>{{ previous ? 'Anterior' : 'Voltar' }}</small>{{ previous?.title || 'Introdução ao assunto' }}</a>
          <a :href="withBase(next?.url || path.url)"><small>{{ next ? 'Próxima etapa' : 'Revisar' }}</small>{{ next?.title || path.title }} →</a>
        </nav>
      </section>
    </template>
    <template #layout-bottom><footer class="site-colophon"><span>Learning Notes</span><p>Conhecimento aberto, no seu ritmo.</p><a :href="withBase('/sobre')">Sobre o projeto</a><a href="https://github.com/GustavoMelo1/learning-notes">Repositório ↗</a></footer></template>
  </DefaultTheme.Layout>
</template>
