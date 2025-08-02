<template>
  <AppHeader />

  <main class="container">
    <RouterView />
  </main>

  <AppToast />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import AppToast from './components/AppToast.vue';
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
