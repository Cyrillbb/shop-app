<template>
  <div class="message" :class="{ small }">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  small?: boolean;
}>();
</script>

<style scoped>
.message {
  width: 100%;

  text-align: center;

  font-size: 20px;
  color: var(--text-secondary-color);
}

.small {
  font-size: 12px;
}
</style>
