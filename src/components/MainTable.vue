<script lang="ts">
export default {}
</script>

<template>
  <main class="weather-table">
    <div class="head-item">
      <div class="date-wrapper">
        <div class="dow">Вторник</div>
        <div class="date">
          <img
            src="@/assets/icons/icon_calendar.svg"
            alt="Иконка календаря"
            width="21"
            height="24"
          />
          <span>12 ноября</span>
        </div>
        <div class="time">
          <img
            src="@/assets/icons/icon_clock.svg"
            alt="Иконка календаря"
            width="21"
            height="24"
          />
          <span>14:48</span>
        </div>
      </div>
      <table class="table">
        <tbody>
          <tr class="param">
            <td class="param__icon">
              <img
                src="@/assets/icons/icon_temp.svg"
                alt="Иконка календаря"
                width="15"
                height="20"
              />
            </td>
            <td class="param__name">Ощущается</td>
            <td class="param__units">С</td>
          </tr>
          <tr class="param">
            <td class="param__icon">ICON</td>
            <td class="param__name">Давление</td>
            <td class="param__units">мм рт.ст.</td>
          </tr>
          <tr class="param">
            <td class="param__icon">ICON</td>
            <td class="param__name">Ветер</td>
            <td class="param__units">м/с</td>
          </tr>
          <tr class="param">
            <td class="param__icon">ICON</td>
            <td class="param__name">Порывы</td>
            <td class="param__units">м/с</td>
          </tr>
          <tr class="param">
            <td class="param__icon">ICON</td>
            <td class="param__name">Направление</td>
            <td class="param__units"></td>
          </tr>
          <tr class="param">
            <td class="param__icon">ICON</td>
            <td class="param__name">Влажность</td>
            <td class="param__units">%</td>
          </tr>
          <tr class="param">
            <td class="param__icon">ICON</td>
            <td class="param__name">Осадки</td>
            <td class="param__units">мм</td>
          </tr>
          <tr class="param">
            <td class="param__icon">ICON</td>
            <td class="param__name">Облачность</td>
            <td class="param__units">%</td>
          </tr>
          <tr class="param">
            <td class="param__icon">ICON</td>
            <td class="param__name">Видимость</td>
            <td class="param__units">км</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="w-item"></div>
    <div class="w-item"></div>
    <div class="w-item"></div>
    <div class="w-item"></div>
    <div class="w-item"></div>
    <div class="w-item"></div>
  </main>
</template>

<style scoped src="./MainTable.scss"></style>
