<script setup lang="ts">
import { computed } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from 'vitepress'
import { paths } from '../paths'
import { useProgress } from '../progress'
const { frontmatter } = useData()
const { completed, message, toggle } = useProgress()
const path = computed(() => paths.find(path => path.id === frontmatter.value.path))
const position = computed(() => Number(frontmatter.value.step) - 1)
const step = computed(() => path.value?.steps[position.value])
const next = computed(() => path.value?.steps[position.value + 1])
const previous = computed(() => path.value?.steps[position.value - 1])
</script>

<template>
  <DefaultTheme.Layout>
    <template #not-found>
      <main class="notebook missing-page"><p class="eyebrow">Página não encontrada</p><h1>Essa anotação não está aqui.</h1><p>O endereço pode ter mudado. A biblioteca é um bom lugar para procurar.</p><a class="text-link" :href="withBase('/biblioteca')">Buscar na biblioteca →</a></main>
    </template>
    <template #doc-before>
      <nav v-if="path && step" class="lesson-context" aria-label="Percurso atual">
        <a :href="withBase(path.url)">{{ path.title }}</a><span aria-hidden="true">/</span><span>Aplicação</span>
        <span class="lesson-position">Etapa {{ position + 1 }} de {{ path.steps.length }}</span>
      </nav>
      <p v-else class="note-context">Caderno de estudos / Gustavo Melo</p>
    </template>
    <template #doc-after>
      <section v-if="path && step" class="lesson-footer" aria-label="Seu próximo passo">
        <div class="lesson-check"><div><h2>Fez o exercício?</h2><p>Marca para encontrar teu lugar depois.</p></div><button class="action" :aria-pressed="completed.includes(step.url)" @click="toggle(step.url)">{{ completed.includes(step.url) ? 'Estudada ✓' : 'Marcar como estudada' }}</button></div>
        <p role="status" class="save-message">{{ message }}</p>
        <nav class="lesson-navigation" aria-label="Etapas do percurso">
          <a :href="withBase(previous?.url || path.url)"><small>{{ previous ? 'Anterior' : 'Voltar' }}</small>{{ previous?.title || 'Introdução ao assunto' }}</a>
          <a :href="withBase(next?.url || path.url)"><small>{{ next ? 'Próxima etapa' : 'Revisar' }}</small>{{ next?.title || path.title }} →</a>
        </nav>
      </section>
    </template>
    <template #layout-bottom><footer class="site-colophon"><span>Learning Notes</span><p>Escrito enquanto aprendo. Por Gustavo Melo.</p><a href="https://github.com/GustavoMelo1/learning-notes">Ver no GitHub ↗</a></footer></template>
  </DefaultTheme.Layout>
</template>
