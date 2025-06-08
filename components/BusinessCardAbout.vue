<template>
  <div class="business-card__about">
    <div class="business-card__about-wrapper" :class="{ 'expanded': isExpanded }" >
      <p v-for="(paragraph, index) in displayedParagraphs" :key="paragraph + index">
        {{ paragraph }}
      </p>
    </div>
    
    <button class="business-card__button-main business-card__about-toggle" @click="isExpanded = !isExpanded">
      {{ isExpanded ? 'Zwiń opis' : 'Rozwiń opis' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const { about } = defineProps<{
  about: string
}>();

const isExpanded = ref(false);

const paragraphs = computed(() =>
  about.split('\n').filter(p => p.trim().length > 0)
);

const displayedParagraphs = computed(() =>
  isExpanded.value ? paragraphs.value : [paragraphs.value[0]]
);
</script>
