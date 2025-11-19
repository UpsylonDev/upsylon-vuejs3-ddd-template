import { describe, it, expect } from 'vitest';
import { Counter } from '../domain/Counter';

describe('Counter Domain Entity', () => {
  it('should create a counter with initial value', () => {
    const counter = Counter.create(5);
    expect(counter.getValue()).toBe(5);
  });

  it('should create a counter with default value 0', () => {
    const counter = Counter.create();
    expect(counter.getValue()).toBe(0);
  });

  it('should increment counter', () => {
    const counter = Counter.create(0);
    const incremented = counter.increment();
    expect(incremented.getValue()).toBe(1);
  });

  it('should decrement counter', () => {
    const counter = Counter.create(5);
    const decremented = counter.decrement();
    expect(decremented.getValue()).toBe(4);
  });

  it('should not decrement below zero', () => {
    const counter = Counter.create(0);
    const decremented = counter.decrement();
    expect(decremented.getValue()).toBe(0);
  });

  it('should reset counter to zero', () => {
    const counter = Counter.create(10);
    const reset = counter.reset();
    expect(reset.getValue()).toBe(0);
  });

  it('should throw error for negative initial value', () => {
    expect(() => Counter.create(-1)).toThrow('Counter value cannot be negative');
  });

  it('should be immutable', () => {
    const counter = Counter.create(5);
    const incremented = counter.increment();
    expect(counter.getValue()).toBe(5);
    expect(incremented.getValue()).toBe(6);
  });
});
