// Stand-ins for Nuxt auto-imports used by components under test.
import { reactive } from 'vue'

export const route = reactive({ path: '/', fullPath: '/', query: {} as Record<string, string>, params: {} as Record<string, string> })
export const useRoute = () => route
export const useRuntimeConfig = () => ({ app: { baseURL: '/learning-notes/' } })
export const navigateTo = (to: string) => { route.path = to; route.fullPath = to }
