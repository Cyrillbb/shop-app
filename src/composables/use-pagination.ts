import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '@/constants';
import { ref } from 'vue';

export const usePagination = () => {
  const paginationParams = ref({
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
  });

  const hasNextPage = ref(true);

  const incrementPage = (totalItems: number) => {
    if (!hasNextPage.value) return;

    paginationParams.value.offset += paginationParams.value.limit;
    hasNextPage.value = paginationParams.value.offset < totalItems;
  };

  const resetPagination = () => {
    paginationParams.value.offset = DEFAULT_OFFSET;

    hasNextPage.value = true;
  };

  return {
    paginationParams,
    hasNextPage,
    incrementPage,
    resetPagination,
  };
};
