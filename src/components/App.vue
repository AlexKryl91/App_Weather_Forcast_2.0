<script lang="ts">
import { useAppStore } from '@/stores/AppStore';
import { useMeteoStore } from '@/stores/MeteoStore';
import type { ILocation } from '@/types/types';
import meteoFetch from '@/API/meteoFetch';
import { useGeoStore } from '@/stores/GeoStore';

type TSeason = 'winter' | 'spring' | 'summer' | 'autumn';

export default {
  data() {
    return {
      appStore: useAppStore(),
      geoStore: useGeoStore(),
      meteoStore: useMeteoStore(),
      isLoading: true,
      season: '' as TSeason,
    };
  },
  beforeMount() {
    if (localStorage.getItem('preset')) {
      console.log('Local Storage is Not Empty');
      this.appStore.isInitialState = false;
    } else {
      console.log('Local Storage is Empty');
    }
    if (sessionStorage.getItem('locationCache')) {
      const cache = sessionStorage.getItem('locationCache') as string;
      const location = JSON.parse(cache);
      this.appStore.isInitialState = false;
      this.geoStore.location = location;
      meteoFetch(location as ILocation)
        .then((data) => {
          if (data) {
            this.meteoStore.meteoDataHandler(data);
          }
        })
        .catch(() => {
          this.appStore.isError = true;
          this.appStore.errorCode = 'meteofetch';
        })
        .finally(() => {
          this.meteoStore.isFetching = false;
        });
    }

    const month = new Date().getMonth();
    switch (month) {
      case 0:
      case 1:
      case 11:
        this.season = 'winter';
        break;
      case 2:
      case 3:
      case 4:
        this.season = 'spring';
        break;
      case 5:
      case 6:
      case 7:
        this.season = 'summer';
        break;
      case 8:
      case 9:
      case 10:
        this.season = 'autumn';
        break;
    }
  },
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        this.isLoading = false;
      }
    };
    document.querySelector('#app')?.classList.add(this.season);
  },
};
</script>

<template>
  <Transition name="vanish">
    <AppPreloader v-if="isLoading" />
  </Transition>
  <div v-show="!isLoading" class="container">
    <HeaderBar />
    <div v-if="appStore.isInitialState && !appStore.isError" class="msg">
      <span class="init"
        >Укажите локацию, в которой хотели бы узнать погоду</span
      >
    </div>
    <div v-if="appStore.isError" class="msg err">
      <span class="err__header"
        >Ошибка запроса
        {{
          appStore.errorCode === 'geofetch' ? 'геоданных' : 'метеоданных'
        }}</span
      >
      <span class="err__desc"
        >Ой! Кажется что-то пошло не так... Поробуйте повторить запрос
        позднее</span
      >
    </div>
    <MainTable v-if="!appStore.isInitialState && !appStore.isError" />
    <TabsBar v-if="!appStore.isInitialState && !appStore.isError" />

    <Transition name="slide">
      <ModalWindow v-if="appStore.isSearchOpened">
        <SelectForm />
      </ModalWindow>
    </Transition>

    <Transition name="slide">
      <ModalWindow v-if="appStore.isSettingsOpened">
        Окно настроек
        <SettingsList />
      </ModalWindow>
    </Transition>

    <FetchLoader v-if="meteoStore.isFetching" />
  </div>
</template>

<style src="./App.scss"></style>
