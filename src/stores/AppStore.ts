import { defineStore } from 'pinia';
import type {
  IGeoData,
  ILocation,
  IFetchedMeteoData,
  IReMeteoData,
  IReDailyMeteoData,
} from '@/types/types';
import geoFetch from '@/API/geoFetch';
import meteoFetch from '@/API/meteoFetch';
import meteoDataBuilder from '@/utils/meteoDataBuilder';

type TErrorCode = 'geofetch' | 'meteofetch' | 'none';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    // States
    isSearchOpened: false,
    isSettingsOpened: false,
    isError: false,
    errorCode: 'none' as TErrorCode,
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
    // App Actions
    writeToLocalStorage() {
      const cfg = {
        saveLocation: this.saveLocation,
        hourList: this.hourList,
        location: this.location,
      };
      localStorage.setItem('_wf2_cfg', JSON.stringify(cfg));
    },

    // Geo Actions
    geoFetchHandler(value: string) {
      if (value) {
        this.isGeoFetching = true;
        geoFetch(value)
          .then((data) => {
            this.fetchedList = data
              ? (this.fetchedList = data
                  .filter((item) => item.country)
                  .sort((item1, item2) =>
                    item1.country.localeCompare(item2.country),
                  ))
              : [];
            this.isResponseEmpty = !data;
            this.isError = false;
            this.errorCode = 'none';
          })
          .catch(() => {
            this.isSearchOpened = false;
            this.isError = true;
            this.errorCode = 'geofetch';
          })
          .finally(() => {
            this.isGeoFetching = false;
          });
      }
    },
    setLocation(index: number) {
      const data = this.fetchedList[index];
      this.location = {
        name: data.name,
        fullName: `${data.country}, ${data.admin1 ?? 'n/a'}, ${data.name}`,
        countryCode: data.country_code,
        latitude: data.latitude,
        longitude: data.longitude,
      };
    },

    // Meteo Actions
    setCurrentMData(day: number) {
      this.currentMeteoData = this.meteoData.daily[day];
    },
    meteoDataTransformer(data: IFetchedMeteoData, hoursList: number[]) {
      const rebuildData = meteoDataBuilder(data, hoursList);
      this.meteoData = rebuildData;
      this.currentMeteoData = rebuildData.daily[0];
    },
    meteoFetchHandler(value: number) {
      this.setLocation(value);
      this.isMeteoFetching = true;
      meteoFetch(this.location as ILocation)
        .then((data) => {
          if (data) {
            this.meteoDataTransformer(data, this.hourList);
            if (this.saveLocation) {
              this.writeToLocalStorage();
            }
          }
        })
        .catch(() => {
          this.isError = true;
          this.errorCode = 'meteofetch';
        })
        .finally(() => {
          this.isSearchOpened = false;
          this.isMeteoFetching = false;
        });
    },
    meteoUpdateHandler() {
      if (this.location) {
        this.currentTab = 0;
        this.isMeteoFetching = true;
        meteoFetch(this.location as ILocation)
          .then((data) => {
            if (data) {
              this.meteoDataTransformer(data, this.hourList);
            }
          })
          .catch(() => {
            this.isError = true;
            this.errorCode = 'meteofetch';
          })
          .finally(() => {
            this.isMeteoFetching = false;
          });
      }
    },
    midnightHandler() {
      const date = new Date();
      date.setHours(date.getUTCHours() + this.meteoData.utcOffset);
      const time = date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      });

      if (
        date.getHours() === 0 &&
        date.getMinutes() === 0 &&
        date.getSeconds() === 0
      ) {
        this.meteoUpdateHandler();
      }

      return time;
    },
  },
});
