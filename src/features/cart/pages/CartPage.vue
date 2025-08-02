<template>
  <div class="cart-container">
    <div v-if="isLoading && !data?.items.length" class="loading">...Loading cart</div>

    <div v-else-if="!productsCount">
      <p>Your cart is empty</p>
    </div>

    <ProductListCard v-for="product in data?.items" :key="product.id" :product="product" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '../store/cart-store';
import { ProductListCard } from '@/features/product-detail';
import { useDataFetch } from '@/composables/use-data-fetch';
import { fetchProducts } from '@/features/catalog/api';
import { computed, watch } from 'vue';

const { cartProducts } = storeToRefs(useCartStore());

const productsCount = computed(() => cartProducts.value.size);

const { data, isLoading, execute } = useDataFetch(
  {
    fetchFn: fetchProducts,
  },
  () => ({
    productId: [...cartProducts.value.keys()].join(','),
  }),
);

watch(
  productsCount,
  (val) => {
    if (!val) {
      data.value = undefined;

      return;
    }

    execute();
  },
  { immediate: true },
);
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  gap: 16px;
}
</style>
