<script setup lang="ts">
import { withBase } from 'vitepress'
import { data as notes } from '../notes.data'
import { subjects } from '../subjects'
const groups = subjects.map(subject => ({ ...subject, notes: notes.filter(note => note.category === subject.name) }))
</script>

<template>
  <main class="notebook full-index">
    <header class="page-heading"><p class="eyebrow">Tudo em um lugar</p><h1>Todas as notas.</h1><p>{{ notes.length }} notas em {{ groups.length }} assuntos. Esta lista é completa, sem filtros nem paginação.</p><a class="text-link" :href="withBase('/biblioteca')">Prefere buscar? Abrir biblioteca →</a></header>
    <nav class="index-subjects" aria-label="Ir para um assunto"><a v-for="group in groups" :key="group.folder" :href="`#${group.folder}`">{{ group.name }} ({{ group.notes.length }})</a></nav>
    <section v-for="group in groups" :key="group.folder" class="index-section" :aria-labelledby="group.folder">
      <h2 :id="group.folder">{{ group.name }} <small>{{ group.notes.length }} notas</small></h2>
      <ul><li v-for="note in group.notes" :key="note.url"><a class="index-note" :href="withBase(note.url)">{{ note.title }}</a><span>{{ note.kind }}</span></li></ul>
    </section>
  </main>
</template>
