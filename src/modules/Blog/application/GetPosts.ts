import type { Post } from '../domain/Post'
import type { PostRepository } from '../domain/PostRepository'

export class GetPosts {
  private readonly postRepository: PostRepository

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository
  }

  async execute(): Promise<Post[]> {
    return this.postRepository.getAll()
  }
}
