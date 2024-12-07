<script lang="ts">
import { useAppStore } from '@/stores/AppStore';

export default {
  name: 'TabsBar',
  data() {
    return {
      store: useAppStore(),
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
          this.store.currentTab = item.value;
          this.store.setCurrentMData(item.value);
        }
      }
    },
  },
};
</script>

<template>
  <ul @click="selectDay" class="tabs">
    <li
      v-for="(tab, index) in store.meteoData.daily"
      v-bind:key="tab.date"
      class="tabs__day"
      :class="{ active: store.currentTab === index }"
      :value="index"
    >
      <div>
        <div class="dow">
          {{ index === 0 ? 'Сегодня' : index === 1 ? 'Завтра' : tab.dow }}
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
      <div class="temp">{{ tab.minTemp }}...{{ tab.maxTemp }}</div>
    </li>
  </ul>
</template>

<style scoped src="./TabsBar.scss"></style>
