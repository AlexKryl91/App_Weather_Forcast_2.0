import { defineStore } from 'pinia';
import type { IGeoData } from '@/types/types';

// type TCoordinates = null | {
//   longitude: number;
//   latitude: number;
// };

// type TFetchList = null | undefined | IGeoData[];
type TResultStatus = 'ok' | 'failed';

export const useGeoStore = defineStore('geoStore', {
  state: () => ({
    resultStatus: 'ok' as TResultStatus,
    fetchedList: [] as IGeoData[],
    // coordinates: null as TCoordinates,
    // locationName: '',
  }),
  getters: {
    getLocationData() {
      return;
    },
  },
  actions: {
    // setLocationName({ country, admin1, name }: IGeoData) {
    //   this.locationName = `${country}, ${admin1}, ${name}`;
    // },
  },
});
