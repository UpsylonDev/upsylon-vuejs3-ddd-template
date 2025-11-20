import type { Post } from './Post'

export interface PostRepository {
  getAll(): Promise<Post[]>
}
