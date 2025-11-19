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
    expect(wrapper.text()).toContain('count is 0');
  });

  it('increments count when button is clicked', async () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Test' } });
    const button = wrapper.find('button');

    await button.trigger('click');
    expect(wrapper.text()).toContain('count is 1');

    await button.trigger('click');
    expect(wrapper.text()).toContain('count is 2');
  });

  it('renders the correct heading element', () => {
    const msg = 'Test Heading';
    const wrapper = mount(HelloWorld, { props: { msg } });
    const heading = wrapper.find('h1');

    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe(msg);
  });
});
