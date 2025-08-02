<template>
  <AppMessage>
    <div class="not-found-container">
      <div>404</div>

      <div>Page not found</div>

      <router-link to="/" class="link"> Home </router-link>
    </div>
  </AppMessage>
</template>

<script setup lang="ts">
import AppMessage from './AppMessage.vue';
</script>

<style scoped>
.not-found-container {
  height: calc(100dvh - 120px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: var(--gap);
}
</style>
