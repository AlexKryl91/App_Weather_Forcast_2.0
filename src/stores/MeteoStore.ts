import { defineStore } from 'pinia';

export const useMeteoStore = defineStore('meteoStore', {
  state: () => ({
    isFetching: false,
    meteoData: {},
  }),
  getters: {},
  actions: {},
});
