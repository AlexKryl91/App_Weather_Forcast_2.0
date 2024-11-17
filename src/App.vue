<script lang="ts">
import HeaderBar from '@/components/HeaderBar.vue'
import MainTable from '@/components/MainTable.vue'
import TabsBar from '@/components/TabsBar.vue'

export default {
  components: {
    HeaderBar,
    MainTable,
    TabsBar,
  },

  data() {
    return {}
  },

  methods: {},
}
</script>

<template>
  <HeaderBar />
  <MainTable />
  <TabsBar />
</template>

<style src="@/styles/components/App.scss"></style>
