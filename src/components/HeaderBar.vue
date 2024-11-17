<script lang="ts">
export default {}
</script>

<template>
  <header class="header">
    <div class="logo-wrapper">
      <img src="@/assets/img/logo.svg" alt="Логотип" width="83" height="50" />
      <h1>Weather Forcast</h1>
    </div>
    <div class="tools-wrapper">
      <div class="search-bar"></div>
      <img
        class="icon-location"
        src="@/assets/icons/icon_location.svg"
        alt="Иконка локации"
        width="40"
        height="40"
      />
      <button class="settings-btn" type="button">
        <img
          src="@/assets/icons/icon_settings.svg"
          alt="Иконка настроек"
          width="38"
          height="40"
        />
      </button>
    </div>
  </header>
</template>

<style scoped src="./HeaderBar.scss"></style>
