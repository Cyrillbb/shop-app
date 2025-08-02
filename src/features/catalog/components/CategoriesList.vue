<template>
  <div class="categories">
    <div>categories</div>

    <div :class="{ selected: !categoryId }" class="category" @click="handleSelectCategory()">
      All products
    </div>

    <AppButton v-if="categoryId" class="back-button" @click="handleSelectCategory(data?.parentId)">
      {{ '<' }}
    </AppButton>

    <div v-if="data?.name">current category: {{ data?.name || 'None' }}</div>

    <div
      v-for="category in displayCategories"
      :key="category.id"
      class="category"
      :class="{ selected: category.id === categoryId }"
      @click="handleSelectCategory(category.id)"
    >
      {{ category.id }}
      <div>{{ category.name }}</div>
    </div>

    <AppButton v-if="hasNext" class="load-more" @click="loadMore" :loading="isLoading">
      {{ isLoading ? 'Loading...' : 'Load more' }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { usePaginatedCategories } from '../composables/use-paginated-categories';
import AppButton from '@/components/AppButton.vue';
import { useDataFetch } from '@/composables/use-data-fetch';
import { fetchCategory } from '../api';

const { categoryId } = defineProps<{
  categoryId?: number;
}>();

const emit = defineEmits<{
  (e: 'select-category', categoryId: number | undefined): void;
}>();

const { data, execute } = useDataFetch(
  {
    fetchFn: fetchCategory,
  },
  () => categoryId,
);

const isChild = computed(() => !!data.value?.parentId);

watch(
  () => categoryId,
  (val) => {
    if (!val) {
      data.value = undefined;
      return;
    }

    execute();
  },
  {
    immediate: true,
  },
);

const { isLoading, categoriesData, hasNext, loadMore } = usePaginatedCategories(() => ({
  parent: data.value?.id,
}));

const displayCategories = computed(() =>
  categoriesData.value?.filter((category) => {
    if (isChild.value) {
      return category.parentId === data.value?.parentId;
    }

    if (!categoryId) {
      return !category.parentId;
    }

    return category.parentId === categoryId;
  }),
);

const handleSelectCategory = (categoryId?: number | undefined) => {
  emit('select-category', categoryId);
};
</script>

<style scoped>
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

.selected {
  background-color: #007bff;
  color: white;
}
</style>
