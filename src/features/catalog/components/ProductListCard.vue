<template>
  <div class="product-card">
    <img
      v-if="product.imageUrl"
      :src="product.imageUrl"
      :alt="product.name"
      class="product-image"
    />
    <div class="product-info-row">
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

  display: flex;

  gap: var(--gap);

  padding: 16px;

  box-shadow: var(--box-shadow);

  border-radius: var(--border-radius);

  transition: var(--transition);
}

.product-card:hover {
  box-shadow: 0 4px 8px 4px rgba(0, 0, 0, 0.1);
}

.product-info-row {
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: var(--gap);
}

:deep(.product-actions) {
  margin-left: auto;
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
