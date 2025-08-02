<template>
  <div class="congratulations">
    <h1>Congratulations!</h1>
    <p>Your order has been placed successfully.</p>

    <AppButton class="success-btn" @click="router.push({ name: 'catalog' })">
      Continue Shopping
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.congratulations {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: var(--gap);
}

.success-btn {
  max-width: 200px;
}
</style>
