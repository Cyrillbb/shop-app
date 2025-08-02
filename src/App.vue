<template>
  <AppHeader />

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './components/ui/AppHeader.vue';
</script>
