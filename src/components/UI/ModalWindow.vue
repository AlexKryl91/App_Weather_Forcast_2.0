<script lang="ts">
export default {
  name: 'ModalWindow',
};
</script>

<template>
  <div class="modal">
    <slot></slot>
  </div>
</template>

<style scoped src="./ModalWindow.scss"></style>
