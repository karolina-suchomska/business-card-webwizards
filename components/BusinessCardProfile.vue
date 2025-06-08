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

const store = useUserStore();
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
    }
  }
}>();

const imageSrc = computed(() => {
  const { image } = props.user;
  return image?.baseUrl && image.filename && image.extension ? `${image.baseUrl.replace(/\/?$/, '/')}${image.filename}.${image.extension}` : avatarPlaceholder;
});

const handleDownload = () => {
  store.downloadUserData()
}
</script>
