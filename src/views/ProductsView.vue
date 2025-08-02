<template>
  <div class="container">
    <div class="categories">
      <div>categories</div>

      <div class="category" @click="handleSelectCategory(undefined)">All products</div>

      <div
        v-for="category in displayCategories"
        :key="category.id"
        class="category"
        @click="handleSelectCategory(category.id)"
      >
        <div>{{ category.name }}</div>
      </div>
    </div>

    <div class="products">
      <ProductCard v-for="product in productsData" :key="product.id" :product="product" />

      <AppButton v-if="hasNextPage" class="load-more" @click="loadMore">Load more</AppButton>

      <div v-if="isLoading">Loading...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchCategories } from '@/api/categories';
import ProductCard from '@/components/ProductCard.vue';
import AppButton from '@/components/ui/AppButton.vue';
import { useDataFetch } from '@/composables/use-data-fetch';
import { usePaginatedProducts } from '@/composables/use-paginated-products';
import { computed, ref, watch } from 'vue';

const selectedCategoryId = ref<number>();

const { data: categoriesData, execute: executeCategories } = useDataFetch({
  fetchFn: fetchCategories,
});

executeCategories();

const displayCategories = computed(() =>
  categoriesData.value?.items.filter((category) => !category.parentId),
);

const handleSelectCategory = (categoryId: number | undefined) => {
  selectedCategoryId.value = categoryId;
};

const { isLoading, productsData, hasNextPage, loadMore, resetPagination } =
  usePaginatedProducts(selectedCategoryId);

watch(selectedCategoryId, () => {
  resetPagination();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;

  padding: 16px 0;

  display: flex;
  gap: 1rem;
}

.products {
  flex: 1;
  display: flex;
  flex-direction: column;

  gap: 1rem;
}

.categories {
  display: flex;
  flex-direction: column;

  gap: 1rem;
}

.category {
  padding: 0.5rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  cursor: pointer;

  transition: background-color 0.3s ease;
}
</style>
