<script lang="ts">
import { useAppStore } from '@/stores/AppStore';
import { useGeoStore } from '@/stores/GeoStore';
import { useMeteoStore } from '@/stores/MeteoStore';
import paramsData from '@/utils/paramsTable';
import meteoFetch from '@/API/meteoFetch';
import type { ILocation } from '@/types/types';

export default {
  name: 'MainTable',
  data() {
    return {
      appStore: useAppStore(),
      meteoStore: useMeteoStore(),
      geoStore: useGeoStore(),
      paramsData,
      currentTime: '',
      timeId: -1,
    };
  },
  methods: {
    getWIconUrl(sunTag: 'day' | 'night', wCode: number) {
      const isValidCode = wCode === 0 || wCode === 1 || wCode === 2;
      if (isValidCode && sunTag === 'night') {
        return `/src/assets/icons/weather_icons/wi_code${wCode}_night.svg`;
      } else {
        return `/src/assets/icons/weather_icons/wi_code${wCode}.svg`;
      }
    },
    horizontalScroll(e: WheelEvent) {
      e.preventDefault();
      const wTable = document.querySelector('.w-wrapper') as HTMLElement;
      wTable.scrollLeft += e.deltaY;
    },
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
        this.meteoStore.isFetching = true;
        meteoFetch(this.geoStore.location as ILocation)
          .then((data) => {
            if (data) {
              this.meteoStore.meteoDataHandler(data, this.appStore.hourList);
            }
          })
          .catch(() => {
            this.appStore.isError = true;
            this.appStore.errorCode = 'meteofetch';
          })
          .finally(() => {
            this.meteoStore.isFetching = false;
          });
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
            class="calendar-icon"
            src="@/assets/icons/calendar.svg"
            alt="Иконка календаря"
            width="21"
            height="24"
          />
          <span>{{ meteoStore.currentMeteoData.date }}</span>
        </div>
        <div class="place">
          <img
            class="flag-icon"
            :src="`/src/assets/icons/flag_icons/fi_${geoStore.location?.countryCode}.svg`"
            alt="Иконка флага"
            width="21"
            height="24"
          />
          <span>
            {{ geoStore.location?.name }}
          </span>
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
    <div @wheel="horizontalScroll" ref="wrapper" class="w-wrapper">
      <div
        class="w-item"
        v-for="data in meteoStore.currentMeteoData.hourly"
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
