<script lang="ts">
import { useAppStore } from '@/stores/AppStore';

export default {
  data() {
    return {
      appStore: useAppStore(),
      isLoading: false,
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
    this.isLoading = false;
  },
};
</script>

<template>
  <div v-if="isLoading" class="preloader"></div>
  <div v-else class="container">
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
