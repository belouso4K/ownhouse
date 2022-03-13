import PostsAPI from '@/api/posts.js'

export default function( { $axios }, inject ){
  const api = {
    posts: PostsAPI($axios)
  }
  inject('api', api);
}
