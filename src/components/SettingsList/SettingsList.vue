<script lang="ts">
import { useAppStore } from '@/stores/AppStore';

type TElRef = {
  $el: HTMLElement;
};

export default {
  name: 'SettingsList',
  data() {
    return {
      store: useAppStore(),
      saveLocation: false,
      customHourList: [] as number[],
    };
  },
  methods: {
    closeSettings() {
      this.store.isSettingsOpened = false;
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
      const btnState =
        this.store.saveLocation === this.saveLocation &&
        this.store.hourList.toString() === this.customHourList.toString();
      const target = this.$refs.apply as TElRef;
      target.$el.classList.toggle('disabled', btnState);
    },
    applySettings() {
      this.store.saveLocation = this.saveLocation;
      this.store.hourList = this.customHourList;

      if (this.saveLocation) {
        this.store.writeToLocalStorage();
      } else {
        localStorage.removeItem('_wf2_cfg');
      }

      this.store.meteoUpdateHandler();
      this.checkDifference();
    },
    setDefault() {
      this.store.$reset();
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
    this.saveLocation = this.store.saveLocation;
    this.customHourList = this.store.hourList;
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
      src="/icons/info.svg"
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
