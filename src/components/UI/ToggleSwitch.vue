<script lang="ts">
export default {
  name: 'ToggleSwitch',
  props: {
    modelValue: {
      type: [Array, Boolean],
    },
    value: {
      type: [Boolean, Object],
    },
  },
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value: boolean) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>

<template>
  <label class="toggle-btn">
    <input type="checkbox" v-model="model" :value="value" class="cbx" />
    <span></span>
    <slot></slot>
  </label>
</template>

<style scoped src="./ToggleSwitch.scss"></style>
