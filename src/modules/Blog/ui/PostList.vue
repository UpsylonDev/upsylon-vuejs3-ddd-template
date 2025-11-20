<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import type { Post } from '../domain/Post'
  import { GetPosts } from '../application/GetPosts'
  import { HttpJsonPlaceholderPostRepository } from '../infrastructure/HttpJsonPlaceholderPostRepository'

  const posts = ref<Post[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const postRepository = new HttpJsonPlaceholderPostRepository()
  const getPosts = new GetPosts(postRepository)

  onMounted(async () => {
    try {
      posts.value = await getPosts.execute()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An unknown error occurred'
    } finally {
      loading.value = false
    }
  })
</script>

<template>
  <div class="post-list">
    <h2>Blog Posts</h2>
    <div v-if="loading">Loading posts...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else class="posts">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="sass">
  .post-list
    padding: 1rem

  .posts
    list-style: none
    padding: 0

  .post-item
    margin-bottom: 1.5rem
    padding: 1rem
    border: 1px solid #eee
    border-radius: 8px

    h3
      margin-top: 0
      text-transform: capitalize

  .error
    color: red
</style>
