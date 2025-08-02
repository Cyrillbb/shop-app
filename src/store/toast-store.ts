import { useIntervalFn } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const TOAST_DURATION = 3000;

export const useToastStore = defineStore('toast', () => {
  const messages = ref<string[]>([]);

  const addMessage = (message: string) => {
    messages.value = [...messages.value, message];
  };

  useIntervalFn(() => {
    messages.value = messages.value.slice(1);
  }, TOAST_DURATION);

  return {
    addMessage,
    toasts: messages,
  };
});
