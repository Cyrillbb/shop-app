import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '@/constants';
import { useDataFetch } from './use-data-fetch';
import type { PaginatedResponse, PaginationRequestParams } from './../types/index';
import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue';

export const usePaginatedFetch = <T, U extends PaginationRequestParams>(
  {
    fetchFn,
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
  }: {
    fetchFn: (payload: U) => Promise<PaginatedResponse<T>>;
    limit?: number;
    offset?: number;
  },
  payload: MaybeRefOrGetter<U>,
) => {
  const total = ref(0);
  const paginationPayload = ref({
    limit,
    offset,
  });

  const incrementPage = () => {
    if (!hasNext.value) return;

    paginationPayload.value.offset += paginationPayload.value.limit;
  };

  const reset = () => {
    paginationPayload.value.offset = DEFAULT_OFFSET;
  };

  const entities = ref<T[]>([]);

  const isIninitalReq = ref(true);

  const hasNext = computed(() => {
    return entities.value.length < total.value;
  });

  const { isLoading, isError, execute } = useDataFetch(
    {
      fetchFn,
      onSuccess: (data) => {
        entities.value = isIninitalReq.value
          ? data.items
          : [...(entities.value as T[]), ...data.items];

        total.value = data.total;

        isIninitalReq.value = false;
      },
      immediate: true,
    },
    () => ({
      ...toValue(payload),
      ...paginationPayload.value,
    }),
  );

  const loadMore = () => {
    if (isLoading.value || !hasNext.value) return;

    if (!isError.value) {
      incrementPage();
    }

    execute();
  };

  const resetPagination = () => {
    isIninitalReq.value = true;

    reset();

    execute();
  };

  return {
    entities,
    isLoading,
    hasNext,
    loadMore,
    resetPagination,
  };
};
