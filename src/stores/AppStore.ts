import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    isSearchOpened: false,
    isSettingsOpened: false,
    isPreConf: false,
    isInitialState: true,
  }),
  // getters: {},
  // actions: {},
});
