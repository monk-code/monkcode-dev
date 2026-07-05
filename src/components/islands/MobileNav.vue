<script setup lang="ts">
import { ref } from 'vue'

const { links, navLabel, buttonLabel } = defineProps<{
  links: { href: string; label: string }[]
  navLabel: string
  buttonLabel: string
}>()
const open = ref(false)
</script>

<template>
  <div class="md:hidden" @keydown.escape="open = false">
    <button
      type="button"
      :aria-expanded="open"
      aria-controls="mobile-menu"
      :aria-label="buttonLabel"
      class="p-2"
      @click="open = !open"
    >
      <span aria-hidden="true">{{ open ? '✕' : '☰' }}</span>
    </button>
    <nav
      v-show="open"
      id="mobile-menu"
      :aria-label="navLabel"
      class="absolute inset-x-0 top-full bg-(--surface) p-6 shadow-lg"
    >
      <ul class="flex flex-col gap-4">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" class="font-display text-lg" @click="open = false">
            {{ link.label }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
