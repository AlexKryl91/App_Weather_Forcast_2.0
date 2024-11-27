<script lang="ts">
import { useAppStore } from '@/stores/AppStore';

export default {
  data() {
    return {
      appStore: useAppStore(),
      isLoading: true,
    };
  },
  beforeMount() {
    if (localStorage.getItem('preset')) {
      console.log('Local Storage is Not Empty');
      this.appStore.isPreConf = true;
    } else {
      console.log('Local Storage is Empty');
    }
  },
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        this.isLoading = false;
      }
    };
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
  </div>
</template>

<style src="./App.scss"></style>
