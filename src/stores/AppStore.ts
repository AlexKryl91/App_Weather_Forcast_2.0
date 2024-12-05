import { defineStore } from 'pinia';
import type {
  IGeoData,
  ILocation,
  IFetchedMeteoData,
  IReMeteoData,
  IReDailyMeteoData,
} from '@/types/types';
import geoFetch from '@/API/geoFetch';
import meteoDataBuilder from '@/utils/meteoDataBuilder';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    // States
    isSearchOpened: false,
    isSettingsOpened: false,
    isInitialState: true,
    isError: false,
    errorCode: 'none' as 'geofetch' | 'meteofetch' | 'none',
    // Settings
    saveLocation: false,
    hourList: [6, 9, 12, 15, 18, 21] as number[],
    // Geo Data
    isGeoFetching: false,
    isResponseEmpty: false,
    fetchedList: [] as IGeoData[],
    location: null as ILocation | null,
    // Meteo Data
    isMeteoFetching: false,
    meteoData: {} as IReMeteoData,
    currentMeteoData: {} as IReDailyMeteoData,
    currentTab: 0,
  }),
  actions: {
    // Geo Actions
    geoFetchHandler(value: string) {
      this.fetchedList = [];
      if (value) {
        this.isGeoFetching = true;
        geoFetch(value)
          .then((data) => {
            if (data) {
              const filtered = data.filter((item) => item.country);
              filtered.sort((item1, item2) =>
                item1.country.localeCompare(item2.country),
              );
              this.fetchedList = filtered;
              this.isResponseEmpty = false;
              this.isError = false;
              this.errorCode = 'none';
            } else {
              this.fetchedList = [];
              this.isResponseEmpty = true;
            }
          })
          .catch(() => {
            this.isSearchOpened = false;
            this.isError = true;
            this.errorCode = 'geofetch';
          })
          .finally(() => (this.isGeoFetching = false));
      }
    },
    setLocation(index: number) {
      const data = { ...this.fetchedList[index] };
      this.location = {
        name: data.name,
        fullName: `${data.country}, ${data.admin1 ?? 'n/a'}, ${data.name}`,
        countryCode: data.country_code,
        latitude: data.latitude,
        longitude: data.longitude,
      };
    },

    // Meteo Actions
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
