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
  align-self: end;

  display: flex;
  align-items: center;

  gap: 16px;

  margin-left: auto;
}

.product-price {
  width: max-content;

  white-space: nowrap;
}

.product-add-to-cart {
  width: 120px;
}
</style>
