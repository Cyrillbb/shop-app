<template>
  <AppButton v-if="!currentQuantity" @click="setProductQuantity(productId, 1)">
    Add to Cart
  </AppButton>

  <div v-else class="product-counter">
    <AppButton type="danger" @click="setProductQuantity(productId, currentQuantity - 1)">
      -
    </AppButton>

    {{ currentQuantity }}

    <AppButton @click="setProductQuantity(productId, currentQuantity + 1)">+</AppButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '@/features/cart';
import AppButton from './AppButton.vue';

const { productId } = defineProps<{
  productId: number;
}>();

const { getProductQuantity, setProductQuantity } = useCartStore();

const currentQuantity = computed(() => getProductQuantity(productId));
</script>

<style scoped>
.product-counter {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
}
</style>
