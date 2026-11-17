<script setup lang="ts">
import { withBase } from 'vitepress'
import { trails } from '../trails'
import { useProgress } from '../progress'
import LearningPathCard from './LearningPathCard.vue'
import { vReveal } from '../motion'
const { completed, message } = useProgress()
</script>
<template>
  <div class="notebook trails-page">
    <header class="page-heading"><h1>Trilhas de aprendizado.</h1><p>Uma sequência de conteúdos reais da biblioteca. Comece pelos fundamentos, marque o que estudou e retome no seu ritmo.</p></header>
    <div v-reveal.stagger class="trail-grid"><LearningPathCard v-for="trail in trails" :key="trail.id" :trail="trail" :completed="completed" /></div>
    <p v-if="message" class="save-message" role="status">{{ message }}</p>
    <aside class="catalog-help"><h2>Já tem uma pergunta em mente?</h2><p>A biblioteca continua aberta para consultas. Para aplicar um assunto em um projeto, explore os guias práticos.</p><div class="guide-actions"><a class="text-link" :href="withBase('/biblioteca')">Consultar a biblioteca</a><a class="text-link" :href="withBase('/pratica/')">Guias práticos</a></div></aside>
    <p class="quiet-note">Seu progresso fica apenas neste navegador. Sem conta, sem envio a servidores.</p>
  </div>
</template>
