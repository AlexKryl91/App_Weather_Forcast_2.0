<script lang="ts">
import { useAppStore } from '@/stores/AppStore';
import { useMeteoStore } from '@/stores/MeteoStore';
import paramsData from '@/utils/paramsTable';

export default {
  name: 'MainTable',
  data() {
    return {
      appStore: useAppStore(),
      meteoStore: useMeteoStore(),
      paramsData,
      currentTime: '',
      timeId: -1,
    };
  },
  mounted() {
    this.timeId = setInterval(() => {
      const date = new Date();
      date.setHours(date.getUTCHours() + this.meteoStore.meteoData.utcOffset);
      this.currentTime = date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      });

      // Reload page after 00:00 in chosen location
      if (
        date.getHours() === 0 &&
        date.getMinutes() === 0 &&
        date.getSeconds() === 0
      ) {
        window.location.reload();
      }
    }, 1000);
  },
  unmounted() {
    clearInterval(this.timeId);
  },
};
</script>

<template>
  <main class="weather-table">
    <div class="head-item">
      <div class="date-wrapper">
        <div class="dow">
          {{ meteoStore.currentMeteoData.dow }}
        </div>
        <div class="date">
          <img
            src="@/assets/icons/calendar.svg"
            alt="Иконка календаря"
            width="21"
            height="24"
          />
          <span>{{ meteoStore.currentMeteoData.date }}</span>
        </div>
        <div v-if="meteoStore.currentTab === 0" class="time">
          <img
            src="@/assets/icons/clock.svg"
            alt="Иконка календаря"
            width="21"
            height="24"
          />
          <span>{{ currentTime }}</span>
        </div>
      </div>
      <table class="table">
        <tbody>
          <tr class="param" v-for="param in paramsData" v-bind:key="param.name">
            <td class="param__icon">
              <img
                :src="param.icon"
                :alt="param.iconAlt"
                width="30"
                height="20"
              />
            </td>
            <td class="param__name">{{ param.name }}</td>
            <td class="param__units">{{ param.units }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="w-item"
      v-for="data in meteoStore.currentMeteoData.hourly"
      v-bind:key="data.hour"
    >
      <div class="w-item__hour">
        {{ data.hour }}
      </div>
      <div class="w-item__icon">
        {{ data.weatherCode }}
      </div>
      <div class="w-item__temp">
        {{ data.temperature }}
      </div>
      <div class="w-item__text-code">{{ data.weatherDescription }}</div>
      <ul class="w-item__list">
        <li>
          {{ data.apparentTemperature }}
        </li>
        <li>{{ data.pressure }}</li>
        <li>{{ data.windSpeed }}</li>
        <li>{{ data.windGusts }}</li>
        <li>{{ data.windDirection }}</li>
        <li>{{ data.humidity }}</li>
        <li>{{ data.precipitation }}</li>
        <li>{{ data.cloudCover }}</li>
        <li>{{ data.visibility }}</li>
      </ul>
    </div>
  </main>
</template>

<style scoped src="./MainTable.scss"></style>
