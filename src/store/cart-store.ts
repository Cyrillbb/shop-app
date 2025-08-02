import { defineStore } from 'pinia';
import { ref } from 'vue';

type cartProducts = Map<number, number>;

export const useCartStore = defineStore('product-cart', () => {
  const cartProducts = ref<cartProducts>(new Map());

  const setProductQuantity = (productId: number, quantity: number) => {
    console.log('-=------------------------------->', quantity);

    if (quantity < 1) {
      cartProducts.value.delete(productId);

      return;
    }

    cartProducts.value.set(productId, quantity);
  };

  const getProductQuantity = (productId: number) => {
    return cartProducts.value.get(productId) ?? 0;
  };

  return {
    cartProducts,
    setProductQuantity,
    getProductQuantity,
  };
});
