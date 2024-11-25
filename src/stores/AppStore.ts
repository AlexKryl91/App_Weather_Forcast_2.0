import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    searchIsOpened: false,
    settingsIsOpened: false,
  }),
  getters: {},
  actions: {},
});
