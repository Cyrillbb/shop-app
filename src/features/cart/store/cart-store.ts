import { useStorage, StorageSerializers } from '@vueuse/core';
import { defineStore } from 'pinia';

type cartProducts = Map<number, number>;

export const useCartStore = defineStore('product-cart', () => {
  const cartProducts = useStorage<cartProducts>('cart-products', new Map(), undefined, {
    serializer: StorageSerializers.map,
  });

  const setProductQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      cartProducts.value.delete(productId);

      return;
    }

    cartProducts.value.set(productId, quantity);
  };

  const getProductQuantity = (productId: number) => cartProducts.value.get(productId) ?? 0;

  return {
    cartProducts,
    setProductQuantity,
    getProductQuantity,
  };
});
