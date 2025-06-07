<template>
  <div class="business-card__profile">
    <img
      class="business-card__avatar"
      :src="`${user.image.baseUrl}${user.image.filename}.${user.image.extension}`"
      :alt="user.name"
    />
    <div class="business-card__info">
      <h2 class="business-card__name">{{ user.name }} {{ user.surname }}</h2>

      <p class="business-card__email">
        Email: <a :href="`mailto:${user.email}`">{{ user.email }}</a>
      </p>

      <PhoneReveal :phone-number="user.phone" />

      <button class="business-card__button-main business-card__download">
        Pobierz dane użytkownika
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PhoneReveal from './PhoneReveal.vue';

defineProps<{
  user: {
    name: string
    surname: string
    email: string
    phone: string
    image: {
      baseUrl: string
      filename: string
      extension: string
    }
  }
}>();
</script>
