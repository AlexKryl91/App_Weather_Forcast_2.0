<script lang="ts">
export default {
  name: 'MainContainer',
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  methods: {
    resizeHandler() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener('resize', this.resizeHandler);
  },
  unmounted() {
    window.removeEventListener('resize', this.resizeHandler);
  },
};
</script>

<template>
  <MainTable v-if="windowWidth > 576" />
  <MobileMainTable v-if="windowWidth <= 576" />
  <TabsBar />
</template>

<style></style>
