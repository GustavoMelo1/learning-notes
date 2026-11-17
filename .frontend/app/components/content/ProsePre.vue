<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ code?: string; language?: string | null; filename?: string | null; class?: string | null; meta?: string | null }>()
const copied = ref(false)
const names: Record<string, string> = { sql: 'SQL', python: 'Python', bash: 'Terminal', powershell: 'PowerShell', js: 'JavaScript', ts: 'TypeScript', json: 'JSON', html: 'HTML', css: 'CSS', vue: 'Vue', md: 'Markdown', text: 'Saída', qlik: 'Qlik', gitignore: '.gitignore' }

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code || '')
    copied.value = true
    setTimeout(() => { copied.value = false }, 1800)
  } catch { /* clipboard blocked: the code stays selectable */ }
}
</script>

<template>
  <div class="code-block">
    <div class="code-block-bar">
      <span>{{ filename || names[language || ''] || language || 'Código' }}</span>
      <button type="button" class="code-copy copy" :class="{ 'is-copied': copied }" :aria-label="copied ? 'Código copiado' : 'Copiar código'" @click="copy">{{ copied ? 'copiado ✓' : 'copiar' }}</button>
    </div>
    <pre :class="props.class"><slot /></pre>
  </div>
</template>
