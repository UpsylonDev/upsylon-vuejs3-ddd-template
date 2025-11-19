/**
 * Application Use Case: Counter Management
 * Orchestrates domain logic and provides interface for UI layer
 */
import { ref, computed, type Ref } from 'vue';
import { Counter } from '../domain/Counter';

export interface UseCounterReturn {
  count: Ref<number>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  isZero: Ref<boolean>;
}

export function useCounter(initialValue: number = 0): UseCounterReturn {
  const counter = ref<Counter>(Counter.create(initialValue));

  const count = computed(() => counter.value.getValue());
  const isZero = computed(() => count.value === 0);

  const increment = () => {
    counter.value = counter.value.increment();
  };

  const decrement = () => {
    counter.value = counter.value.decrement();
  };

  const reset = () => {
    counter.value = counter.value.reset();
  };

  return {
    count,
    increment,
    decrement,
    reset,
    isZero,
  };
}
