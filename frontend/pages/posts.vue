<template>
  <section class="section-posts">
    <div class="container">
      <div class="main-header">
        <h1>Последние новости</h1>
        <ul class="breadcrumbs">
          <li>
            <a href="">OwnHouse</a>
          </li>
          <li>
            <p>Новости</p>
          </li>
        </ul>
      </div>
      <div class="flex-position">
        <aside>
          <div class="aside-title">
            Категория новостей
          </div>
          <div class="tags">
            <a>Спорт</a>
            <a>Мотивация</a>
            <a>Игры</a>
            <a>Технологии</a>
            <a>Музыка</a>
          </div>
        </aside>
        <div v-if="!loading" class="wrapper-post">
          <div v-for="post in posts" class="news-item">
            <nuxt-link class="img-news" :to="'/post/'+post.slug">
              <img :src="getSrc(post.img)" alt="">
            </nuxt-link>
            <div class="news-item-area">
              <h3 class="news-item-area_title">
                {{ post.title }}
              </h3>
              <p class="news-item-area_desc" v-html="post.excerpt ? post.excerpt : post.desc">

              </p>
              <div class="tags">
                <a v-if="post.tags" v-for="tag in getTags(post.tags)">{{ tag }}</a>
<!--                <a>Мотивация</a>-->
              </div>
              <div class="news-item-area_elem">
                <p>23 477 <i class="far fa-eye"></i></p>
                <a href=""><i class="fas fa-share"></i></a>
                <a href="" class="like active"><i class="far fa-heart"></i></a>
              </div>
            </div>
          </div>
          <infinite-loading v-if="posts.length" spinner="bubbles" @infinite="infiniteScroll"></infinite-loading>
<!--          <pagination :data="posts" @pagination-change-page="getResults"></pagination>-->
        </div>
        <div v-else class="wrapper-post">
          <div v-for="count in 7" class="news-item">
            <span class="skeleton-main__img skeleton-main"></span>
            <div class="news-item-area">
              <span class="skeleton-main__title skeleton-main">
              </span>
              <div class="skeleton-main__excerpt">
                <span class="skeleton-main__excerpt-item skeleton-main"></span>
                <span class="skeleton-main__excerpt-item skeleton-main"></span>
                <span class="skeleton-main__excerpt-item skeleton-main"></span>
                <span class="skeleton-main__excerpt-item skeleton-main"></span>
              </div>
              <div class="tags">
                <span class="skeleton-main__tag skeleton-main"></span>
                <span class="skeleton-main__tag skeleton-main"></span>
                <span class="skeleton-main__tag skeleton-main"></span>
                <!--                <a>Мотивация</a>-->
              </div>
              <div class="news-item-area_elem">
                <p>23 477 <i class="far fa-eye"></i></p>
                <a href=""><i class="fas fa-share"></i></a>
                <a href="" class="like active"><i class="far fa-heart"></i></a>
              </div>
            </div>
          </div>
        </div>

<!--          <infinite-loading v-if="posts.length" spinner="bubbles" @infinite="infiniteScroll"></infinite-loading>-->
          <!--          <pagination :data="posts" @pagination-change-page="getResults"></pagination>-->
        </div>
<!--        <div class="loading" ><i class="fa-solid fa-cloud"></i></div>-->

      </div>




  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "posts",
  layout: 'App',
  data() {
    return {
      page: 0,

    }
  },
  created(){
    this.getResults()

  },

  watch: {
    posts() {
    }
  },

  computed: {
    ...mapGetters({
      posts: "posts/getAllPosts",
      loading: "posts/getPostLoad"
    }),
  },
  methods: {
    getSrc(img) {
      return process.env.API_BASE_URL+'/storage/posts/'+img
    },
    getTags(tags) {

      return tags ? tags.split(',') : []
    },
    getResults(page, $state = null) {
      if (typeof page === 'undefined') {
        page = 1;
      }
      this.page = page
      let last_page = this.$store.state.posts.last_page
      //
      if (!$state) {
        this.$store.dispatch('posts/allPosts', page)
      } else {
        $state.loaded();
        if (page <= last_page) {
          this.$store.dispatch('posts/paginatePosts', page)
        } else {
          $state.complete()
        }
      }

    },
    infiniteScroll($state) {
      setTimeout(() => {
        this.page++; // next page
        this.getResults(this.page, $state)

      }, 1000);
    }
  },
  destroyed() {
    this.$store.commit('posts/clearPosts')
    this.posts = []
  },
  // beforeRouteLeave (to, from , next) {
  //   const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  //   if (answer) {
  //     next()
  //   } else {
  //     next(false)
  //   }
  // }

}
</script>

<style>
/*.loading {*/
/*  animation: 1s linear 0s normal none infinite running rot;*/
/*  -webkit-animation: 1s linear 0s normal none infinite running rot;*/
/*  width: 100px;*/
/*}*/
/*@keyframes rot {*/
/*  0% {*/
/*    transform: rotate(0deg);*/
/*  }*/
/*  100% {*/
/*    transform: rotate(360deg);*/
/*  }*/
/*}*/
/*@-webkit-keyframes rot {*/
/*  0% {*/
/*    transform: rotate(0deg);*/
/*  }*/
/*  100% {*/
/*    transform: rotate(360deg);*/
/*  }*/
/*  */
/*}*/

.loading {
  animation-name: blink;
  animation-timing-function: linear;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  color: #628bff;
  font-size: 70px;
  margin: 15rem auto 0;
}


@keyframes blink {
  50% {
    opacity: 0;
  }
}

.skeleton-main {
  background-color: #c3c3c3;
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.skeleton-main__img {
  width: 50%;
  height: -webkit-fill-available;
}


.news-item {
  height: 260px;
}

.skeleton-main__title {
  width: 167px;
  height: 1.2em;
  margin-bottom: 10px;
}

.skeleton-main__excerpt .skeleton-main__excerpt-item {
  height: 0.7em;
  display: block;
}
.skeleton-main__excerpt .skeleton-main__excerpt-item:first-child {
  width: 90%;
}
.skeleton-main__excerpt .skeleton-main__excerpt-item:nth-child(2) {
  width: 100%;
}
.skeleton-main__excerpt .skeleton-main__excerpt-item:nth-child(3) {
  width: 85%;
}
.skeleton-main__excerpt .skeleton-main__excerpt-item:last-child {
  width: 95%;
}

.skeleton-main__excerpt .skeleton-main__excerpt-item:not(:last-child) {
  margin-bottom: 8px;
}

.skeleton-main {

  /*background-image: -webkit-linear-gradient(left, #ececec 0px, #f4f4f4 40px, #ececec 80px);*/
  /*background-image: -o-linear-gradient(left, #ececec 0px, #f4f4f4 40px, #ececec 80px);*/
  /*background-image: linear-gradient(90deg, #ececec 0px, #f4f4f4 40px, #ececec 80px);*/
  background-image: linear-gradient(90deg, rgb(255 255 255 / 37%) 0, rgb(255 255 255 / 55%) 20%, rgb(255 255 255 / 50%) 60%, #d9d9d9);
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
