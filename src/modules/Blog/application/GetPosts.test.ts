import { describe, it, expect, vi } from 'vitest'
import { GetPosts } from './GetPosts'
import type { PostRepository } from '../domain/PostRepository'
import type { Post } from '../domain/Post'

describe('GetPosts', () => {
  it('should return posts from repository', async () => {
    const mockPosts: Post[] = [{ id: 1, title: 'Test Post', body: 'Body', userId: 1 }]

    const mockRepository: PostRepository = {
      getAll: vi.fn().mockResolvedValue(mockPosts),
    }

    const getPosts = new GetPosts(mockRepository)
    const result = await getPosts.execute()

    expect(result).toEqual(mockPosts)
    expect(mockRepository.getAll).toHaveBeenCalledTimes(1)
  })
})
