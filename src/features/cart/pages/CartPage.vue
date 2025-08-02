<template>
  <CartSuccess v-if="isCheckedOut" />

  <AppMessage v-else-if="isLoading && !data?.items.length" class="loading">
    ...Loading cart
  </AppMessage>

  <AppMessage v-else-if="!productsCount"> Your cart is empty </AppMessage>

  <template v-else>
    <div class="cart-title">Shopping Cart</div>

    <div class="cart-row">
      <div class="cart-products">
        <ProductListCard v-for="product in data?.items" :key="product.id" :product="product" />
      </div>

      <CartActions :totalPrice :productsCount @checkout="handleCheckout" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '../store/cart-store';
import { ProductListCard } from '@/features/product-detail';
import { useDataFetch } from '@/composables/use-data-fetch';
import { fetchProducts } from '@/features/catalog/api';
import { computed, ref, watch } from 'vue';
import CartActions from '../components/CartActions.vue';
import CartSuccess from '../components/CartSuccess.vue';
import AppMessage from '@/components/AppMessage.vue';
import { useToastStore } from '@/store/toast-store';

const cartStore = useCartStore();

const { cartProducts } = storeToRefs(cartStore);
const { getProductQuantity, clearCart } = cartStore;

const { addMessage } = useToastStore();

const productsCount = computed(() => cartProducts.value.size);

const { data, isLoading, execute } = useDataFetch(
  {
    fetchFn: fetchProducts,
    onError: () => {
      addMessage('Something went wrong while fetching cart');
    },
  },
  () => ({
    productId: [...cartProducts.value.keys()].join(','),
  }),
);

const totalPrice = computed(() => {
  if (!data.value?.items.length) return 0;

  const sum = data.value.items.reduce(
    (acc, item) => acc + item.price * getProductQuantity(item.id),
    0,
  );

  return sum.toFixed(2);
});

watch(
  productsCount,
  (val) => {
    if (!val) {
      data.value = undefined;

      return;
    }

    execute();
  },
  { immediate: true },
);

const isCheckedOut = ref(false);

const handleCheckout = async () => {
  isCheckedOut.value = true;

  clearCart();
};
</script>

<style scoped>
.cart-title {
  font-size: 16px;
  font-weight: bold;
}

.cart-row {
  display: flex;

  gap: var(--gap);
}

.cart-products {
  width: 80%;

  display: flex;
  flex-direction: column;

  gap: var(--gap);
}
</style>
