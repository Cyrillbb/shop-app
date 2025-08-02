<template>
  <div class="cart-actions">
    <div class="cart-title">Your order</div>

    <div class="cart-price">
      <span> Total: </span>

      <span> {{ totalPrice }}$ </span>
    </div>

    <AppButton v-if="productsCount" @click="emit('checkout')" type="success"> Checkout </AppButton>

    <AppButton @click="router.push({ name: 'catalog' })"> Continue Shopping </AppButton>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import { useRouter } from 'vue-router';

defineProps<{
  totalPrice: number | string;
  productsCount: number;
}>();

const emit = defineEmits<(e: 'checkout') => void>();

const router = useRouter();
</script>

<style scoped>
.cart-price {
  display: flex;
  justify-content: space-between;
}

.cart-actions {
  width: 20%;
  height: max-content;

  display: flex;
  flex-direction: column;

  gap: var(--gap);

  padding: 16px;

  border-radius: var(--border-radius);

  box-shadow: var(--box-shadow);
}
</style>
