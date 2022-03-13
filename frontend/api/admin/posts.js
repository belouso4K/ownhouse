export default $axios => ({

  index( page ){

      return $axios.$get('/api/v1/admin/posts?page='+page);
  },

  show( slug ){

      return $axios.$get('/api/v1/admin/post/'+slug);
  },

  create( data ){

    let formData = new FormData();

    Object.entries(data).forEach(val => {
      formData.append(val[0], val[1]);
    })

      return $axios.$post('/api/v1/admin/post/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  },

  update( data, slug ){
    let formData = new FormData();

    Object.entries(data).forEach(val => {
      formData.append(val[0], val[1]);
    })
    formData.append('_method', 'PUT');

    return $axios.$post('/api/v1/admin/post/update/'+slug, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  delete( id ){
    return $axios.$delete('/api/v1/admin/post/delete/'+id);
  },

  restore( id ){
    return $axios.$put('/api/v1/admin/post/restore/'+id);
  },


});
//
// import axios from 'axios';
//
// export default {
//
//   index( page ){
//
//     return axios.get(process.env.API_BASE_URL+'/api/v1/admin/posts?page='+page);
//   },
//
//   show( slug ){
//
//     return axios.get(process.env.API_BASE_URL+'/api/v1/admin/post/'+slug);
//   },
//
//   create( data ){
//
//     let formData = new FormData();
//
//     Object.entries(data).forEach(val => {
//       formData.append(val[0], val[1]);
//     })
//
//     return axios.post(process.env.API_BASE_URL+'/api/v1/admin/post/create', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//   },
//
//   delete( id ){
//     return axios.delete('/api/v1/admin/post/delete/'+id);
//   },
//
//   restore( id ){
//     return axios.put('/api/v1/admin/post/restore/'+id);
//   },
//
// }
