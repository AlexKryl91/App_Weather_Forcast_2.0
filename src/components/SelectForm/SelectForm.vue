<script lang="ts">
import { useAppStore } from '@/stores/AppStore';

export default {
  name: 'SelectForm',
  data() {
    return {
      store: useAppStore(),
      selectedItem: null as HTMLLIElement | null,
    };
  },
  methods: {
    closeSearch() {
      this.store.isSearchOpened = false;
    },
    getImgURL(code: string) {
      return new URL(
        `/src/assets/icons/flag_icons/fi_${code}.svg`,
        import.meta.url,
      ).href;
    },
    selectLocation(e: Event) {
      const node = e.target as HTMLUListElement;
      if (node.closest('li')) {
        const item = node.closest('li') as HTMLLIElement;
        if (this.selectedItem?.value !== item.value) {
          this.selectedItem?.classList.remove('selected');
        }
        item.classList.add('selected');
        this.selectedItem = item;
      }
    },
    applyLocation() {
      if (this.selectedItem && !this.store.isResponseEmpty) {
        this.store.meteoFetchHandler(this.selectedItem.value);
      }
    },
  },
};
</script>

<template>
  <div class="select">
    <div class="indication-wrapper">
      <div
        v-if="store.isResponseEmpty && !store.isGeoFetching"
        class="empty-msg"
      >
        Нет совпадений
      </div>

      <div v-if="store.isGeoFetching" class="loader"></div>
    </div>
    <ul @click="selectLocation" class="select__list">
      <li
        v-for="(location, index) in store.fetchedList"
        v-bind:key="location.id"
        :style="{
          'background-image': `url(${getImgURL(location.country_code)})`,
        }"
        :value="index"
      >
        {{ location.country }}, {{ location.admin1 ?? 'n/a' }},
        {{ location.name }}
      </li>
    </ul>
  </div>
  <div class="btn-wrapper">
    <ModalButton @click="applyLocation" :class="{ disabled: !selectedItem }"
      >Применить</ModalButton
    >
    <ModalButton @click="closeSearch">Закрыть</ModalButton>
  </div>
</template>

<style scoped src="./SelectForm.scss"></style>
