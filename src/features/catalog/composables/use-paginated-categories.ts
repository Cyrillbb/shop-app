import { ref, toValue, type MaybeRefOrGetter } from 'vue';
import { useDataFetch } from '@/composables/use-data-fetch';
import { fetchCategories } from '../api';
import type { Category, CategoryRequestParams } from '../types';
import { usePagination } from '@/composables/use-pagination';

export const usePaginatedCategories = (
  params?: MaybeRefOrGetter<CategoryRequestParams | undefined>,
) => {
  const categoriesData = ref<Category[]>([]);

  const { hasNext, paginationPayload, total, incrementPage, reset } = usePagination({
    loadedItems: categoriesData,
  });

  const { isLoading, execute } = useDataFetch(
    {
      fetchFn: fetchCategories,
      onSuccess: (data) => {
        categoriesData.value = [...categoriesData.value, ...data.items];

        total.value = data.total;
      },
      immediate: true,
    },
    () => ({
      ...paginationPayload.value,
      ...toValue(params),
    }),
  );

  const loadMore = () => {
    if (isLoading.value || !hasNext.value) return;

    incrementPage();

    execute();
  };

  const resetPagination = () => {
    categoriesData.value = [];

    reset();

    execute();
  };

  return {
    isLoading,
    categoriesData,
    hasNext,
    execute,
    loadMore,
    resetPagination,
  };
};
