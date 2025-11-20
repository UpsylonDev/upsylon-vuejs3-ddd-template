import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import PostList from './PostList.vue'
import { GetPosts } from '../application/GetPosts'
import type { Post } from '../domain/Post'

// Mock the GetPosts use case
vi.mock('../application/GetPosts')

describe('PostList.vue', () => {
  it('renders loading state initially', () => {
    // Mock execute to return a promise that doesn't resolve immediately
    vi.mocked(GetPosts.prototype.execute).mockImplementation(() => new Promise(() => {}))

    const wrapper = mount(PostList)
    expect(wrapper.text()).toContain('Loading posts...')
  })

  it('renders posts when data is fetched successfully', async () => {
    const mockPosts: Post[] = [
      { id: 1, title: 'Test Post 1', body: 'Body 1', userId: 1 },
      { id: 2, title: 'Test Post 2', body: 'Body 2', userId: 1 },
    ]

    vi.mocked(GetPosts.prototype.execute).mockResolvedValue(mockPosts)

    const wrapper = mount(PostList)

    // Wait for promises to resolve
    await flushPromises()

    expect(wrapper.text()).not.toContain('Loading posts...')
    expect(wrapper.findAll('.post-item')).toHaveLength(2)
    expect(wrapper.text()).toContain('Test Post 1')
    expect(wrapper.text()).toContain('Test Post 2')
  })

  it('renders error message when fetching fails', async () => {
    const errorMessage = 'Failed to fetch'
    vi.mocked(GetPosts.prototype.execute).mockRejectedValue(new Error(errorMessage))

    const wrapper = mount(PostList)

    await flushPromises()

    expect(wrapper.text()).not.toContain('Loading posts...')
    expect(wrapper.find('.error').text()).toBe(errorMessage)
  })
})
