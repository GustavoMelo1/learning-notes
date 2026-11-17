<script setup lang="ts">
// "Nesta página": follows the section being read and marks it with a red margin line.
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

interface TocLink { id: string; text: string; depth: number; children?: TocLink[] }
const props = defineProps<{ links: TocLink[]; inline?: boolean }>()
const flat = computed(() => props.links.flatMap(link => [link, ...(link.children || [])]))
const active = ref('')
let observer: IntersectionObserver | undefined

function observe() {
  observer?.disconnect()
  if (props.inline || !('IntersectionObserver' in window)) return
  observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
    if (visible[0]) active.value = visible[0].target.id
  }, { rootMargin: '-80px 0px -65% 0px' })
  flat.value.forEach(link => { const el = document.getElementById(link.id); if (el) observer!.observe(el) })
}
onMounted(observe)
watch(flat, () => requestAnimationFrame(observe))
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <details v-if="inline" class="toc-inline">
    <summary>Nesta página · {{ flat.length }} seções</summary>
    <ul><li v-for="link in flat" :key="link.id"><a :href="`#${link.id}`">{{ link.text }}</a></li></ul>
  </details>
  <nav v-else class="toc-aside" aria-label="Nesta página">
    <h2>Nesta página</h2>
    <ul>
      <li v-for="link in flat" :key="link.id" :class="`depth-${link.depth}`">
        <a :href="`#${link.id}`" :class="{ 'is-active': active === link.id }">{{ link.text }}</a>
      </li>
    </ul>
  </nav>
</template>
