<script setup lang="ts">
import { withBase } from 'vitepress'
import { paths, subjects } from '../paths'
</script>

<template>
  <div class="notebook home-page">
    <header class="home-intro">
      <div><p class="eyebrow">O caderno de Gustavo Melo</p><h1>O que aprendo<br>com dados.</h1><p class="intro-copy">Anotações, tentativas e projetos que me ajudam a entender as coisas. Organizados para consultar e colocar em prática.</p><a class="text-link" :href="withBase('/biblioteca')">Abrir a biblioteca <span aria-hidden="true">→</span></a></div>
      <aside class="margin-note"><span class="margin-rule" aria-hidden="true"></span><p>Escrevo depois de testar.<br>Às vezes, depois de errar.</p><small>Este caderno cresce junto com os meus estudos.</small></aside>
    </header>
    <section class="home-practice" aria-labelledby="practice-title">
      <div class="section-heading"><div><p class="eyebrow">Do conceito ao código</p><h2 id="practice-title">O que tu quer aprender?</h2></div><a class="text-link" :href="withBase('/pratica/')">Ver guias →</a></div>
      <ol class="project-index"><li v-for="(path, index) in paths" :key="path.id"><a :href="withBase(path.url)"><span class="index-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span><span class="project-info"><span class="project-subject">{{ path.subject }}</span><strong>{{ path.title }}</strong><span class="project-description">{{ path.description }}</span></span><span class="project-length">Conceito e aplicação <span aria-hidden="true">↗</span></span></a></li></ol>
    </section>
    <section class="home-subjects" aria-labelledby="subjects-title"><div class="section-heading"><h2 id="subjects-title">Consultar por assunto</h2><span class="muted">Uma nota de cada vez.</span></div><div class="subject-index"><a v-for="subject in subjects" :key="subject.name" :href="withBase(subject.url)"><strong>{{ subject.name }}</strong><span>{{ subject.description }}</span><span aria-hidden="true">→</span></a></div></section>
  </div>
</template>
