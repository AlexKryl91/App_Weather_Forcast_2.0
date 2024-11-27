<script lang="ts">
export default {
  name: 'ModalButton',
};
</script>

<template>
  <button class="modal-btn" type="button">
    <slot></slot>
  </button>
</template>

<style scoped src="./ModalButton.scss"></style>
