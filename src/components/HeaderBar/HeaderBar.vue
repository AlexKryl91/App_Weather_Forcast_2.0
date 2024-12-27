<script lang="ts">
import { useAppStore } from '@/stores/AppStore';

export default {
  name: 'HeaderBar',
  data() {
    return {
      store: useAppStore(),
      locationInput: '',
      debounceId: -1,
    };
  },
  methods: {
    toggleSearch() {
      if (this.store.isSearchOpened) {
        this.store.isSearchOpened = false;
      } else {
        this.locationInput = '';
        this.store.fetchedList = [];
        this.store.isSearchOpened = true;
        this.store.isSettingsOpened = false;
        this.store.isResponseEmpty = false;
        const el = this.$refs.search as HTMLInputElement;
        el.focus();
      }
    },
    toggleSettings() {
      if (this.store.isSettingsOpened) {
        this.store.isSettingsOpened = false;
      } else {
        this.store.isSearchOpened = false;
        this.store.isSettingsOpened = true;
      }
    },
  },
  watch: {
    locationInput(value) {
      clearTimeout(this.debounceId);
      this.debounceId = setTimeout(() => {
        this.locationInput = value;
        this.store.geoFetchHandler(value);
      }, 500);
    },
  },
  computed: {
    locationBtnClass() {
      return {
        'loc-active': this.store.isSearchOpened,
        init: !this.store.location && !this.store.isSearchOpened,
      };
    },
  },
};
</script>

<template>
  <header class="header">
    <div class="logo-wrapper">
      <img src="/img/logo.svg" alt="Логотип" width="83" height="50" />
      <h1>Weather Forcast</h1>
    </div>
    <div class="tools-wrapper">
      <input
        ref="search"
        v-model.trim="locationInput"
        class="search-bar"
        :class="{ 'search-bar_active': store.isSearchOpened }"
        type="text"
        placeholder="Укажите локацию ..."
        title="Введите название локации для поиска"
        required
      />
      <button
        @click="toggleSearch"
        class="location-btn"
        :class="locationBtnClass"
        type="button"
        title="Поиск локации"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <circle
            cx="20"
            cy="20"
            r="19"
            stroke="#000"
            stroke-opacity=".4"
            stroke-width="2"
          />
          <path
            fill="#000"
            fill-opacity=".4"
            d="M21.2 32c2.5-3.2 8.2-10.8 8.2-15.1a9.4 9.4 0 1 0-18.8 0c0 4.3 5.7 11.9 8.2 15 .6.8 1.8.8 2.4 0ZM20 13.7a3.1 3.1 0 0 1 3.1 3.1A3.1 3.1 0 0 1 20 20a3.1 3.1 0 0 1-3.1-3.1 3.1 3.1 0 0 1 3.1-3.1Z"
          />
        </svg>
      </button>
      <button
        @click="toggleSettings"
        class="settings-btn"
        :class="{ 'set-active': store.isSettingsOpened }"
        type="button"
        title="Настройки"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="40"
          viewBox="0 0 38 40"
          fill="none"
        >
          <path
            stroke="#000"
            stroke-opacity=".4"
            stroke-width="2"
            d="m36.47 12.83.2.53c.1.28.02.6-.23.84l-3.4 3.08-.38.35.07.52a14.1 14.1 0 0 1 0 3.7l-.07.53.39.35 3.38 3.08c.26.23.34.56.24.83-.33.88-.72 1.72-1.17 2.54l-.36.61a18.9 18.9 0 0 1-1.64 2.31.77.77 0 0 1-.84.22l-4.35-1.38-.5-.16-.41.32c-.98.75-2.06 1.38-3.21 1.85l-.48.2-.12.51-.97 4.46a.77.77 0 0 1-.61.62 19.19 19.19 0 0 1-6.32 0 .77.77 0 0 1-.6-.62l-.98-4.46-.11-.51-.49-.2a14.03 14.03 0 0 1-3.2-1.85l-.42-.32-.5.16-4.35 1.39c-.33.1-.66 0-.84-.22-.6-.73-1.14-1.5-1.63-2.3l-.36-.63c-.45-.81-.84-1.65-1.17-2.53a.77.77 0 0 1 .23-.83l3.4-3.08.38-.36-.07-.51a14.33 14.33 0 0 1 0-3.72l.07-.52-.39-.35-3.38-3.08a.77.77 0 0 1-.24-.84c.33-.87.72-1.71 1.17-2.53l.36-.62c.49-.81 1.03-1.58 1.63-2.3.18-.22.5-.33.84-.22L9.4 9.07l.5.16.41-.32c.98-.75 2.06-1.38 3.2-1.85l.5-.2.1-.51.98-4.46a.77.77 0 0 1 .6-.62h.02a18.37 18.37 0 0 1 6.3-.01c.29.05.54.27.61.62l.98 4.46.11.51.49.2c1.15.47 2.23 1.1 3.2 1.85l.42.32.5-.16 4.35-1.38c.33-.1.66 0 .84.22.6.72 1.15 1.5 1.64 2.3l.36.62c.36.65.68 1.32.96 2.01ZM18.86 27.26a7.25 7.25 0 1 0 0-14.5 7.25 7.25 0 0 0 0 14.5Z"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped src="./HeaderBar.scss"></style>
