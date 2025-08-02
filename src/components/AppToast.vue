<template>
  <div class="toast-container">
    <div v-for="toast in toasts" :key="toast">
      <div class="toast">
        {{ toast }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useToastStore } from '@/store/toast-store';

const { toasts } = storeToRefs(useToastStore());
</script>

<style scoped>
.toast-container {
  position: absolute;
  top: 80px;
  left: calc(50% - 150px);

  width: 300px;

  display: flex;
  flex-direction: column;

  gap: var(--gap);
}

.toast {
  padding: 12px;

  border-radius: var(--border-radius);

  background-color: var(--error-color);
  color: var(--background-color);

  opacity: 0;

  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
