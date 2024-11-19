<script lang="ts">
export default {
  data() {
    return {
      tabsData: [
        {
          dow: 'Сегодня',
          date: '12 ноября',
          icon: '',
          temp: '+2°С',
          status: true,
        },
        {
          dow: 'Завтра',
          date: '13 ноября',
          icon: '',
          temp: '+2°С',
          status: false,
        },
        {
          dow: 'Четверг',
          date: '14 ноября',
          icon: '',
          temp: '+2°С',
          status: false,
        },
        {
          dow: 'Пятница',
          date: '15 ноября',
          icon: '',
          temp: '+2°С',
          status: false,
        },
        {
          dow: 'Суббота',
          date: '16 ноября',
          icon: '',
          temp: '+2°С',
          status: false,
        },
        {
          dow: 'Воскресенье',
          date: '17 ноября',
          icon: '',
          temp: '+2°С',
          status: false,
        },
        {
          dow: 'Понедельник',
          date: '18 ноября',
          icon: '',
          temp: '+2°С',
          status: false,
        },
      ],
    };
  },
};
</script>

<template>
  <aside class="tabs">
    <div
      v-for="tab in tabsData"
      v-bind:key="tab.dow"
      class="tabs__day"
      :class="{ active: tab.status }"
    >
      <div>
        <div class="dow">{{ tab.dow }}</div>
        <div class="date">{{ tab.date }}</div>
      </div>
      <img
        class="w-icon"
        src="@/assets/icons/weather_icons/wi_code51.svg"
        alt=""
        width="45"
        height="45"
      />
      <div class="temp">{{ tab.temp }}</div>
    </div>
  </aside>
</template>

<style scoped src="./TabsBar.scss"></style>
