import AppPreloader from '@/components/AppPreloader/AppPreloader.vue';
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue';
import IntroMsg from '@/components/IntroMsg/IntroMsg.vue';
import ErrorMsg from '@/components/ErrorMsg/ErrorMsg.vue';
import MainContainer from '@/components/MainContainer/MainContainer.vue';
import MainTable from '@/components/MainTable/MainTable.vue';
import MobileMainTable from '@/components/MobileMainTable/MobileMainTable.vue';
import TabsBar from '@/components/TabsBar/TabsBar.vue';
import SelectForm from '@/components/SelectForm/SelectForm.vue';
import SettingsList from '@/components/SettingsList/SettingsList.vue';
import ModalWindow from '@/components/UI/ModalWindow.vue';
import ModalButton from '@/components/UI/ModalButton.vue';
import { Transition } from 'vue';
import FetchLoader from './FetchLoader/FetchLoader.vue';
import ToggleSwitch from './UI/ToggleSwitch.vue';

export default [
  AppPreloader,
  HeaderBar,
  IntroMsg,
  ErrorMsg,
  MainContainer,
  MainTable,
  MobileMainTable,
  TabsBar,
  SelectForm,
  SettingsList,
  ModalWindow,
  ModalButton,
  FetchLoader,
  ToggleSwitch,
  Transition,
];
