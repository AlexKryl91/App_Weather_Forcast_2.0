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
  // mounted() {
  //   this.timeId = setInterval(() => {
  //     const date = new Date();
  //     date.setHours(date.getUTCHours() + this.meteoStore.meteoData.utcOffset);
  //     this.currentTime = date.toLocaleTimeString('ru-RU', {
  //       hour: '2-digit',
  //       minute: '2-digit',
  //     });

  //     // Reload page after 00:00 in chosen location
  //     if (
  //       date.getHours() === 0 &&
  //       date.getMinutes() === 0 &&
  //       date.getSeconds() === 0
  //     ) {
  //       window.location.reload();
  //     }
  //   }, 1000);
  // },
  // unmounted() {
  //   clearInterval(this.timeId);
  // },
};
</script>

<template>
  <main class="weather-table">
    <!-- <div class="head-item">
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
    </div> -->
    <!-- <div class="w-item" v-for="n in 6" v-bind:key="n">
      <div class="w-item__hour">
        {{ meteoStore.currentMeteoData.hourly.hours[n - 1] }}
      </div>
      <div class="w-item__icon">
        {{ meteoStore.currentMeteoData.hourly.weatherCode[n - 1] }}
      </div>
      <div class="w-item__temp">
        {{ meteoStore.currentMeteoData.hourly.temperature[n - 1] }}
      </div>
      <div class="w-item__text-code">???</div>
      <ul class="w-item__list">
        <li>
          {{ meteoStore.currentMeteoData.hourly.apparentTemperature[n - 1] }}
        </li>
        <li>{{ meteoStore.currentMeteoData.hourly.pressure[n - 1] }}</li>
        <li>{{ meteoStore.currentMeteoData.hourly.windSpeed[n - 1] }}</li>
        <li>{{ meteoStore.currentMeteoData.hourly.windGusts[n - 1] }}</li>
        <li>{{ meteoStore.currentMeteoData.hourly.windDirection[n - 1] }}</li>
        <li>{{ meteoStore.currentMeteoData.hourly.humidity[n - 1] }}</li>
        <li>{{ meteoStore.currentMeteoData.hourly.precipitation[n - 1] }}</li>
        <li>{{ meteoStore.currentMeteoData.hourly.cloudCover[n - 1] }}</li>
        <li>{{ meteoStore.currentMeteoData.hourly.visibility[n - 1] }}</li>
      </ul>
    </div> -->
  </main>
</template>

<style scoped src="./MainTable.scss"></style>
