import axios from 'axios';

export default {

  index( page ){

    return axios.get(process.env.API_BASE_URL+'/api/v1/posts?page='+page);
  },

  show( slug ){

    return axios.get('/api/v1/post/'+slug);
  },

}
