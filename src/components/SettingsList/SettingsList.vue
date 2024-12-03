<script lang="ts">
import { useAppStore } from '@/stores/AppStore';

export default {
  name: 'SettingsList',
  data() {
    return {
      appStore: useAppStore(),
      saveLocation: false,
      customHourList: false,
    };
  },
  methods: {
    closeSettings() {
      this.appStore.isSettingsOpened = false;
    },
    // selectHours(e: Event) {
    // const toggleSwitch = e.target as HTMLElement;
    // console.log(toggleSwitch.closest('input')?.checked);
    // },
  },
};
</script>

<template>
  <div class="settings">
    <span class="settings__header">Настройки</span>
    <ToggleSwitch v-model="saveLocation"
      >Сохранять последнюю локацию</ToggleSwitch
    >
    <ToggleSwitch v-model="customHourList"
      >Кастомизация почасового отображения</ToggleSwitch
    >

    <details v-if="customHourList">
      <summary>Your favourite cars list</summary>
      <form>
        <fieldset>
          <legend>Cars</legend>
          <ul>
            <li>
              <label for="bmw">BMW</label>
              <input type="checkbox" id="bmw" name="bmw" value="bmw" />
            </li>
            <li>
              <label for="citroen">Citroen</label>
              <input
                type="checkbox"
                id="citroen"
                name="citroen"
                value="citroen"
              />
            </li>
            <li>
              <label for="skoda">Skoda</label>
              <input type="checkbox" id="skoda" name="skoda" value="skoda" />
            </li>
            <li>
              <label for="volvo">Volvo</label>
              <input type="checkbox" id="volvo" name="volvo" value="volvo" />
            </li>
          </ul>
        </fieldset>
      </form>
    </details>
  </div>
  <div class="btn-wrapper">
    <ModalButton>Применить</ModalButton>
    <ModalButton>Сбросить</ModalButton>
    <ModalButton @click="closeSettings">Закрыть</ModalButton>
  </div>
</template>

<style src="./SettingsList.scss"></style>
