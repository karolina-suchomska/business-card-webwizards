<template>
  <div class="business-card">
    <div class="business-card__container">
      <div v-if="store.loading" class="business-card__loading">Ładowanie...</div>
      <div v-else-if="store.error" class="business-card__error">Błąd: {{ store.error }}</div>
      <div v-else-if="store.user" class="business-card__content">
        <BusinessCardProfile :user="store.user" />
        <BusinessCardAbout :about="store.user.about" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/main';

import BusinessCardProfile from '@/components/BusinessCardProfile.vue';
import BusinessCardAbout from '@/components/BusinessCardAbout.vue';

const store = useUserStore();

onMounted(() => {
  if (!store.user) {
    store.fetchUser();
  }
})
</script>
