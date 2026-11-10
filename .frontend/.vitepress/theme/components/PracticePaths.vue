<script setup lang="ts">
import { withBase } from 'vitepress'
import { paths } from '../paths'
import { useProgress } from '../progress'
const { completed, message } = useProgress()
const nextStep = (path: typeof paths[number]) => path.steps.find(step => !completed.value.includes(step.url))
const started = (path: typeof paths[number]) => path.steps.some(step => completed.value.includes(step.url))
</script>

<template>
  <div class="notebook practice-page">
    <header class="page-heading">
      <p class="eyebrow">Aprender por assunto</p><h1>Guias de estudo.</h1>
      <p>Escolhe o que tu quer aprender. Cada guia começa pelo conceito e usa um projeto para colocar o conteúdo em prática.</p>
    </header>
    <p class="quiet-note">Começa pela introdução ou abre uma etapa abaixo. Em Frontend, a sequência é HTML → CSS → JavaScript → Vue.</p>
    <p v-if="message" role="status" class="save-message">{{ message }}</p>
    <div class="path-list">
      <section v-for="(path, index) in paths" :key="path.id" class="path-section" :aria-labelledby="`path-${path.id}`">
        <div class="path-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</div>
        <div class="path-content">
          <p class="eyebrow">{{ path.subject }}</p>
          <h2 :id="`path-${path.id}`">{{ path.title }}</h2><p>{{ path.description }}</p>
          <div class="guide-actions"><a class="action primary-action" :href="withBase(started(path) ? nextStep(path)?.url || path.url : path.steps[0].url)">{{ started(path) ? nextStep(path) ? 'Continuar estudo' : 'Revisar guia' : 'Começar primeira etapa' }} →</a><a class="text-link" :href="withBase(path.url)">Começar pela introdução →</a></div>
          <p class="path-prerequisite">Antes de começar: {{ path.prerequisite }}.</p>
          <ol class="path-steps">
            <li v-for="(step, stepIndex) in path.steps" :key="step.url">
              <a :href="withBase(step.url)"><span class="step-number">{{ stepIndex + 1 }}</span><span>{{ step.title }}</span><span v-if="completed.includes(step.url)" class="step-status">Estudada</span><span v-else aria-hidden="true" class="step-arrow">→</span></a>
            </li>
          </ol>
          <div class="path-meta"><span>{{ path.steps.filter(step => completed.includes(step.url)).length }} de {{ path.steps.length }} estudadas</span><a :href="path.sourceUrl">Código de origem ↗</a></div>
        </div>
      </section>
    </div>
    <p class="quiet-note">O progresso fica neste navegador, sem conta. Marcar uma etapa é opcional.</p>
  </div>
</template>
