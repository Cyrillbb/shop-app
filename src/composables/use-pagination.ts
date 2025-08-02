import { computed, ref, type Ref } from 'vue';
import { DEFAULT_OFFSET, DEFAULT_LIMIT } from '@/constants';

export const usePagination = ({
  limit = DEFAULT_LIMIT,
  offset = DEFAULT_OFFSET,
  loadedItems,
}: {
  limit?: number;
  offset?: number;
  loadedItems: Ref<unknown[]>;
}) => {
  const total = ref(0);

  const paginationPayload = ref({
    limit,
    offset,
  });

  const hasNext = computed(() => {
    return loadedItems.value.length < total.value;
  });

  const incrementPage = () => {
    if (!hasNext.value) return;

    paginationPayload.value.offset += paginationPayload.value.limit;
  };

  const reset = () => {
    paginationPayload.value.offset = DEFAULT_OFFSET;
  };

  return {
    paginationPayload,
    hasNext,
    total,
    incrementPage,
    reset,
  };
};
