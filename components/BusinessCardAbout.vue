<template>
  <div class="business-card__about">
    <p>{{ about }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  about: string
}>()
</script>
