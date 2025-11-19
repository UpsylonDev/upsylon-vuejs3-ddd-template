import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HelloWorld from './HelloWorld.vue';

describe('HelloWorld', () => {
  it('renders prop.msg when passed', () => {
    const msg = 'Hello Vitest!';
    const wrapper = mount(HelloWorld, { props: { msg } });
    expect(wrapper.text()).toContain(msg);
  });

  it('displays initial count as 0', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Test' } });
    expect(wrapper.find('.counter-display').text()).toBe('0');
  });

  it('increments count when + button is clicked', async () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Test' } });
    const buttons = wrapper.findAll('button');
    const incrementButton = buttons[1]!; // Second button is +

    await incrementButton.trigger('click');
    expect(wrapper.find('.counter-display').text()).toBe('1');

    await incrementButton.trigger('click');
    expect(wrapper.find('.counter-display').text()).toBe('2');
  });

  it('decrements count when - button is clicked', async () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Test' } });
    const buttons = wrapper.findAll('button');
    const incrementButton = buttons[1]!;
    const decrementButton = buttons[0]!; // First button is -

    // Increment to 2
    await incrementButton.trigger('click');
    await incrementButton.trigger('click');
    expect(wrapper.find('.counter-display').text()).toBe('2');

    // Decrement to 1
    await decrementButton.trigger('click');
    expect(wrapper.find('.counter-display').text()).toBe('1');
  });

  it('does not decrement below zero', async () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Test' } });
    const decrementButton = wrapper.findAll('button')[0]!;

    expect(wrapper.find('.counter-display').text()).toBe('0');
    expect(decrementButton.attributes('disabled')).toBeDefined();

    await decrementButton.trigger('click');
    expect(wrapper.find('.counter-display').text()).toBe('0');
  });

  it('resets count when reset button is clicked', async () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Test' } });
    const buttons = wrapper.findAll('button');
    const incrementButton = buttons[1]!;
    const resetButton = wrapper.find('.reset-btn');

    // Increment to 5
    for (let i = 0; i < 5; i++) {
      await incrementButton.trigger('click');
    }
    expect(wrapper.find('.counter-display').text()).toBe('5');

    // Reset
    await resetButton.trigger('click');
    expect(wrapper.find('.counter-display').text()).toBe('0');
  });

  it('renders the correct heading element', () => {
    const msg = 'Test Heading';
    const wrapper = mount(HelloWorld, { props: { msg } });
    const heading = wrapper.find('h1');

    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe(msg);
  });

  it('displays DDD architecture message', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Test' } });
    expect(wrapper.text()).toContain('DDD architecture');
  });
});
