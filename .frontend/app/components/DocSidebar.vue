<script setup lang="ts">
import { subjects } from '~/lib/subjects'
import type { SidebarGroup } from '~/lib/notes'

defineProps<{ folder: string; groups: SidebarGroup[]; current: string; done: string[] }>()
</script>

<template>
  <nav class="doc-sidebar-nav" aria-label="Notas do assunto">
    <div class="subject-tabs">
      <NuxtLink v-for="subject in subjects" :key="subject.folder" :to="subject.url" :class="{ 'is-active': subject.folder === folder }" :aria-current="subject.folder === folder ? 'true' : undefined">{{ subject.name }}</NuxtLink>
    </div>
    <section v-for="group in groups" :key="group.title" class="sidebar-group">
      <h2>{{ group.title }}</h2>
      <ul>
        <li v-for="item in group.items" :key="item.url">
          <NuxtLink :to="item.url" :class="{ 'is-active': item.url === current }" :aria-current="item.url === current ? 'page' : undefined">
            {{ item.text }}<span v-if="done.includes(item.url)" class="is-done-mark" aria-label="concluída">✓</span>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </nav>
</template>
