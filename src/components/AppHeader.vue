<template>
  <header class="app-header">
    <h1 class="app-title">
      <router-link to="/">Shop App</router-link>
    </h1>

    <div>
      <router-link to="/cart" class="cart-link">
        <IconCart class="cart-icon" />

        <!-- <span v-if="cartProducts.size" class="cart-count"> ({{ cartProducts.size }}) </span> -->

        <AppCartCounter :count="cartProducts.size" />
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/features/cart';
import IconCart from '@/assets/icons/icon-cart.svg';
import AppCartCounter from './AppCartCounter.vue';

const { cartProducts } = storeToRefs(useCartStore());
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem 2rem;
  background-color: #2e3440;
  color: #fff;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.app-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.cart-link {
  display: flex;
  align-items: center;

  color: #5e81ac;
}

.cart-icon {
  width: 24px;
  height: 24px;
}
</style>
