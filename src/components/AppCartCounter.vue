<template>
  <div class="count-container">
    <transition name="slide-fade">
      <div class="count" v-if="!animated">
        {{ count }}
      </div>
    </transition>

    <transition name="slide-fade">
      <div class="count" v-if="animated">
        {{ count }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const { count } = defineProps<{
  count: number;
}>();

const animated = ref(false);

watch(
  () => count,
  () => {
    animated.value = !animated.value;
  },
);
</script>

<style scoped>
.count-container {
  position: relative;

  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  border-radius: 50%;

  text-align: center;

  background-color: var(--error-color);
}

.count {
  position: absolute;

  color: var(--background-color);
}

.slide-fade-leave-active,
.slide-fade-enter-active {
  transition: 0.3s;
}
.slide-fade-enter {
  transform: translateY(-100%);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.countCart__disabled {
  opacity: 0.5;
}
</style>
