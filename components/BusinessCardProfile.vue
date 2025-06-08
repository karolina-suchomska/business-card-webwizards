<template>
  <div class="business-card__profile">
    <img
      class="business-card__avatar"
      :src="imageSrc"
      :alt="user.name"
    />
    <div class="business-card__info">
      <h2 class="business-card__name">{{ user.name }} {{ user.surname }}</h2>

      <p class="business-card__email">
        Email: <a :href="`mailto:${user.email}`">{{ user.email }}</a>
      </p>

      <PhoneReveal :phone-number="user.phone" />

      <button class="business-card__button-main business-card__download"  @click="handleDownload">
        Pobierz dane użytkownika
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import avatarPlaceholder from '@/assets/img/avatar-placeholder.png';
import PhoneReveal from './PhoneReveal.vue';

const props = defineProps<{
  user: {
    name: string
    surname: string
    email: string
    phone: string
    image: {
      baseUrl: string
      filename: string
      extension: string
    },
    about: string
  }
}>();

const imageSrc = computed(() => {
  const img = props.user.image
  return img?.baseUrl && img.filename && img.extension ? `${img.baseUrl}${img.filename}.${img.extension}` : avatarPlaceholder
});

const handleDownload = () => {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(props.user, null, 2)], {
      type: 'application/json'
    })
  )

  Object.assign(document.createElement('a'), {
    href: url,
    download: 'user-data.json'
  }).click()

  URL.revokeObjectURL(url)
}
</script>
