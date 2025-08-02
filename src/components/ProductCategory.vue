<template></template>

<script setup lang="ts">
import type { Category } from '@/types';

// props destructuring is possible from vue 3.5, adding this just in case :)
const { category, isActive } = defineProps<{
  category: Category;
  isActive: boolean;
}>();
</script>
