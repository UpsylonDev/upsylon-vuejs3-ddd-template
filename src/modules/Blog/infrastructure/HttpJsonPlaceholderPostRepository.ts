import type { Post } from '../domain/Post'
import type { PostRepository } from '../domain/PostRepository'

export class HttpJsonPlaceholderPostRepository implements PostRepository {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com'

  async getAll(): Promise<Post[]> {
    const response = await fetch(`${this.baseUrl}/posts`)
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`)
    }
    const posts = (await response.json()) as Post[]
    return posts
  }
}
