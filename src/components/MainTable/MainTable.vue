<script lang="ts">
import iconTemp from '@/assets/icons/temp.svg';
import iconPress from '@/assets/icons/arrow-down.svg';
import iconWind from '@/assets/icons/wind.svg';
import iconTornado from '@/assets/icons/tornado.svg';
import iconCompass from '@/assets/icons/compass.svg';
import iconDroplet from '@/assets/icons/droplet.svg';
import iconUmbrella from '@/assets/icons/umbrella.svg';
import iconCloud from '@/assets/icons/cloud.svg';
import iconEye from '@/assets/icons/eye.svg';

export default {
  name: 'MainTable',
  data() {
    return {
      paramData: [
        {
          icon: iconTemp,
          iconAlt: 'Иконка температуры',
          name: 'Ощущается',
          units: '°С',
        },
        {
          icon: iconPress,
          iconAlt: 'Иконка давления',
          name: 'Давление',
          units: 'мм рт.ст.',
        },
        {
          icon: iconWind,
          iconAlt: 'Иконка ветра',
          name: 'Ветер',
          units: 'м/с',
        },
        {
          icon: iconTornado,
          iconAlt: 'Иконка торнадо',
          name: 'Порывы',
          units: 'м/с',
        },
        {
          icon: iconCompass,
          iconAlt: 'Иконка компаса',
          name: 'Направление',
          units: '',
        },
        {
          icon: iconDroplet,
          iconAlt: 'Иконка влажности',
          name: 'Влажность',
          units: '%',
        },
        {
          icon: iconUmbrella,
          iconAlt: 'Иконка зонта',
          name: 'Осадки',
          units: 'мм',
        },
        {
          icon: iconCloud,
          iconAlt: 'Иконка облака',
          name: 'Облачность',
          units: '%',
        },
        {
          icon: iconEye,
          iconAlt: 'Иконка глаза',
          name: 'Видимость',
          units: 'км',
        },
      ],
      wData: [
        { time: '6:00' },
        { time: '9:00' },
        { time: '12:00' },
        { time: '15:00' },
        { time: '18:00' },
        { time: '21:00' },
      ],
    };
  },
};
</script>

<template>
  <main class="weather-table">
    <div class="head-item">
      <div class="date-wrapper">
        <div class="dow">Вторник</div>
        <div class="date">
          <img
            src="@/assets/icons/calendar.svg"
            alt="Иконка календаря"
            width="21"
            height="24"
          />
          <span>12 ноября</span>
        </div>
        <div class="time">
          <img
            src="@/assets/icons/clock.svg"
            alt="Иконка календаря"
            width="21"
            height="24"
          />
          <span>14:48</span>
        </div>
      </div>
      <table class="table">
        <tbody>
          <tr class="param" v-for="param in paramData" v-bind:key="param.name">
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
    <div class="w-item" v-for="wItem in wData" v-bind:key="wItem.time">
      {{ wItem.time }}
    </div>
  </main>
</template>

<style scoped src="./MainTable.scss"></style>
