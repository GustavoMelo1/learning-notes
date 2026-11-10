<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { paths } from '../paths'
import { useProgress } from '../progress'
const { completed, message } = useProgress()
const guides = computed(() => paths.map(path => {
  const count = path.steps.filter(step => completed.value.includes(step.url)).length
  const next = path.steps.find(step => !completed.value.includes(step.url))
  return { ...path, count, target: count && next ? next.url : path.url,
    action: count === path.steps.length ? 'Revisar' : count ? 'Continuar' : 'Começar',
    detail: count && next ? next.title : count ? 'Todas as etapas estudadas' : path.prerequisite,
  }
}))
</script>

<template>
  <section class="study-starts" aria-labelledby="study-starts-title">
    <div class="section-heading"><div><p class="eyebrow">Aprender em sequência</p><h2 id="study-starts-title">Escolhe teu próximo estudo.</h2></div><a class="text-link" :href="withBase('/pratica/')">Ver todas as etapas →</a></div>
    <div class="study-start-list">
      <a v-for="guide in guides" :key="guide.id" class="study-start" :href="withBase(guide.target)">
        <span class="study-start-copy"><strong>{{ guide.title }}</strong><span>{{ guide.detail }}</span></span>
        <span class="study-start-progress">{{ guide.count }} / {{ guide.steps.length }} etapas</span>
        <span class="study-start-action">{{ guide.action }} <span aria-hidden="true">→</span></span>
      </a>
    </div>
    <p v-if="message" class="save-message" role="status">{{ message }}</p>
  </section>
</template>
