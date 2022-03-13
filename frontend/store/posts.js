
import PostsAPI from '../api/posts.js';

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
  posts: [],
  last_page: 0,
  postLoad: true
})

export const actions = {

   allPosts({commit}, page) {
     commit('setPostLoad')
     PostsAPI.index( page )
       .then( function( response ){
          // console.log(response.data.current_page)
         commit( 'setAllPosts', {posts: response.data.data,current_page: response.data.current_page,last_page: response.data.last_page});
         commit('setPostLoad',false)
       })
       .catch( function(e){
         // commit('setPostLoad',false)
       });
  },
   paginatePosts({commit}, page) {

     PostsAPI.index( page )
       .then( function( response ){
         commit( 'setAllPosts', {posts: response.data.data, last_page: response.data.last_page});
       })
       .catch( function(e){

       });
  }
}

export const mutations = {

  setAllPosts( state, posts){

    state.last_page = posts.last_page
    state.posts.push(...posts.posts)
  },

  clearPosts( state, posts ){
    state.posts = []
  },
  setPostLoad( state, load = true ){
    state.postLoad = load;
  },
}

export const getters = {
   getAllPosts: (state) => {
    return state.posts;
  },
  getPostLoad: (state) => {
    return state.postLoad;
  }

}

