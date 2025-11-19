<script setup lang="ts">
import { useCounter } from '../../application/useCounter';

defineProps<{ msg: string }>();

const { count, increment, decrement, reset, isZero } = useCounter(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <div class="counter-controls">
      <button type="button" @click="decrement" :disabled="isZero">-</button>
      <span class="counter-display">{{ count }}</span>
      <button type="button" @click="increment">+</button>
    </div>
    <button type="button" @click="reset" class="reset-btn">Reset</button>
    <p>
      This counter uses <strong>DDD architecture</strong>:
      <code>Domain → Application → UI</code>
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the
    official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.counter-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.counter-display {
  font-size: 2rem;
  font-weight: bold;
  min-width: 3rem;
  text-align: center;
}

.reset-btn {
  margin-top: 0.5rem;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
