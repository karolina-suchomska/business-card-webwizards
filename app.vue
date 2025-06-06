<template>
  <div class="business-card">
    <div class="business-card__container">
      <div v-if="store.loading">Ładowanie...</div>
      <div v-else-if="store.error">Błąd: {{ store.error }}</div>
      <div v-else-if="store.user">
        <div class="business-card__header">
          <img
            :src="`${store.user.image.baseUrl}${store.user.image.filename}.${store.user.image.extension}`"
            :alt="store.user.name"
            class="business-card__img"
          />
          <div class="business-card__box">
            <h2>{{ store.user.name }} {{ store.user.surname }}</h2>
            <p>Email: {{ store.user.email }}</p>
            <p>Numer telefonu: {{ store.user.phone }}</p>
          </div>
        </div>
        <p>{{ store.user.about }}</p>
      </div>
    </div>
  
  </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/main'

const store = useUserStore()

onMounted(() => {
  if (!store.user) {
    store.fetchUser()
  }
})
</script>
