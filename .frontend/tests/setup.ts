import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/vue'
import { config } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { afterEach } from 'vitest'

// NuxtLink renders a plain anchor; the real one adds the base URL at runtime.
config.global.components = {
  NuxtLink: defineComponent({
    props: { to: { type: String, required: true } },
    setup: (props, { slots, attrs }) => () => h('a', { ...attrs, href: props.to }, slots.default?.()),
  }),
}

afterEach(() => { cleanup(); localStorage.clear() })
