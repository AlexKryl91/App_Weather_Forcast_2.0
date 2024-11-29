import { defineStore } from 'pinia';
import type { IGeoData, ILocation } from '@/types/types';

export const useGeoStore = defineStore('geoStore', {
  state: () => ({
    isFetching: false,
    isResponseEmpty: false,
    fetchedList: [] as IGeoData[],
    location: null as ILocation | null,
  }),
  actions: {
    setFetchedList(data: IGeoData[]) {
      const filtered = data.filter((item) => item.country);
      filtered.sort((item1, item2) =>
        item1.country.localeCompare(item2.country),
      );
      this.fetchedList = filtered;
      this.isResponseEmpty = false;
    },
    setEmptyResponse() {
      this.fetchedList = [];
      this.isResponseEmpty = true;
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
  },
});
