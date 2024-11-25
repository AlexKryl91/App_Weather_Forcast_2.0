import { defineStore } from 'pinia';
import type { IGeoData } from '@/types/types';

type TCoordinates = null | {
  longitude: number;
  latitude: number;
};

export const useGeoStore = defineStore('geoStore', {
  state: () => ({
    fetchedList: [] as IGeoData[],
    coordinates: null as TCoordinates,
    locationName: '',
  }),
  getters: {},
  actions: {
    setLocationName({ country, admin1, name }: IGeoData) {
      this.locationName = `${country}, ${admin1}, ${name}`;
    },
  },
});
