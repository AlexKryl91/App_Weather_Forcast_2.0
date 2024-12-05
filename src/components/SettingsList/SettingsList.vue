<script lang="ts">
import { useAppStore } from '@/stores/AppStore';
import { useGeoStore } from '@/stores/GeoStore';

type TElRef = {
  $el: HTMLElement;
};

export default {
  name: 'SettingsList',
  data() {
    return {
      geoStore: useGeoStore(),
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
  <div class="settings">
    <span class="settings__header">Настройки</span>
    <ToggleSwitch v-model="saveLocation"
      >Сохранять последнюю локацию*</ToggleSwitch
    >
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
  </div>
  <div class="btn-wrapper">
    <ModalButton @click="applySettings" ref="apply" class="disabled"
      >Применить</ModalButton
    >
    <ModalButton @click="setDefault">Сбросить</ModalButton>
    <ModalButton @click="closeSettings">Закрыть</ModalButton>
  </div>
  <div class="info">
    *По умолчанию приложение запоминает последнюю локацию, пока вы не закрыли
    приложение (покинули страницу). Данная же опция позволяет сохранить
    последнюю выбранную локацию даже после закрытия брузера.
  </div>
  <div class="credits">CREDITS</div>
</template>

<style src="./SettingsList.scss"></style>
