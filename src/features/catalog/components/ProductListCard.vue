<template>
  <div class="product-card">
    <div class="product-info-row">
      <img
        v-if="product.imageUrl"
        :src="product.imageUrl"
        :alt="product.name"
        class="product-image"
      />

      <RouterLink
        :to="{
          name: 'product',
          params: {
            id: product.id,
          },
        }"
      >
        {{ product.name }}
      </RouterLink>
      <AppProductActions :productId="product.id" :price="product.price" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppProductActions from '@/components/AppProductActions.vue';
import type { Product } from '../types';

defineProps<{
  product: Product;
}>();
</script>

<style scoped>
.product-card {
  width: 100%;

  padding: 16px;

  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);

  border: 1px solid #eee;
  border-radius: 8px;

  transition: all 0.3s ease-in-out;
}

.product-card:hover {
  box-shadow: 0 4px 8px 4px rgba(0, 0, 0, 0.1);
}

:deep(.product-actions) {
  /* height: max-content;
  align-self: end; */
}

.product-info-row {
  display: flex;

  gap: 16px;
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
