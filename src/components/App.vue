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
  methods: {
    isIntroShown() {
      return !this.store.location && !this.store.isError;
    },
    isErrorShown() {
      return this.store.isError;
    },
    isMainShown() {
      return this.store.location && !this.store.isError;
    },
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
  <Transition v-if="isLoading" name="vanish">
    <AppPreloader />
  </Transition>

  <div v-else class="container">
    <HeaderBar />
    <IntroMsg v-if="isIntroShown()" />
    <ErrorMsg v-if="isErrorShown()" />
    <MainContainer v-if="isMainShown()" />

    <TransitionGroup name="slide">
      <ModalWindow v-if="store.isSearchOpened">
        <SelectForm />
      </ModalWindow>

      <ModalWindow v-if="store.isSettingsOpened">
        <SettingsList />
      </ModalWindow>
    </TransitionGroup>

    <FetchLoader v-if="store.isMeteoFetching" />
  </div>
</template>

<style src="./App.scss"></style>
