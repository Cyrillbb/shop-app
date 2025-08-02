<template>
  <div class="product-card">
    <img
      v-if="product.imageUrl"
      :src="product.imageUrl"
      :alt="product.name"
      class="product-image"
    />
    <h3>{{ product.name }}</h3>
    <p>Price: ${{ product.price }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types';

defineProps<{
  product: Product;
}>();
</script>

<style scoped>
.product-card {
  width: 100%;

  padding: 16px;
  margin: 16px 0;

  border: 1px solid #eee;
  border-radius: 8px;

  transition: all 0.3s ease-in-out;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  display: block;

  width: 100%;
  max-width: 200px;
  height: 200px;

  margin-bottom: 12px;
  border-radius: 6px;
  object-fit: cover;
}

.product-card h3 {
  margin: 0 0 8px;
  font-size: 1.25rem;
}

.product-card p {
  margin: 4px 0;
}
</style>
