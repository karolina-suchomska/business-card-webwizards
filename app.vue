<template>
  <div class="business-card">
    <div v-if="store.loading" class="business-card__loading">Ładowanie...</div>
    <BusinessCardError v-else-if="store.error" :error="store.error" />
    <div v-else-if="store.user" class="business-card__container">
      <div class="business-card__content">
        <BusinessCardProfile :user="store.user" />
        <BusinessCardAbout :about="store.user.about" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/main';

import BusinessCardError from '@/components/BusinessCardError.vue';
import BusinessCardProfile from '@/components/BusinessCardProfile.vue';
import BusinessCardAbout from '@/components/BusinessCardAbout.vue';

const store = useUserStore();

onMounted(() => {
  if (!store.user) {
    store.fetchUser();
  }
})
</script>
