<template>
  <div class="container">
    <CategoriesList
      :category-id
      @select-category="searchParams.categoryId = String($event ?? '')"
    />

    <ProductList :category-id />
  </div>
</template>

<script setup lang="ts">
import ProductList from '../components/ProductList.vue';
import CategoriesList from '../components/CategoriesList.vue';
import { useUrlSearchParams } from '@vueuse/core';
import { computed } from 'vue';

const searchParams = useUrlSearchParams<{
  categoryId?: string;
}>('history', {
  removeFalsyValues: true,
});

const categoryId = computed(() => {
  if (!searchParams.categoryId) {
    return undefined;
  }

  return Number(searchParams.categoryId);
});
</script>

<style scoped>
.container {
  max-width: 1200px;

  display: flex;
  gap: 1rem;

  margin: 0 auto;
  padding: 16px 0;
}
</style>
