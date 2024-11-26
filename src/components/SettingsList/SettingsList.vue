<script lang="ts">
import { useAppStore } from '@/stores/AppStore';

export default {
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
    <button class="modal-btn" type="button">Применить</button>
    <button @click="closeSettings" class="modal-btn" type="button">
      Закрыть
    </button>
  </div>
</template>

<style src="./SettingsList.scss"></style>
