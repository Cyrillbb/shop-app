<template>
  <div class="product-actions">
    <span class="product-price">Price: {{ price }} $</span>

    <AppAddToCart class="product-add-to-cart" :productId />
  </div>
</template>

<script setup lang="ts">
import AppAddToCart from './AppAddToCart.vue';

const {} = defineProps<{
  productId: number;
  price: number;
}>();
</script>

<style scoped>
.product-actions {
  width: max-content;

  height: max-content;

  display: flex;
  align-items: center;

  gap: var(--gap);
}

.product-price {
  width: max-content;

  white-space: nowrap;
}

.product-add-to-cart {
  width: 120px;
}
</style>
