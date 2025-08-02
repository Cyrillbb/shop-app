<template>
  <div v-if="isLoading">...loading</div>

  <AppError v-else-if="isError">
    <div>Something went wrong</div>
    <div>Try again later</div>
  </AppError>

  <div v-else-if="data" class="product-detail-card">
    <div class="product-name">
      {{ data.name }}
    </div>

    <div class="product-desc-row">
      <img v-if="data?.imageUrl" :src="data?.imageUrl" :alt="data?.name" class="product-image" />

      <div v-html="description" class="produc-desc" />
    </div>

    <div class="product-actions">
      <span class="product-price">Price: {{ data.price }} $</span>

      <AppAddToCart class="product-add-to-cart" :productId="data.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify';
import { useDataFetch } from '@/composables/use-data-fetch';
import { fetchProductDetail } from '../api';
import { computed } from 'vue';
import AppError from '@/components/AppError.vue';
import AppAddToCart from '@/components/AppAddToCart.vue';

const { id } = defineProps<{
  id: string;
}>();

const { data, isLoading, isError } = useDataFetch(
  {
    fetchFn: fetchProductDetail,
    immediate: true,
  },
  () => Number(id),
);

const description = computed(() => {
  if (!data.value?.description) {
    return '';
  }

  return DOMPurify.sanitize(data.value.description);
});
</script>

<style scoped>
.product-detail-card {
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 16px;

  margin: 0 auto;
  padding: 16px;

  border: 1px solid #eee;
  border-radius: 8px;

  transition: all 0.3s ease-in-out;
}

.product-name {
  width: 100%;

  font-size: 24px;
  color: #2e3440;
  font-weight: bold;
}

.product-image {
  display: block;

  width: 100%;
  max-width: 300px;
  height: auto;

  border-radius: 6px;
  object-fit: cover;
}

.product-desc-row {
  width: 100%;

  display: flex;
  gap: 16px;
}

.product-actions {
  width: max-content;

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
