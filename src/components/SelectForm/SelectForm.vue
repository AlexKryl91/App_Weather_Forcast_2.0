<script lang="ts">
import { useAppStore } from '@/stores/AppStore';
import { useGeoStore } from '@/stores/GeoStore';

export default {
  data() {
    return {
      notEmpty: true,
      geoStore: useGeoStore(),
      appStore: useAppStore(),
    };
  },
  methods: {
    closeSearch() {
      this.appStore.isSearchOpened = false;
      this.geoStore.$reset();
    },
    applyLocation(e: Event) {
      e.preventDefault();
      const list = this.$refs.select as HTMLSelectElement;
      console.log(list.selectedIndex);
      console.log(this.geoStore.fetchedList[list.selectedIndex]);
    },
    getImgURL(code: string) {
      return new URL(
        `/src/assets/icons/flag_icons/fi_${code}.svg`,
        import.meta.url,
      ).href;
    },
  },
};
</script>

<template>
  <form @submit="applyLocation" id="location-select" class="form-select">
    <select
      ref="select"
      title="Выберите пункт из списка резульатов"
      aria-label="Выберите пункт из списка резульатов"
      class="form-select__list"
      form="location-select"
      multiple
      required
    >
      <option
        v-for="location in geoStore.fetchedList"
        v-bind:key="location.id"
        :value="location.country_code.toLowerCase()"
        :style="{
          'background-image': `url(${getImgURL(location.country_code)})`,
        }"
      >
        {{ location.country }}, {{ location.admin1 ?? 'n/a' }},
        {{ location.name }}
      </option>
    </select>
    <div v-if="geoStore.fetchedList === undefined">Нет совпадений</div>
  </form>
  <div class="btn-wrapper">
    <button class="modal-btn" type="submit" form="location-select">
      Применить
    </button>
    <button @click="closeSearch" class="modal-btn" type="button">
      Закрыть
    </button>
  </div>
</template>

<style src="./SelectForm.scss"></style>
