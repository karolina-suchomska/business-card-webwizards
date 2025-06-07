<template>
  <p class="business-card__phone">
    Numer telefonu:
    {{ showPhone ? phoneNumber : maskedPhone }}
    <button class="business-card__button-main business-card__phone-toggle" @click="showPhone = true">
      Pokaż telefon
    </button>
  </p>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const { phoneNumber } = defineProps<{
  phoneNumber: string
}>();

const showPhone = ref(false);

const maskedPhone = computed(() =>
  phoneNumber ? phoneNumber.replace(/.(?=.{3})/g, 'X') : ''
);
</script>