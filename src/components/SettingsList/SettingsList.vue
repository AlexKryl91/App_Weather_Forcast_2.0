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
      saveLocation: useAppStore().saveLocation,
      isCustomHours: useAppStore().isCustomHours,
      customHourList: useAppStore().hourList,
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
      // const isSameCustomOpt =
      //   this.appStore.isCustomHours === this.isCustomHours;
      const check = this.isCustomHours ? isSameHourList : true;
      const summary = isSameSaveLoc && check;

      // console.log(
      //   'same save_loc =>',
      //   isSaveOptSame,
      //   '| mode custom_opt',
      //   isCustomOptOn,
      //   '| same hour_list',
      //   isHourListSame,
      //   '|| summary =>',
      //   summary,
      //   summary ? 'DISABLED' : 'ACTIVE',
      // );

      const target = this.$refs.apply as TElRef;
      target.$el.classList.toggle('disabled', summary);
    },
    applySettings() {
      console.log('Apply settings!!!');
      this.appStore.saveLocation = this.saveLocation;
      this.appStore.isCustomHours = this.isCustomHours;
      this.appStore.hourList = this.customHourList;
      if (this.saveLocation && this.geoStore.location) {
        localStorage.setItem(
          '_wf2_loc',
          JSON.stringify(this.geoStore.location),
        );
      } else {
        localStorage.removeItem('_wf2_loc');
      }
      const conf = {
        saveLocation: this.saveLocation,
        isCustomHours: this.isCustomHours,
        hourList: this.customHourList,
      };
      localStorage.setItem('_wf2_cfg', JSON.stringify(conf));
      this.checkDifference();
    },
    setDefault() {
      this.saveLocation = this.appStore.saveLocation = false;
      this.isCustomHours = this.appStore.isCustomHours = false;
      this.customHourList = this.appStore.hourList = [6, 9, 12, 15, 18, 21];
      localStorage.removeItem('_wf2_cfg');
      localStorage.removeItem('_wf2_loc');
    },
  },
  watch: {
    saveLocation() {
      this.checkDifference();
    },
    isCustomHours() {
      this.checkDifference();
    },
    customHourList() {
      this.checkDifference();
    },
  },
};
</script>

<template>
  <div class="settings">
    <span class="settings__header">Настройки</span>
    <div class="options-wrapper">
      <ToggleSwitch v-model="saveLocation"
        >Сохранять последнюю локацию</ToggleSwitch
      >
      <ToggleSwitch v-model="isCustomHours"
        >Редактировать почасовое отображение</ToggleSwitch
      >
    </div>

    <ul
      @click="selectHours"
      class="hours-list"
      :class="{ collapsed: !isCustomHours }"
    >
      <li
        v-for="(n, index) in 24"
        v-bind:key="n"
        :value="index"
        :class="{ selected: appStore.hourList.includes(index) }"
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
  <div class="credits">Инфо</div>
</template>

<style src="./SettingsList.scss"></style>
