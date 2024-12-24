<script lang="ts">
import { useAppStore } from '@/stores/AppStore';
import type { IReDailyMeteoData } from '@/types/types';

export default {
  name: 'TabsBar',
  data() {
    return {
      store: useAppStore(),
      currentDay: 0,
      windowWidth: window.innerWidth,
    };
  },
  methods: {
    selectDay(e: Event) {
      const node = e.target as HTMLUListElement;
      if (node.closest('li')) {
        const item = node.closest('li') as HTMLLIElement;
        if (this.currentDay !== item.value) {
          this.currentDay = item.value;
          this.store.currentTab = item.value;
          this.store.setCurrentMData(item.value);
        }
      }
    },
    horizontalScroll(e: WheelEvent) {
      e.preventDefault();
      const tabsList = document.querySelector('.tabs') as HTMLElement;
      tabsList.scrollLeft += e.deltaY;
    },
    resizeHandler() {
      this.windowWidth = window.innerWidth;
    },
    tabDowHandler(tab: IReDailyMeteoData, index: number) {
      switch (index) {
        case 0:
          return 'Сегодня';
        case 1:
          return 'Завтра';
        default:
          return this.windowWidth > 576 ? tab.dow : tab.dowShort;
      }
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
  <ul @click="selectDay" @wheel="horizontalScroll" class="tabs">
    <li
      v-for="(tab, index) in store.meteoData.daily"
      v-bind:key="tab.date"
      class="tabs__day"
      :class="{ active: store.currentTab === index }"
      :value="index"
    >
      <div>
        <div class="dow">
          {{ tabDowHandler(tab, index) }}
        </div>

        <div class="date">{{ tab.dateShort }}</div>
      </div>
      <img
        class="w-icon"
        :src="`/src/assets/icons/weather_icons/wi_code${tab.weatherCode}.svg`"
        alt=""
        width="45"
        height="45"
      />
      <div class="temp">{{ tab.minTemp }}...{{ tab.maxTemp }} &deg;C</div>
    </li>
  </ul>
</template>

<style scoped src="./TabsBar.scss"></style>
