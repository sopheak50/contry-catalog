<script setup lang="ts">
import { RouterView } from 'vue-router'
import DefaultNavBar from './components/DefaultNavBar.vue'
import DefaultFooter from './components/DefaultFooter.vue'
</script>

<template>
  <DefaultNavBar />

  <RouterView />

  <DefaultFooter />
</template>
