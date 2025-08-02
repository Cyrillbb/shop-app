<template>
  <button
    class="app-button"
    :class="{
      disabled,
      [type]: type,
    }"
    :disabled
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const { type = 'primary' } = defineProps<{
  disabled?: boolean;
  type?: 'primary' | 'text' | 'danger' | 'success';
}>();
</script>

<style scoped>
.app-button {
  width: 100%;

  padding: 12px 20px;
  border: none;
  border-radius: 5px;

  color: var(--background-color);
  cursor: pointer;

  transition: all 0.3s ease;
}

.app-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.primary {
  background-color: var(--primary-color);
}

.danger {
  background-color: var(--error-color);
}

.success {
  color: #eceff4;

  background-color: var(--success-color);
}

.text {
  background-color: transparent;

  padding: 0;

  color: var(--dark-text-color);
  border: none;
}

.text:hover {
  box-shadow: none;
}

.disabled {
  background-color: var(--disabled-color);
  cursor: not-allowed;
}
</style>
