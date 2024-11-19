<script lang="ts">
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue';
import MainTable from '@/components/MainTable/MainTable.vue';
import TabsBar from '@/components/TabsBar/TabsBar.vue';
import SelectForm from './SelectForm/SelectForm.vue';
import SettingsList from './SettingsList/SettingsList.vue';
import ModalWindow from './ModalWindow/ModalWindow.vue';

export default {
  components: {
    HeaderBar,
    MainTable,
    TabsBar,
    SelectForm,
    SettingsList,
    ModalWindow,
  },

  data() {
    return {
      isSearchOpened: false,
      isSettingsOpened: false,
    };
  },

  methods: {
    setOpenSearch(status: boolean) {
      this.isSettingsOpened = false;
      this.isSearchOpened = status;
    },
    setOpenSettings(status: boolean) {
      this.isSearchOpened = false;
      this.isSettingsOpened = status;
    },
  },
};
</script>

<template>
  <HeaderBar
    @searchOpen="setOpenSearch"
    @settingsOpen="setOpenSettings"
    :is-search-opened="isSearchOpened"
    :is-settings-opened="isSettingsOpened"
  />
  <MainTable />
  <TabsBar />
  <ModalWindow :is-opened="isSearchOpened">
    <SelectForm @searchOpen="setOpenSearch" />
  </ModalWindow>
  <ModalWindow :is-opened="isSettingsOpened">
    Окно настроек
    <SettingsList @settingsOpen="setOpenSettings" />
  </ModalWindow>
</template>

<style src="./App.scss"></style>
