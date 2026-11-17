<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'
import { resolveNoteLink } from '~/lib/links'

const props = defineProps<{ href?: string; target?: string; rel?: string; download?: boolean | string }>()
const noteDir = inject<Ref<string>>('noteDir')
const base = useRuntimeConfig().app.baseURL
const link = computed(() => resolveNoteLink(props.href || '', noteDir?.value || '/'))
const staticHref = computed(() => base.replace(/\/$/, '') + link.value.href)
</script>

<template>
  <a v-if="link.external" :href="link.href" :target="target" :rel="rel || (target === '_blank' ? 'noopener' : undefined)"><slot /></a>
  <a v-else-if="link.static" :href="staticHref" :target="target" :rel="target === '_blank' ? 'noopener' : rel" :download="download"><slot /></a>
  <NuxtLink v-else :to="link.href" :target="target"><slot /></NuxtLink>
</template>
