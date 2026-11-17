<script setup lang="ts">
// End of a page: mark the step, then turn the page. Once the step is done,
// "next" becomes the one primary action and "desmarcar" steps aside.
import { computed } from 'vue'
import { celebrate } from '~/lib/motion'
import type { LearningTrail, TrailStep } from '~/lib/trails'
import HandCheck from './HandCheck.vue'

interface Turn { text: string; url: string }
const props = defineProps<{
  step?: TrailStep
  trail?: LearningTrail
  completed: string[]
  message: string
  previous?: Turn
  next?: Turn
}>()
const emit = defineEmits<{ toggle: [id: string] }>()
const isDone = computed(() => !!props.step && props.completed.includes(props.step.id))

function toggle(event: Event) {
  if (!props.step) return
  const wasDone = isDone.value
  emit('toggle', props.step.id)
  if (wasDone) return
  const finished = props.trail?.steps.every(item => item.id === props.step!.id || props.completed.includes(item.id))
  celebrate(event.currentTarget as Element, finished)
}
</script>

<template>
  <footer class="doc-footer">
    <section v-if="step" class="step-check" :class="{ 'is-done': isDone }" aria-label="Seu progresso nesta etapa">
      <template v-if="!isDone">
        <div>
          <h2>Terminou esta etapa?</h2>
          <p>Marque para retomar a trilha daqui depois.</p>
        </div>
        <button class="action primary" type="button" :aria-pressed="false" @click="toggle"><HandCheck :done="false" />Marcar como concluída</button>
      </template>
      <template v-else>
        <div class="step-done">
          <HandCheck :done="true" :size="28" />
          <div>
            <h2>Etapa concluída.</h2>
            <button class="undo-link" type="button" :aria-pressed="true" @click="toggle">desmarcar</button>
          </div>
        </div>
      </template>
    </section>
    <!-- Success is already visible in the button; problems (storage blocked, old version) must be read. -->
    <p :class="/^Etapa/.test(message) ? 'visually-hidden' : 'save-message'" role="status">{{ message }}</p>
    <nav v-if="previous || next" class="page-turn" aria-label="Virar a página">
      <NuxtLink v-if="previous" class="previous" :to="previous.url"><small>{{ trail ? 'etapa anterior' : 'anterior' }}</small><strong>{{ previous.text }}</strong></NuxtLink>
      <NuxtLink v-if="next" class="next" :class="{ primary: isDone }" :to="next.url"><small>{{ trail ? 'próxima etapa' : 'próxima' }}</small><strong>{{ next.text }}</strong></NuxtLink>
    </nav>
  </footer>
</template>
