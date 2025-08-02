import { DEFAULT_LIMIT, DEFAULT_OFFSET } from './../constants/index';
import { ref, type Ref } from 'vue';
import { useDataFetch } from './use-data-fetch';
import { fetchProducts } from '@/api/product';
import type { Product } from '@/types';

export const usePaginatedProducts = (category?: Ref<number | undefined>) => {
  const paginationParams = ref({
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
  });

  const productsData = ref<Product[]>([]);
  const hasNextPage = ref(true);

  const { isLoading, execute } = useDataFetch(
    {
      fetchFn: fetchProducts,
      onSuccess: (data) => {
        productsData.value = [...productsData.value, ...data.items];

        hasNextPage.value = productsData.value.length < data.total;
      },
      immediate: true,
    },
    () => ({
      category: category?.value,
      ...paginationParams.value,
    }),
  );

  const loadMore = () => {
    if (isLoading.value || !hasNextPage.value) return;

    paginationParams.value.offset += paginationParams.value.limit;

    execute();
  };

  const resetPagination = () => {
    paginationParams.value.offset = DEFAULT_OFFSET;
    productsData.value = [];
    hasNextPage.value = true;

    execute();
  };

  return {
    isLoading,
    productsData,
    hasNextPage,
    loadMore,
    resetPagination,
  };
};
