<script lang="ts">
export default {
  props: {
    isOpened: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<template>
  <div class="modal" :class="{ open: isOpened }">
    <slot></slot>
  </div>
</template>

<style scoped src="./ModalWindow.scss"></style>
