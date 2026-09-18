<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{ id: string; title: string; code: string; prompt: string }>()
const revealed = ref(false)
watch(() => props.code, () => { revealed.value = false })
</script>

<template>
  <section class="learning-lab" :aria-labelledby="`${id}-title`">
    <p class="eyebrow">Experimente</p>
    <h2 :id="`${id}-title`">{{ title }}</h2>
    <slot name="source" />
    <div class="lab-controls"><slot name="controls" /></div>
    <pre class="lab-code"><code>{{ code }}</code></pre>
    <p>{{ prompt }}</p>
    <button class="lab-reveal" :aria-expanded="revealed" :aria-controls="`${id}-result`" @click="revealed = !revealed">{{ revealed ? 'Ocultar resultado' : 'Mostrar resultado' }}</button>
    <div :id="`${id}-result`" aria-live="polite" class="lab-result"><slot v-if="revealed" name="result" /></div>
  </section>
</template>

<style>
.learning-lab { margin: 28px 0 40px; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); padding: 24px; }
.learning-lab h2 { margin: 8px 0 16px; padding: 0; border: 0; }
.learning-lab p { font-size: 14px; }
.lab-controls { display: flex; flex-wrap: wrap; gap: 16px; margin: 20px 0; }
.lab-controls label { display: flex; flex-direction: column; flex: 1 1 160px; gap: 6px; font-size: 13px; font-weight: 600; }
.lab-controls select { appearance: auto; background: var(--vp-c-bg); color: var(--vp-c-text-1); border: 1px solid var(--vp-c-divider); padding: 8px; border-radius: 6px; font: inherit; width: 100%; }
.lab-controls input[type=range] { width: 100%; accent-color: var(--vp-c-brand-1); min-height: 32px; }
.learning-lab .lab-code { margin: 16px 0; overflow-x: auto; padding: 16px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); border-radius: 8px; font-size: 12px; line-height: 1.9; }
.learning-lab .lab-code code { padding: 0; background: transparent; color: var(--vp-c-text-1); }
.lab-reveal { background: var(--vp-c-brand-3); color: white; border-radius: 6px; padding: 9px 14px; font-weight: 600; cursor: pointer; }
.learning-lab :is(button, select, input, [tabindex]):focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 3px; }
.lab-table { overflow-x: auto; }
.lab-table table { width: 100%; display: table; font-size: 13px; white-space: nowrap; }
.lab-table caption { text-align: left; color: var(--vp-c-text-2); font-size: 12px; padding-bottom: 8px; }
.lab-table th, .lab-table td { padding: 7px 10px; }
.lab-result:not(:empty) { margin-top: 20px; }
.list-items { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; }
.list-item { display: grid; text-align: center; min-width: 52px; padding: 10px; border: 1px solid var(--vp-c-divider); border-radius: 6px; }
.list-item small { color: var(--vp-c-text-2); font-size: 11px; }
.list-item.selected { background: var(--vp-c-brand-soft); border-color: var(--vp-c-brand-1); }
@media (max-width: 540px) { .learning-lab { padding: 16px; } }
</style>
