import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    isSearchOpened: false,
    isSettingsOpened: false,
    isInitialState: true,
    isError: false,
    errorCode: 'none' as 'geofetch' | 'meteofetch' | 'none',
  }),
});
