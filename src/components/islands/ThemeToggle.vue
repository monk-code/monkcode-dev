<script setup lang="ts">
import { ref } from 'vue'

const theme = ref(document.documentElement.dataset.theme ?? 'dark')

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
