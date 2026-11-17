<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from '#imports'
import { menuOpen, searchOpen, setTheme } from '~/lib/ui-state'

const route = useRoute()
const links = [
  { to: '/biblioteca', text: 'Biblioteca', match: (path: string) => path.startsWith('/biblioteca') || path.startsWith('/indice') },
  { to: '/trilhas', text: 'Trilhas', match: (path: string) => path.startsWith('/trilhas') || path.startsWith('/pratica') },
  { to: '/sobre', text: 'Sobre', match: (path: string) => path.startsWith('/sobre') },
]
const dark = ref(false)
const shortcut = ref('Ctrl K')
const progress = ref(0)
const isDoc = computed(() => !['/', '/biblioteca', '/indice', '/sobre'].includes(route.path) && !route.path.startsWith('/trilhas'))

function toggleTheme() { dark.value = !dark.value; setTheme(dark.value) }
function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
}
function onKey(event: KeyboardEvent) {
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((event.target as HTMLElement)?.tagName)
  if ((event.key === 'k' && (event.metaKey || event.ctrlKey)) || (event.key === '/' && !typing)) {
    event.preventDefault()
    searchOpen.value = true
  }
}
onMounted(() => {
  dark.value = document.documentElement.classList.contains('dark')
  if (/Mac|iPhone|iPad/.test(navigator.platform)) shortcut.value = '⌘ K'
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  onScroll()
})
onBeforeUnmount(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey) })
watch(() => route.fullPath, () => { menuOpen.value = false; requestAnimationFrame(onScroll) })
</script>

<template>
  <header class="site-header">
    <div class="site-header-inner">
      <NuxtLink to="/" class="brand" aria-label="Learning Notes, início">
        <svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6.5 5.2c4.6-.4 13.6-.5 19.2.2.5 7.2.4 14.6-.2 21.5-6.2.5-13.1.5-19.1-.1-.5-7.2-.5-14.4.1-21.6z" />
          <path d="M11 5.4c-.2 7.2-.1 14.4.2 21.4" stroke-opacity=".55" />
          <path d="M14.5 12.2c2.9-.2 5.9-.2 8.3.1M14.6 16.4c2.5-.1 4.6 0 6.4.2" />
        </svg>
        Learning Notes
      </NuxtLink>
      <nav class="site-nav" aria-label="Principal">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" :class="{ 'is-active': link.match(route.path) }" :aria-current="link.match(route.path) ? 'page' : undefined">{{ link.text }}</NuxtLink>
      </nav>
      <div class="header-tools">
        <button class="search-trigger" type="button" aria-label="Buscar nas notas" @click="searchOpen = true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 20 20" /></svg>
          <span class="label">Buscar notas</span><kbd>{{ shortcut }}</kbd>
        </button>
        <button class="icon-button" type="button" :aria-label="dark ? 'Usar tema claro' : 'Usar tema escuro'" :aria-pressed="dark" @click="toggleTheme">
          <svg v-if="dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.8v2.1M12 19.1v2.1M4.6 4.6l1.5 1.5M17.9 17.9l1.5 1.5M2.8 12h2.1M19.1 12h2.1M4.6 19.4l1.5-1.5M17.9 6.1l1.5-1.5" /></svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19.6 14.8A8 8 0 0 1 9.2 4.4a8 8 0 1 0 10.4 10.4z" /></svg>
        </button>
        <a class="icon-button" href="https://github.com/GustavoMelo1/learning-notes" aria-label="Repositório no GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z" /></svg>
        </a>
        <button class="icon-button menu-button" type="button" :aria-expanded="menuOpen" aria-controls="mobile-menu" :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'" @click="menuOpen = !menuOpen">
          <svg v-if="!menuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7.2c5.4-.3 10.7-.3 16 0M4 12c5.4-.2 10.7-.2 16 .1M4 16.9c5.4-.3 10.7-.2 16 0" /></svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6.3c4 3.6 8 7.5 12 11.4M18 6.2c-4.2 3.9-8 7.8-12 11.6" /></svg>
        </button>
      </div>
    </div>
    <div v-if="isDoc" class="reading-progress" :style="{ '--read': progress }" aria-hidden="true" />
  </header>
  <Transition name="menu">
    <div v-if="menuOpen" id="mobile-menu" class="mobile-menu">
      <nav aria-label="Principal">
        <NuxtLink to="/">Início</NuxtLink>
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.text }}</NuxtLink>
      </nav>
    </div>
  </Transition>
</template>
