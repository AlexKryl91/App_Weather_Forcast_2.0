<script lang="ts">
import { useAppStore } from '@/stores/AppStore';
import { useGeoStore } from '@/stores/GeoStore';
import { useMeteoStore } from '@/stores/MeteoStore';
import type { ILocation } from '@/types/types';
import meteoFetch from '@/API/meteoFetch';

type TElRef = {
  $el: HTMLElement;
};

export default {
  name: 'SettingsList',
  data() {
    return {
      geoStore: useGeoStore(),
      meteoStore: useMeteoStore(),
      appStore: useAppStore(),
      saveLocation: false,
      customHourList: [] as number[],
    };
  },
  methods: {
    closeSettings() {
      this.appStore.isSettingsOpened = false;
    },
    selectHours(e: Event) {
      const node = e.target as HTMLElement;
      if (node.closest('li')) {
        node.classList.toggle('selected');
        const list = node.parentNode as HTMLUListElement;
        const selectedEls: HTMLLIElement[] = Array.from(
          list.querySelectorAll('.selected'),
        );
        this.customHourList = selectedEls.map((el) => el.value);
      }
    },
    checkDifference() {
      const isSameSaveLoc = this.appStore.saveLocation === this.saveLocation;
      const isSameHourList =
        this.appStore.hourList.toString() === this.customHourList.toString();
      const btnStatus = isSameSaveLoc && isSameHourList;

      const target = this.$refs.apply as TElRef;
      target.$el.classList.toggle('disabled', btnStatus);
    },
    applySettings() {
      console.log('Apply settings!!!');
      this.appStore.saveLocation = this.saveLocation;
      this.appStore.hourList = this.customHourList;

      if (this.saveLocation) {
        const configuration = {
          saveLocation: this.saveLocation,
          hourList: this.customHourList,
          location: this.geoStore.location,
        };
        localStorage.setItem('_wf2_cfg', JSON.stringify(configuration));
      }

      if (this.geoStore.location) {
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

      this.checkDifference();
    },
    setDefault() {
      this.saveLocation = this.appStore.saveLocation = false;
      this.customHourList = this.appStore.hourList = [6, 9, 12, 15, 18, 21];
      localStorage.removeItem('_wf2_cfg');
    },
  },
  watch: {
    saveLocation() {
      this.checkDifference();
    },
    customHourList() {
      this.checkDifference();
    },
  },
  mounted() {
    this.saveLocation = this.appStore.saveLocation;
    this.customHourList = this.appStore.hourList;
  },
};
</script>

<template>
  <span class="settings-header">Настройки</span>
  <div class="toggle-wrapper">
    <ToggleSwitch v-model="saveLocation"
      >Сохранять локацию и настройки</ToggleSwitch
    >
    <span class="note">
      Данная опция позволяет сохранить последнюю выбранную локацию и настройки
      даже после закрытия брузера.
    </span>
  </div>
  <div class="hours-edit">
    <span class="hours-edit__label">Почасовое отображение:</span>
    <ul @click="selectHours" class="hours-edit__list">
      <li
        v-for="(n, index) in 24"
        v-bind:key="n"
        :value="index"
        :class="{ selected: customHourList.includes(index) }"
      >
        {{ index }}:00
      </li>
    </ul>
  </div>

  <div class="btn-wrapper">
    <ModalButton @click="applySettings" ref="apply" class="disabled"
      >Применить</ModalButton
    >
    <ModalButton @click="setDefault">Сбросить</ModalButton>
    <ModalButton @click="closeSettings">Закрыть</ModalButton>
  </div>

  <div class="credits">
    <img
      src="/src/assets/icons/info.svg"
      alt="Иконка инфо"
      class="icon-info"
      width="32"
      height="32"
    />
    <span class="dev" aria-label="Разработчик">
      Дизайн и разработка:
      <a href="https://github.com/AlexKryl91" target="_blank"
        >Крыловский Александр</a
      >
    </span>
    <span class="ref">
      &copy; Weather & Geocoding API:<a
        href="https://open-meteo.com/"
        target="_blank"
      >
        Open-meteo.com</a
      >
    </span>
  </div>
</template>

<style src="./SettingsList.scss"></style>
