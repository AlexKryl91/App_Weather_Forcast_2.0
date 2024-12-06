<script lang="ts">
import { useAppStore } from '@/stores/AppStore';

type TSeason = 'winter' | 'spring' | 'summer' | 'autumn';

export default {
  data() {
    return {
      store: useAppStore(),
      isLoading: true,
      season: '' as TSeason,
    };
  },
  beforeMount() {
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

    if (localStorage.getItem('_wf2_cfg')) {
      const cfgJSON = localStorage.getItem('_wf2_cfg') as string;
      const cfg = JSON.parse(cfgJSON);
      this.store.saveLocation = cfg.saveLocation;
      this.store.hourList = cfg.hourList;
      this.store.location = cfg.location;
      this.store.meteoUpdateHandler();
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
    <div v-if="!store.location && !store.isError" class="msg">
      <span class="init"
        >Укажите локацию, в которой хотели бы узнать погоду</span
      >
    </div>
    <div v-if="store.isError" class="msg err">
      <span class="err__header"
        >Ошибка запроса
        {{ store.errorCode === 'geofetch' ? 'геоданных' : 'метеоданных' }}</span
      >
      <span class="err__desc"
        >Ой! Кажется что-то пошло не так... Поробуйте повторить запрос
        позднее</span
      >
    </div>
    <MainTable v-if="store.location && !store.isError" />
    <TabsBar v-if="store.location && !store.isError" />

    <Transition name="slide">
      <ModalWindow v-if="store.isSearchOpened">
        <SelectForm />
      </ModalWindow>
    </Transition>

    <Transition name="slide">
      <ModalWindow v-if="store.isSettingsOpened">
        <SettingsList />
      </ModalWindow>
    </Transition>

    <FetchLoader v-if="store.isMeteoFetching" />
  </div>
</template>

<style src="./App.scss"></style>
