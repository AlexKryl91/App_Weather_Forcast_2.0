<script lang="ts">
export default {
  emits: ['settingsOpen'],
  data() {
    return {};
  },
};
</script>

<template>
  <div class="btn-wrapper">
    <button class="modal-btn" type="button">Применить</button>
    <button
      @click="$emit('settingsOpen', false)"
      class="modal-btn"
      type="button"
    >
      Закрыть
    </button>
  </div>
</template>

<style src="./SettingsList.scss"></style>
