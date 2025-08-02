<template>
  <div class="categories">
    <div :class="{ selected: !categoryId }" class="category" @click="handleSelectCategory()">
      All products
    </div>

    <div v-if="data?.name">
      current category: <b>{{ data?.name || 'None' }}</b>
    </div>

    <AppButton
      v-if="categoryId"
      type="text"
      class="back-btn"
      @click="handleSelectCategory(data?.parentId)"
    >
      <ChevronLeft /> Back
    </AppButton>

    <div
      v-for="category in displayCategories"
      :key="category.id"
      class="category"
      :class="{ selected: category.id === categoryId }"
      @click="handleSelectCategory(category.id)"
    >
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
import ChevronLeft from '@/assets/icons/chevron-left.svg';

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
  width: 15%;

  display: flex;
  flex-direction: column;

  gap: 1rem;
}

.category {
  cursor: pointer;

  color: #2e3440;

  transition: background-color 0.3s ease;
}

.category:hover {
  text-decoration: underline;
}

.category.selected {
  color: #5e81ac;
}

.back-btn {
  display: flex;

  align-items: center;
  justify-content: center;
}
</style>
