<script setup lang="ts">
// Shared frame of every interactive lab. With `expected`, the reader commits to an answer
// (a number, or one of `options`) before the result can be revealed: active recall, not reading.
import { computed, ref, watch } from 'vue'
import { celebrate } from '~/lib/motion'
import HandCheck from './HandCheck.vue'

const props = defineProps<{
  id: string
  title: string
  code: string
  prompt: string
  expected?: number | string
  options?: string[]
}>()

const revealed = ref(false)
const guess = ref<number | string | ''>('')
const verdict = ref<'right' | 'wrong' | 'empty' | null>(null)
const attempts = ref(0)
const checkButton = ref<HTMLButtonElement>()
const asks = computed(() => props.expected !== undefined)
const canReveal = computed(() => !asks.value || attempts.value > 0)

watch(() => props.code, () => { revealed.value = false; verdict.value = null; attempts.value = 0; guess.value = '' })

function check() {
  if (guess.value === '' || guess.value === null) { verdict.value = 'empty'; return }
  attempts.value++
  verdict.value = String(guess.value).trim() === String(props.expected) ? 'right' : 'wrong'
  if (verdict.value === 'right') { revealed.value = true; celebrate(checkButton.value) }
}
function choose(option: string) { guess.value = option; verdict.value = null }

const messages = {
  right: 'Isso! Você previu o resultado antes de ver.',
  wrong: 'Ainda não. Releia a consulta e tente de novo, ou veja a resposta.',
  empty: 'Responda antes de conferir — o palpite é o exercício.',
}
</script>

<template>
  <section class="learning-lab" :aria-labelledby="`${id}-title`">
    <h2 :id="`${id}-title`" class="lab-title">{{ title }}</h2>
    <slot name="source" />
    <div v-if="$slots.controls" class="lab-controls"><slot name="controls" /></div>
    <pre class="lab-code"><code>{{ code }}</code></pre>

    <form v-if="asks" class="lab-guess" @submit.prevent="check">
      <template v-if="options">
        <p :id="`${id}-question`" class="lab-question">{{ prompt }}</p>
        <div class="lab-options" role="group" :aria-labelledby="`${id}-question`">
          <button v-for="option in options" :key="option" type="button" :aria-pressed="guess === option" @click="choose(option)">{{ option }}</button>
        </div>
      </template>
      <template v-else>
        <label :for="`${id}-guess`" class="lab-question">{{ prompt }}</label>
        <div class="lab-guess-row" style="margin-top: 10px">
          <input :id="`${id}-guess`" v-model="guess" type="number" min="0" inputmode="numeric" @input="verdict = null">
        </div>
      </template>
      <div class="actions-row" style="margin-top: 14px">
        <button ref="checkButton" class="lab-check" type="submit">Conferir</button>
        <button v-if="canReveal" type="button" class="lab-reveal" :aria-expanded="revealed" :aria-controls="`${id}-result`" @click="revealed = !revealed">{{ revealed ? 'Ocultar resposta' : 'Ver resposta' }}</button>
      </div>
      <p v-if="verdict" class="lab-verdict" :class="`is-${verdict}`" role="status" style="margin-top: 12px">
        <HandCheck v-if="verdict === 'right'" :done="true" />{{ messages[verdict] }}
      </p>
    </form>

    <template v-else>
      <p class="lab-question">{{ prompt }}</p>
      <button class="lab-reveal" :aria-expanded="revealed" :aria-controls="`${id}-result`" @click="revealed = !revealed">{{ revealed ? 'Ocultar resultado' : 'Mostrar resultado' }}</button>
    </template>

    <div :id="`${id}-result`" aria-live="polite" class="lab-result">
      <Transition name="lab-result"><div v-if="revealed"><slot name="result" /></div></Transition>
    </div>
  </section>
</template>
