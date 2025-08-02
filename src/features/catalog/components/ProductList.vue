<template>
  <div class="products">
    <ProductCard
      v-for="product in productsData"
      :key="product.id"
      :product
      :class="{ loading: isLoading }"
    />

    <AppButton v-if="hasNext" :disabled="isLoading" class="load-more" @click="loadMore">
      {{ isLoading ? 'Loading...' : 'Load More' }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import AppButton from '@/components/AppButton.vue';
import ProductCard from './ProductListCard.vue';
import { usePaginatedProducts } from '../composables/use-paginated-products';

const { categoryId } = defineProps<{
  categoryId?: number;
}>();

const { isLoading, productsData, hasNext, loadMore, resetPagination } = usePaginatedProducts(
  () => categoryId,
);

watch(
  () => categoryId,
  () => {
    resetPagination();
  },
);
</script>

<style scoped>
.products {
  flex: 1;
  display: flex;
  flex-direction: column;

  gap: 1rem;
}

.loading {
  opacity: 0.5;
  filter: blur(2px);
}
</style>
