<script lang="ts">
import { useAppStore } from '@/stores/AppStore';
import { useMeteoStore } from '@/stores/MeteoStore';

export default {
  data() {
    return {
      appStore: useAppStore(),
      meteoStore: useMeteoStore(),
      isLoading: true,
      season: '',
    };
  },
  beforeMount() {
    if (localStorage.getItem('preset')) {
      console.log('Local Storage is Not Empty');
      this.appStore.isPreConf = true;
    } else {
      console.log('Local Storage is Empty');
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
    <div v-if="appStore.isInitialState" class="init">
      <span>Укажите локацию, в которой хотели бы узнать погоду</span>
    </div>
    <MainTable v-if="!appStore.isInitialState" />
    <TabsBar v-if="!appStore.isInitialState" />

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
