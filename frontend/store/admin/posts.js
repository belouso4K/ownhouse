
import PostsAPI from '../../api/admin/posts';

// export const posts = {
//   state: {
//     posts: {}
//   },
//
//   actions: {
//     allPosts({commit}, page) {
//       PostsAPI.index( page )
//         .then( function( response ){
//           console.log('sss')
//           commit( 'setAllPosts', response.data );
//         })
//         .catch( function(){
//
//         });
//     }
//   },
//
//   mutations: {
//     setAllPosts( state, posts ){
//       state.posts = posts;
//     },
//   },
//
//   getters: {
//     getAllPosts( state ){
//       return state.posts;
//     },
//   }
// }

// export const state = {
//   posts: {}
// }

export const state = () => ({
  posts: {},
  post: {},
  loading: true,
  slug: ''
})

export const actions = {

   allPosts({commit}, page) {

     PostsAPI(this.$axios).index( page )
       .then( function( response ){

         commit( 'setAllPosts', response);
         commit('setPostsLoad',false)
       })
       .catch( function(){

       });
  },
  deletePostById({commit}, id) {
    PostsAPI(this.$axios).delete( id )
      .then( function( response ){

      })
      .catch( function(){

      });
  },
  restorePostById({commit}, id) {
    PostsAPI(this.$axios).restore( id )
      .then( function( response ){

      })
      .catch( function(){

      });
  },
  createPost({commit}, data) {
    PostsAPI(this.$axios).create( data )
      .then( function( response ){
        commit('setPostSlug',response.slug)
      })
      .catch( function(){

      });
  },
  updatePost({commit}, data) {
    PostsAPI(this.$axios).update( data, data.slug )
      .then( function( response ){
        commit('setPostSlug',response.slug)
      })
      .catch( function(){

      });
  },
  getPostByIdOrSlug({commit}, slug) {
    commit('setPostsLoad')
    PostsAPI(this.$axios).show( slug )
      .then( function( response ){
        commit('setPost', response)
        commit('setPostsLoad', false)
      })
      .catch( function(){
        console.log(this.error.statusCode)
      });

  }
}

export const mutations = {

  setAllPosts( state, posts){
    state.posts = posts
  },

  clearPosts( state, posts ){
    state.posts = []
  },
  setPostsLoad( state, load = true ){
    state.loading = load;
  },
  setPostSlug( state, slug ){
    state.slug = slug;
  },
  setPost( state, post ){
    state.post = post;
  },
}

export const getters = {

  getAllPosts: (state) => {
    return state.posts;
  },
  getPostsLoad: (state) => {
    return state.loading;
  },
  getSlug: (state) => {
    return state.slug;
  },
  getPost: (state) => {
    return state.post;
  }
}

