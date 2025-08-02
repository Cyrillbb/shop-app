<template>
  <div class="message">
    <slot />
  </div>
</template>

<style scoped>
.message {
  width: 100%;

  text-align: center;

  font-size: 20px;
  color: var(--text-secondary-color);
}
</style>
