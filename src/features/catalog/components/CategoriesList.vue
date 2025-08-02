<template>
  <div class="categories">
    <div :class="{ selected: !categoryId }" class="category" @click="handleSelectCategory()">
      All products
    </div>

    <AppButton
      v-if="categoryId"
      type="text"
      class="back-btn"
      @click="handleSelectCategory(data?.parentId)"
    >
      <ChevronLeft /> Back
    </AppButton>

    <template v-if="!isLoading">
      <div v-if="data?.name && !isChild" class="category selected">
        {{ data?.name || 'None' }}
      </div>

      <div
        v-for="category in displayCategories"
        :key="category.id"
        class="category"
        :class="{ selected: category.id === categoryId }"
        @click="handleSelectCategory(category.id)"
      >
        <div>{{ category.name }}</div>
      </div>
    </template>

    <AppMessage v-if="isLoading" type="info" small>...loading</AppMessage>

    <AppButton v-if="hasNext" class="load-more" :disabled="isLoading" @click="loadMore">
      {{ isLoading ? 'Loading...' : 'Load more' }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import AppButton from '@/components/AppButton.vue';
import { useDataFetch } from '@/composables/use-data-fetch';
import { fetchCategories, fetchCategory } from '../api';
import ChevronLeft from '@/assets/icons/chevron-left.svg';
import { usePaginatedFetch } from '@/composables/use-paginated-fetch';
import AppMessage from '@/components/AppMessage.vue';

const { categoryId } = defineProps<{
  categoryId?: number;
}>();

const emit = defineEmits<{
  (e: 'select-category', categoryId: number | undefined): void;
}>();

const {
  data,
  isLoading: isLoadingDetail,
  execute,
} = useDataFetch(
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

const {
  entities,
  isLoading: isLoadingList,
  hasNext,
  loadMore,
} = usePaginatedFetch(
  {
    fetchFn: fetchCategories,
  },
  () => ({
    parent: data.value?.id,
  }),
);

const isLoading = computed(() => isLoadingDetail.value || isLoadingList.value);

// sooo, it seems like api for categories (/{storeId}/categories) ignores 'withSubcategories' field
// im not sure if its a bug or maybe im doing something wrong
// it also means that pagination is not working properly :(
// because if i provide withSubcategories: false it still returns subcategories :(
// so a lot of this code could be removed
const displayCategories = computed(() =>
  entities.value?.filter((category) => {
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

  color: var(--text-color);

  transition: background-color 0.3s ease;
}

.category:hover {
  text-decoration: underline;
}

.category.selected {
  color: var(--primary-color);
}

.back-btn {
  display: flex;

  align-items: center;
  justify-content: flex-start;
}
</style>
