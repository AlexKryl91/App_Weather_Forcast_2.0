import type {
  IFetchedMeteoData,
  IReMeteoData,
  IReDailyMeteoData,
} from '@/types/types';
import meteoDataBuilder from '@/utils/meteoDataBuilder';
import { defineStore } from 'pinia';

export const useMeteoStore = defineStore('meteoStore', {
  state: () => ({
    isFetching: false,
    meteoData: {} as IReMeteoData,
    currentMeteoData: {} as IReDailyMeteoData,
    currentTab: 0,
  }),
  actions: {
    meteoDataHandler(data: IFetchedMeteoData, hoursList: number[]) {
      const rebuildData = meteoDataBuilder(data, hoursList);
      this.meteoData = rebuildData;
      this.currentMeteoData = rebuildData.daily[0];
    },
    setCurrentMData(day: number) {
      this.currentMeteoData = this.meteoData.daily[day];
    },
  },
});
