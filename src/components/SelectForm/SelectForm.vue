<script lang="ts">
import { useGeoStore } from '@/stores/GeoStore';

export default {
  emits: ['searchOpen'],
  data() {
    return {
      notEmpty: true,
      geoStore: useGeoStore(),
    };
  },
  methods: {
    // test(e) {
    //   e.preventDefault();
    //   this.geoStore.setLocationName(this.geoStore.fetchedList[0]);
    // },
  },
};
</script>

<template>
  <form v-if="notEmpty" id="location-select" class="form-select">
    <select
      title="Выберите пункт из списка резульатов"
      aria-label="Выберите пункт из списка резульатов"
      class="form-select__list"
      multiple
      required
    >
      <option value="0">One</option>
      <option value="1">Two</option>
      <option value="2">Three</option>
    </select>
  </form>
  <div v-else class="empty-text">Нет совпадений</div>
  <div class="btn-wrapper">
    <button class="modal-btn" type="submit" form="location-select">
      Применить
    </button>
    <button @click="$emit('searchOpen', false)" class="modal-btn" type="button">
      Закрыть
    </button>
  </div>
</template>

<style src="./SelectForm.scss"></style>
