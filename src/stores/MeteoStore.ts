import type { IFetchedMeteoData } from '@/types/types';
import meteoDataBuilder from '@/utils/meteoDataBuilder';
import { defineStore } from 'pinia';

export const useMeteoStore = defineStore('meteoStore', {
  state: () => ({
    isFetching: false,
    meteoData: {},
  }),
  getters: {},
  actions: {
    meteoDataHandler(data: IFetchedMeteoData) {
      const rebuildData = meteoDataBuilder(data);
      console.log(rebuildData);
      this.meteoData = rebuildData;
    },
  },
});
