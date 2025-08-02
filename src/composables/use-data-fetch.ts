import { ref, toValue, type MaybeRefOrGetter } from 'vue';

// I created this instead of using useFetch from vueUse because vueUse is too rigid
// and doesn't allow using custom fetch functions or clients easily
// this way it's easier to define api layer with simple async functions and then use them in composables if needed
// and vueQuery is too complex for simple use cases such as this assignment
export const useDataFetch = <T, U extends unknown[]>(
  {
    fetchFn,
    onSuccess,
    onError = (err) => {
      console.error(err);
    },
    beforeRequest,
    immediate = false,
  }: {
    fetchFn: (...args: { [K in keyof U]: U[K] }) => Promise<T>;
    onError?: (err: unknown) => void;
    onSuccess?: (data: T) => void;
    beforeRequest?: () => void;
    immediate?: boolean;
  },
  ...args: { [K in keyof U]: MaybeRefOrGetter<U[K]> }
) => {
  const data = ref<T>();
  const isLoading = ref(false);
  const isError = ref(false);

  const execute = async () => {
    if (beforeRequest) beforeRequest();
    isLoading.value = true;

    try {
      const resp = await fetchFn(...(args.map((arg) => toValue(arg)) as U));

      data.value = resp;

      isError.value = false;

      if (onSuccess) {
        onSuccess(data.value);
      }
    } catch (err) {
      isError.value = true;

      onError(err);
    } finally {
      isLoading.value = false;
    }
  };

  if (immediate) {
    execute();
  }

  return {
    data,
    isLoading,
    isError,
    execute,
  };
};
