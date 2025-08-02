import { ref, toValue, type MaybeRefOrGetter } from 'vue';
import { useDataFetch } from '../../../composables/use-data-fetch';
import { usePagination } from '../../../composables/use-pagination';
import { fetchProducts } from '../api';
import type { Product } from '../types';

export const usePaginatedProducts = (category?: MaybeRefOrGetter<number | undefined>) => {
  const productsData = ref<Product[]>([]);

  const { hasNext, paginationPayload, total, incrementPage, reset } = usePagination({
    loadedItems: productsData,
  });

  const { isLoading, execute } = useDataFetch(
    {
      fetchFn: fetchProducts,
      onSuccess: (data) => {
        productsData.value = [...productsData.value, ...data.items];

        total.value = data.total;
      },
      immediate: true,
    },
    () => ({
      category: toValue(category),
      ...paginationPayload.value,
    }),
  );

  const loadMore = () => {
    if (isLoading.value || !hasNext.value) return;

    incrementPage();

    execute();
  };

  const resetPagination = () => {
    productsData.value = [];

    reset();

    execute();
  };

  return {
    isLoading,
    productsData,
    hasNext,
    loadMore,
    resetPagination,
  };
};
