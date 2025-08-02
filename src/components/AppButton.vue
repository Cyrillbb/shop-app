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
  type?: 'primary' | 'text' | 'danger';
}>();
</script>

<style scoped>
.app-button {
  width: 100%;

  padding: 10px 20px;
  border: none;
  border-radius: 5px;

  color: white;
  cursor: pointer;

  transition: all 0.3s ease;
}

.app-button.primary {
  background-color: #5e81ac;
  color: white;
}

.app-button.danger {
  background-color: #bf616a;
  color: white;
}

.text {
  background-color: #5e81ac1d;

  color: black;
  border: 1px solid #5e81ac;
}

.app-button.disabled {
  background-color: #d3d3d3;
  cursor: not-allowed;
}

.app-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
