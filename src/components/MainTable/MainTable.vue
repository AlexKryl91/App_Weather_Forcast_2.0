<script lang="ts">
import { useAppStore } from '@/stores/AppStore';
import paramsData from '@/utils/paramsTable';

export default {
  name: 'MainTable',
  data() {
    return {
      store: useAppStore(),
      paramsData,
      currentTime: '',
      timeId: -1,
    };
  },
  methods: {
    getWIconUrl(sunTag: 'day' | 'night', wCode: number) {
      const isValidCode = wCode === 0 || wCode === 1 || wCode === 2;
      const strAdd = isValidCode && sunTag === 'night' ? '_night' : '';
      return `/src/assets/icons/weather_icons/wi_code${wCode}${strAdd}.svg`;
    },
    horizontalScroll(e: WheelEvent) {
      e.preventDefault();
      const wTable = document.querySelector('.w-wrapper') as HTMLElement;
      wTable.scrollLeft += e.deltaY;
    },
  },
  mounted() {
    this.timeId = setInterval(() => {
      this.currentTime = this.store.midnightHandler();
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
          {{ store.currentMeteoData.dow }}
        </div>
        <div class="date">
          <img
            class="calendar-icon"
            src="@/assets/icons/calendar.svg"
            alt="Иконка календаря"
            width="21"
            height="24"
          />
          <span>{{ store.currentMeteoData.date }}</span>
        </div>
        <div class="place">
          <img
            class="flag-icon"
            :src="`/src/assets/icons/flag_icons/fi_${store.location?.countryCode}.svg`"
            alt="Иконка флага"
            width="21"
            height="24"
          />
          <span>
            {{ store.location?.name }}
          </span>
        </div>
        <div v-if="store.currentTab === 0" class="time">
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
    <div @wheel="horizontalScroll" ref="wrapper" class="w-wrapper">
      <div
        class="w-item"
        v-for="data in store.currentMeteoData.hourly"
        v-bind:key="data.hour"
      >
        <div class="w-item__top">
          <div class="w-item-top__hour">
            {{ data.hour }}
          </div>
          <img
            class="w-item-top__icon"
            :src="getWIconUrl(data.sunTag, data.weatherCode)"
            :alt="data.weatherDescription"
            width="100"
            height="100"
          />
          <div class="w-item-top__temp">
            {{ data.temperature }}
          </div>
          <div class="w-item-top__desc">{{ data.weatherDescription }}</div>
        </div>
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
    </div>
  </main>
</template>

<style scoped src="./MainTable.scss"></style>
