<script setup lang="ts">
// Ctrl/⌘ K or "/" opens it. The index (/search.json) is prerendered at build time and loaded on first use.
import { computed, nextTick, ref, shallowRef, watch } from 'vue'
import MiniSearch from 'minisearch'
import { navigateTo, useRuntimeConfig } from '#imports'
import { searchOpen } from '~/lib/ui-state'

interface Section { id: string; title: string; titles: string[]; content: string; level: number }
interface Hit { id: string; title: string; path: string; text: string }

const query = ref('')
const active = ref(0)
const input = ref<HTMLInputElement>()
const index = shallowRef<MiniSearch<Section>>()
const loading = ref(false)
const failed = ref(false)
const normalize = (term: string) => term.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

async function load() {
  if (index.value || loading.value) return
  loading.value = true
  try {
    const sections = await $fetch<Section[]>(`${useRuntimeConfig().app.baseURL}search.json`)
    const search = new MiniSearch<Section>({
      fields: ['title', 'titles', 'content'], storeFields: ['title', 'titles', 'content'],
      extractField: (doc, field) => field === 'titles' ? doc.titles.join(' ') : (doc as unknown as Record<string, string>)[field],
      processTerm: term => normalize(term),
      searchOptions: { boost: { title: 3, titles: 1.5 }, fuzzy: 0.2, prefix: true },
    })
    search.addAll(sections.filter(section => section.content || section.title))
    index.value = search
  } catch { failed.value = true }
  finally { loading.value = false }
}

const hits = computed<Hit[]>(() => {
  if (!index.value || query.value.trim().length < 2) return []
  return index.value.search(query.value).slice(0, 12).map(result => {
    const text = String(result.content || '')
    const term = result.terms[0] || ''
    const at = Math.max(0, normalize(text).indexOf(term) - 40)
    return {
      id: result.id as string, title: result.title,
      path: [...(result.titles as string[])].join(' › '),
      text: (at ? '…' : '') + text.slice(at, at + 160),
    }
  })
})

watch(searchOpen, async open => {
  if (!open) return
  query.value = ''
  active.value = 0
  load()
  await nextTick()
  input.value?.focus()
})
watch(query, () => { active.value = 0 })

function close() { searchOpen.value = false }
function go(hit?: Hit) {
  if (!hit) return
  close()
  navigateTo(hit.id)
}
function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
  else if (event.key === 'ArrowDown') { event.preventDefault(); active.value = Math.min(active.value + 1, hits.value.length - 1) }
  else if (event.key === 'ArrowUp') { event.preventDefault(); active.value = Math.max(active.value - 1, 0) }
  else if (event.key === 'Enter') { event.preventDefault(); go(hits.value[active.value]) }
}
const highlight = (text: string) => {
  const escaped = text.replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]!))
  const terms = query.value.trim().split(/\s+/).filter(term => term.length > 1).map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  return terms.length ? escaped.replace(new RegExp(`(${terms.join('|')})`, 'gi'), '<mark>$1</mark>') : escaped
}
</script>

<template>
  <Teleport to="body">
    <Transition name="search">
      <div v-if="searchOpen" class="search-backdrop" @mousedown.self="close">
        <div class="search-dialog" role="dialog" aria-modal="true" aria-label="Buscar nas notas" @keydown="onKey">
          <div class="search-field">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 20 20" /></svg>
            <input ref="input" v-model="query" type="search" placeholder="O que você quer revisar?" aria-label="Buscar" role="combobox" aria-expanded="true" aria-controls="search-results" :aria-activedescendant="hits[active] ? `hit-${active}` : undefined" autocomplete="off" spellcheck="false">
          </div>
          <ul v-if="hits.length" id="search-results" class="search-results" role="listbox">
            <li v-for="(hit, i) in hits" :id="`hit-${i}`" :key="hit.id" role="option" :aria-selected="i === active">
              <NuxtLink :to="hit.id" :aria-selected="i === active" @click="close" @mousemove="active = i">
                <span v-if="hit.path" class="hit-path">{{ hit.path }}</span>
                <strong v-html="highlight(hit.title)" />
                <span class="hit-text" v-html="highlight(hit.text)" />
              </NuxtLink>
            </li>
          </ul>
          <p v-else class="search-empty">
            {{ failed ? 'Não foi possível carregar a busca. Tente de novo em instantes.' : loading ? 'Abrindo o caderno…' : query.trim().length < 2 ? 'Digite um conceito, um comando ou um assunto. Ex.: GROUP BY, dicionário, NULL.' : `Nada encontrado para “${query}”. Tente um termo mais curto.` }}
          </p>
          <div class="search-hint" aria-hidden="true"><span>↑↓ navegar</span><span>↵ abrir</span><span>esc fechar</span></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
