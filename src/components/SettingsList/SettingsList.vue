<script lang="ts">
import { useAppStore } from '@/stores/AppStore';

export default {
  name: 'SettingsList',
  data() {
    return {
      appStore: useAppStore(),
    };
  },
  methods: {
    closeSettings() {
      this.appStore.isSettingsOpened = false;
    },
  },
};
</script>

<template>
  <div class="btn-wrapper">
    <ModalButton>Применить</ModalButton>
    <ModalButton @click="closeSettings">Закрыть</ModalButton>
  </div>
</template>

<style src="./SettingsList.scss"></style>
