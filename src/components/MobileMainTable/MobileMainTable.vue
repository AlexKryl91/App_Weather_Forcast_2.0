<script lang="ts">
import { useAppStore } from '@/stores/AppStore';
import paramsData from '@/utils/paramsTable';

export default {
  name: 'MobileMainTable',
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
      return `./icons/weather_icons/wi_code${wCode}${strAdd}.svg`;
    },
    openExtInfo(e: Event) {
      const node = e.target as HTMLElement;
      if (node.closest('.w-item')) {
        node.querySelector('.w-item-extended')?.classList.toggle('opened');
      }
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
            src="/icons/calendar.svg"
            alt="Иконка календаря"
            width="18"
            height="18"
          />
          <span>{{ store.currentMeteoData.date }}</span>
        </div>
        <div v-if="store.currentTab === 0" class="time">
          <img
            class="clock-icon"
            src="/icons/clock.svg"
            alt="Иконка времени"
            width="18"
            height="18"
          />
          <span>{{ currentTime }}</span>
        </div>
        <div class="place">
          <img
            class="flag-icon"
            :src="`./icons/flag_icons/fi_${store.location?.countryCode}.svg`"
            alt="Иконка флага"
            width="18"
            height="18"
          />
          <span>
            {{ store.location?.name }}
          </span>
        </div>
      </div>
    </div>
    <div @click="openExtInfo" ref="wrapper" class="w-wrapper">
      <div
        class="w-item"
        v-for="data in store.currentMeteoData.hourly"
        v-bind:key="data.hour"
      >
        <div class="w-item-top">
          <div class="w-item-top__hour">
            {{ data.hour }}
          </div>
          <img
            class="w-item-top__icon"
            :src="getWIconUrl(data.sunTag, data.weatherCode)"
            :alt="data.weatherDescription"
            width="45"
            height="45"
          />
          <div class="w-item-top__wrapper">
            <div class="temp">{{ data.temperature }}&deg;C</div>
            <div class="desc">{{ data.weatherDescription }}</div>
          </div>
          <img
            class="w-item-top__open-icon"
            src="/icons/chevron-round.svg"
            alt="Иконка раскрыть"
            width="32"
            height="32"
          />
        </div>
        <div class="w-item-extended">
          <table class="table">
            <tbody>
              <tr
                class="param"
                v-for="param in paramsData"
                v-bind:key="param.name"
              >
                <td class="param__icon">
                  <img
                    :src="param.icon"
                    :alt="param.iconAlt"
                    width="24"
                    height="18"
                  />
                </td>
                <td class="param__name">{{ param.name }}</td>
                <td class="param__units">{{ param.units }}</td>
              </tr>
            </tbody>
          </table>
          <ul class="list">
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
    </div>
  </main>
</template>

<style scoped src="./MobileMainTable.scss"></style>
