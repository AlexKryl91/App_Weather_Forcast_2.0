import { defineAsyncComponent, Transition } from 'vue';

import AppPreloader from '@/components/AppPreloader/AppPreloader.vue';
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue';
import IntroMsg from '@/components/IntroMsg/IntroMsg.vue';
import ErrorMsg from '@/components/ErrorMsg/ErrorMsg.vue';
import MainContainer from '@/components/MainContainer/MainContainer.vue';
import TabsBar from '@/components/TabsBar/TabsBar.vue';
import SelectForm from '@/components/SelectForm/SelectForm.vue';
import SettingsList from '@/components/SettingsList/SettingsList.vue';
import ModalWindow from '@/components/UI/ModalWindow.vue';
import ModalButton from '@/components/UI/ModalButton.vue';
import FetchLoader from './FetchLoader/FetchLoader.vue';
import ToggleSwitch from './UI/ToggleSwitch.vue';

export const syncComp = [
  AppPreloader,
  HeaderBar,
  IntroMsg,
  ErrorMsg,
  MainContainer,
  TabsBar,
  SelectForm,
  SettingsList,
  ModalWindow,
  ModalButton,
  FetchLoader,
  ToggleSwitch,
  Transition,
];

export const asyncComp = [
  {
    name: 'MobileMainTable',
    component: defineAsyncComponent(
      () => import('@/components/MobileMainTable/MobileMainTable.vue'),
    ),
  },
  {
    name: 'MainTable',
    component: defineAsyncComponent(
      () => import('@/components/MainTable/MainTable.vue'),
    ),
  },
];
