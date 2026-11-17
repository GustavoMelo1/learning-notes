<script setup lang="ts">
// The note's first "# Title" is already the page header, so it is not repeated.
// Later "#" headings are sections of the note and become h2, keeping one h1 per page.
import { inject, type Ref } from 'vue'

const props = defineProps<{ id?: string }>()
const titleId = inject<Ref<string | undefined>>('noteTitleId')
const isTitle = !!props.id && props.id === titleId?.value
</script>

<template>
  <h2 v-if="!isTitle" :id="id"><a v-if="id" :href="`#${id}`"><slot /></a><slot v-else /></h2>
</template>
