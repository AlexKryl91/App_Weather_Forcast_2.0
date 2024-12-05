import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    isSearchOpened: false,
    isSettingsOpened: false,
    isInitialState: true,
    isError: false,
    errorCode: 'none' as 'geofetch' | 'meteofetch' | 'none',
    saveLocation: false,
    hourList: [6, 9, 12, 15, 18, 21] as number[],
  }),
  // actions: {

  // }
});
