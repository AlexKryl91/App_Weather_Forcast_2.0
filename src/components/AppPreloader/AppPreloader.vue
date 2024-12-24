<script lang="ts">
export default {
  name: 'AppPreloader',
};
</script>

<template>
  <div class="preloader">
    <div class="spinner"></div>
    <img
      class="preloader__logo"
      src="/img/logo.svg"
      alt="Логотип"
      width="166"
      height="100"
    />
  </div>
</template>

<style scoped src="./AppPreloader.scss"></style>
