<script lang="ts">
import meteoFetch from '@/API/meteoFetch';
import { useAppStore } from '@/stores/AppStore';
import { useGeoStore } from '@/stores/GeoStore';
import { useMeteoStore } from '@/stores/MeteoStore';
import type { ILocation } from '@/types/types';

export default {
  name: 'SelectForm',
  data() {
    return {
      appStore: useAppStore(),
      geoStore: useGeoStore(),
      meteoStore: useMeteoStore(),
      selectedItem: null as HTMLLIElement | null,
    };
  },
  methods: {
    getImgURL(code: string) {
      return new URL(
        `/src/assets/icons/flag_icons/fi_${code}.svg`,
        import.meta.url,
      ).href;
    },
    selectLocation(e: Event) {
      const node = e.target as HTMLUListElement;
      console.log(node);
      if (node.closest('li')) {
        const item = node.closest('li') as HTMLLIElement;
        if (this.selectedItem?.value !== item.value) {
          this.selectedItem?.classList.remove('selected');
        }
        item.classList.add('selected');
        this.selectedItem = item;
      }
    },
    applyLocation() {
      if (this.selectedItem && !this.geoStore.isResponseEmpty) {
        this.geoStore.setLocation(this.selectedItem.value);
        this.appStore.isInitialState = false;
        this.meteoStore.isFetching = true;
        meteoFetch(this.geoStore.location as ILocation)
          .then((data) => {
            if (data) {
              this.meteoStore.meteoDataHandler(data, this.appStore.hourList);
              if (this.appStore.saveLocation) {
                const cfg = {
                  saveLocation: this.appStore.saveLocation,
                  hourList: this.appStore.hourList,
                  location: this.geoStore.location,
                };
                localStorage.setItem('_wf2_cfg', JSON.stringify(cfg));
              }
            }
          })
          .catch(() => {
            this.appStore.isSearchOpened = false;
            this.appStore.isError = true;
            this.appStore.errorCode = 'meteofetch';
          })
          .finally(() => {
            this.appStore.isSearchOpened = false;
            this.meteoStore.isFetching = false;
          });
      } else {
        alert('Нужно выбрать локацию');
      }
    },
    closeSearch() {
      this.appStore.isSearchOpened = false;
      this.geoStore.fetchedList = [];
    },
  },
};
</script>

<template>
  <div class="select">
    <div class="indication-wrapper">
      <div
        v-if="geoStore.isResponseEmpty && !geoStore.isFetching"
        class="empty-msg"
      >
        Нет совпадений
      </div>
      <div v-if="geoStore.isFetching" class="loader"></div>
    </div>
    <ul @click="selectLocation" class="select__list">
      <li
        v-for="(location, index) in geoStore.fetchedList"
        v-bind:key="location.id"
        :style="{
          'background-image': `url(${getImgURL(location.country_code)})`,
        }"
        :value="index"
      >
        {{ location.country }}, {{ location.admin1 ?? 'n/a' }},
        {{ location.name }}
      </li>
    </ul>
  </div>
  <div class="btn-wrapper">
    <ModalButton @click="applyLocation">Применить</ModalButton>
    <ModalButton @click="closeSearch">Закрыть</ModalButton>
  </div>
</template>

<style scoped src="./SelectForm.scss"></style>
