<script lang="ts">
export default {}
</script>

<template>
  <aside class="tabs">
    <div class="tabs__day">
      <div>
        <div class="dow">Сегодня</div>
        <div class="date">12 ноября</div>
      </div>
      <img
        class="w-icon"
        src="@/assets/icons/weather_icons/wi_code51.svg"
        alt=""
        width="45"
        height="45"
      />
      <div class="temp">+10C</div>
    </div>
    <div class="tabs__day"></div>
    <div class="tabs__day"></div>
    <div class="tabs__day"></div>
    <div class="tabs__day"></div>
    <div class="tabs__day"></div>
    <div class="tabs__day"></div>
  </aside>
</template>

<style scoped src="./TabsBar.scss"></style>
