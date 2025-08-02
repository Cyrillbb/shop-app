<template>
  <button class="app-button">
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  width: 100%;

  padding: 10px 20px;
  border: none;
  border-radius: 5px;

  background-color: #5e81ac;
  color: white;
  cursor: pointer;

  transition: all 0.3s ease;
}

.app-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
