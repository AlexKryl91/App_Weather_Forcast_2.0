<script lang="ts">
import { useAppStore } from '@/stores/AppStore';

export default {
  name: 'ErrorMsg',
  data() {
    return {
      store: useAppStore(),
    };
  },
};
</script>

<template>
  <div class="msg err">
    <span class="err__header"
      >Ошибка запроса
      {{ store.errorCode === 'geofetch' ? 'геоданных' : 'метеоданных' }}</span
    >
    <span class="err__desc"
      >Ой! Кажется что-то пошло не так... Поробуйте повторить запрос
      позднее</span
    >
  </div>
</template>

<style scoped src="./ErrorMsg.scss"></style>
