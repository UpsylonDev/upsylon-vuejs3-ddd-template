/**
 * Domain Entity: Counter
 * Pure business logic, no framework dependencies
 */
export class Counter {
  private value: number

  private constructor(value: number) {
    if (value < 0) {
      throw new Error('Counter value cannot be negative')
    }
    this.value = value
  }

  static create(initialValue: number = 0): Counter {
    return new Counter(initialValue)
  }

  getValue(): number {
    return this.value
  }

  increment(): Counter {
    return new Counter(this.value + 1)
  }

  decrement(): Counter {
    if (this.value === 0) {
      return this
    }
    return new Counter(this.value - 1)
  }

  reset(): Counter {
    return new Counter(0)
  }
}
