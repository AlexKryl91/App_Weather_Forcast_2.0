<script lang="ts">
import { useAppStore } from '@/stores/AppStore';
import { useMeteoStore } from '@/stores/MeteoStore';

export default {
  data() {
    return {
      meteoStore: useMeteoStore(),
      appStore: useAppStore(),
      currentDay: 0,
    };
  },
  methods: {
    selectDay(e: Event) {
      const node = e.target as HTMLUListElement;
      if (node.closest('li')) {
        const item = node.closest('li') as HTMLLIElement;
        if (this.currentDay !== item.value) {
          this.currentDay = item.value;
          this.meteoStore.currentTab = item.value;
          this.meteoStore.setCurrentMData(item.value);
        }
      }
    },
  },
  name: 'TabsBar',
};
</script>

<template>
  <ul @click="selectDay" class="tabs">
    <li
      v-for="(tab, index) in meteoStore.meteoData.daily"
      v-bind:key="tab.date"
      class="tabs__day"
      :class="{ active: currentDay === index }"
      :value="index"
    >
      <div>
        <div class="dow">{{ tab.dow }}</div>
        <div class="date">{{ tab.dateShort }}</div>
      </div>
      <img
        class="w-icon"
        :src="`/src/assets/icons/weather_icons/wi_code${tab.weatherCode}.svg`"
        alt=""
        width="45"
        height="45"
      />
      <div class="temp">{{ tab.minTemp }}...{{ tab.maxTemp }}</div>
    </li>
  </ul>
</template>

<style scoped src="./TabsBar.scss"></style>
