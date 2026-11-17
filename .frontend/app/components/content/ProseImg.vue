<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'

const props = defineProps<{ src?: string; alt?: string; width?: string | number; height?: string | number }>()
const noteDir = inject<Ref<string>>('noteDir')
const base = useRuntimeConfig().app.baseURL.replace(/\/$/, '')
// Images sit next to the notes (./imagens/x.svg); they are published at the same relative place.
const resolved = computed(() => {
  const src = props.src || ''
  if (/^(https?:|data:)/.test(src)) return src
  const path = src.startsWith('/') ? src : new URL(src, `https://notes.local${noteDir?.value || '/'}`).pathname
  return base + path
})
</script>

<template><img :src="resolved" :alt="alt" :width="width" :height="height" loading="lazy" decoding="async"></template>
