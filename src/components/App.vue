<script lang="ts">
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue';
import MainTable from '@/components/MainTable/MainTable.vue';
import TabsBar from '@/components/TabsBar/TabsBar.vue';
import SelectForm from './SelectForm/SelectForm.vue';
import SettingsList from './SettingsList/SettingsList.vue';
import ModalWindow from './ModalWindow/ModalWindow.vue';
import { useAppStore } from '@/stores/AppStore';
import { Transition } from 'vue';

export default {
  components: {
    HeaderBar,
    MainTable,
    TabsBar,
    SelectForm,
    SettingsList,
    ModalWindow,
    Transition,
  },
  data() {
    return {
      appStore: useAppStore(),
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
};
</script>

<template>
  <HeaderBar />
  <MainTable v-if="appStore.isPreConf" />
  <TabsBar v-if="appStore.isPreConf" />
  <div class="init">
    <span>Укажите локацию, в которой хотели бы узнать погоду</span>
  </div>
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
</template>

<style src="./App.scss"></style>
