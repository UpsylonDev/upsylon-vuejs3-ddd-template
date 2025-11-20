import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { HttpJsonPlaceholderPostRepository } from './HttpJsonPlaceholderPostRepository'
import type { Post } from '../domain/Post'

describe('HttpJsonPlaceholderPostRepository', () => {
  let repository: HttpJsonPlaceholderPostRepository

  beforeEach(() => {
    repository = new HttpJsonPlaceholderPostRepository()
    globalThis.fetch = vi.fn()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should fetch posts successfully', async () => {
    const mockPosts: Post[] = [
      { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
      { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
    ]

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    } as Response)

    const posts = await repository.getAll()

    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts')
    expect(posts).toEqual(mockPosts)
  })

  it('should throw an error when fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    } as Response)

    await expect(repository.getAll()).rejects.toThrow('Failed to fetch posts: Not Found')
  })
})
