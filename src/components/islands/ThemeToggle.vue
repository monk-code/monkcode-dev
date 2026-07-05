<script setup lang="ts">
import { onMounted, ref } from 'vue'

// SSR-safe: default for server render, real value read after mount
const theme = ref<'dark' | 'light'>('dark')

onMounted(() => {
  theme.value = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
})

const toggle = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  localStorage.setItem('theme', theme.value)
}
</script>

<template>
  <button
    type="button"
    :aria-label="`Switch theme (current: ${theme})`"
    class="rounded-full p-2 text-(--ink-muted) transition hover:text-(--accent)"
    @click="toggle"
  >
    <span v-if="theme === 'dark'" aria-hidden="true">☀</span>
    <span v-else aria-hidden="true">☾</span>
  </button>
</template>
