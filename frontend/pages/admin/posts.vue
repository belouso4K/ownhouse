<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Projects</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Projects</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>
    <section class="content">

      <!-- Default box -->
      <div class="card">

        <div class="card-body p-0">
          <table  class="table projects">
            <thead>
            <tr>
              <th style="width: 1%">
                #
              </th>
              <th style="width: 20%">
                Название
              </th>
              <th style="width: 30%">
                Изображение
              </th>
              <th style="width: 8%">
                Status
              </th>
              <th style="width: 20%">
                Действия
              </th>
            </tr>
            </thead>
            <tbody v-if="!loading">
              <tr v-for="post in posts.data">
                <td>
                  {{ post.id }}
                </td>
                <td>
                  <a>
                    {{ post.title }}
                  </a>
                  <br/>
                  <small>
                    Создано {{ post.created_at }}
                  </small>
                </td>
                <td>
                  <img :src="getSrc(post.img)" alt="">
                </td>
                <td class="project-state">
                  <span :class="['badge badge-'+status(post.status, post.deleted_at).class]">{{ status(post.status, post.deleted_at).name }}</span>
  <!--                <span v-else class="badge badge-success">Опубликован</span>-->
                </td>
                <td class="project-actions">
                  <a title="Посмотреть" class="btn btn-primary btn-sm" href="#">
                    <i class="fa-solid fa-eye"></i>
                  </a>
                  <nuxt-link title="Редактировать" class="btn btn-info btn-sm" :to="'/admin/post/'+post.slug">
                    <i class="fas fa-pencil-alt">
                    </i>

                  </nuxt-link>
                  <a title="Удалить" v-if="!post.deleted_at" @click.prevent="delPost(post.id)" class="btn btn-danger btn-sm" href="#">
                    <i class="fas fa-trash">
                    </i>
                  </a>
                  <a title="Восстановить" v-else @click.prevent="restorePost(post.id)" class="btn btn-warning btn-sm" href="#">
                    <i class="fa-solid fa-trash-arrow-up"></i>
                  </a>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr v-for="count in 7">
                <td>
                    <span class="skeleton-box skeleton-min-box"></span>
                </td>
                <td>
                  <a class="skeleton-box skeleton-title">

                  </a>
                  <br/>
                  <small class="skeleton-box skeleton-min-title">

                  </small>
                </td>
                <td class="img-loader">
                  <span class="skeleton-box skeleton-img"></span>
                </td>
                <td class="project-state">
                  <span class="skeleton-box skeleton-status"></span>
                </td>
                <td class="project-actions">
                  <span class="skeleton-box skeleton-min-box"></span>
                  <span class="skeleton-box skeleton-min-box"></span>
                  <span class="skeleton-box skeleton-min-box"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /.card-body -->
      </div>
<!--      <div class="loading">-->
<!--        <i class="fa-solid fa-gears"></i>-->
<!--      </div>-->
      <pagination :data="posts" @pagination-change-page="getResults"></pagination>
      <!-- /.card -->
    </section>

 </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "posts",
  layout: 'Admin',
  data() {
    return {
      // posts: {},
    }
  },
  created() {
    this.getResults();
  },
  computed: {
    ...mapGetters({
      posts: "admin/posts/getAllPosts",
      loading: "admin/posts/getPostsLoad"
    }),
  },
  watch: {
    posts() {
    },
    loading() {

    }
  },

  methods: {

    getResults(page) {
      if (typeof page === 'undefined') {
        page = 1;
      }

      this.$store.dispatch('admin/posts/allPosts', page)
    },

    getSrc(img) {
      return process.env.API_BASE_URL+'/storage/posts/'+img
    },

    delPost(id) {
      this.$store.dispatch('admin/posts/deletePostById', id)
    },

    restorePost(id) {
      this.$store.dispatch('admin/posts/restorePostById', id)
      this.getResults()
    },

    status(status, del = null) {
      if (del != null)
        return {
          class: 'danger',
          name: 'Удален'
        }
      else if (status === '1')
        return {
          class: 'success',
          name: 'Опубликован'
        }
      else if (status === '0')
        return {
          class: 'warning',
          name: 'Ограничен'
        }
      else
        return {
          class: 'warning',
          name: 'null'
        }
    },
  },
  destroyed() {
    this.$store.commit('admin/posts/setPostsLoad', true)

  }
}
</script>

<style>
  ul.pagination {
    justify-content: center;
    margin-bottom: 20px;
  }
  td img {
    height: 96px;
    object-fit: contain;
    width: 156px;
    margin: 0 auto;
  }
  tr {
    text-align: center;
  }
  .table td, .table th {
    padding: 1rem;
  }

  .skeleton-box {
    background-color: #c3c3c3;
    display: inline-block;
    position: relative;
    overflow: hidden;
  }

  .skeleton-img {
    width: 133px;
    height: 133px;
  }

  .skeleton-min-box {
    height: 30px;
    width: 30px;
  }
  .skeleton-title {
    width: 157px;
    height: 1em;
  }
  .skeleton-min-title {
    width: 120px;
    height: 1em;
  }
  .skeleton-status {
    width: 100px;
    height: 1em;
  }

  .skeleton-box {
    background-image: -webkit-linear-gradient(left, #ececec 0px, #f4f4f4 40px, #ececec 80px);
    background-image: -o-linear-gradient(left, #ececec 0px, #f4f4f4 40px, #ececec 80px);
    background-image: linear-gradient(90deg, #ececec 0px, #f4f4f4 40px, #ececec 80px);
    /*background-size: 250px;*/
    background-size: 294px;
    -webkit-animation: shine-loading-image 2s infinite ease-out;
    animation: shine-loading-image 2s infinite ease-out;
    content: '';
  }

  @keyframes shine-loading-image {
    0% {
      background-position: -32px;
    }
    40%, 100% {
      background-position: 208px;
    }

  }

</style>
