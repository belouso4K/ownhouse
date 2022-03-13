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
          <div class="wrapper-post">

          </div>
        </div>
      </div>
    </section>



</template>

<script>
export default {
  name: 'addPost',
  layout: 'App',
  data() {
    return {

    }
  },
  created() {
    // this.$api.posts.show(this.$route.params.slug).then(data => {
    //   console.log(data)
    //   this.form.title = data.title
    //   this.form.desc = data.desc
    //   this.form.excerpt = data.excerpt
    //   this.form.radio = data.status
    //   this.form.tags = data.tags ? data.tags.split(',') : []
    //   this.imgShow = process.env.API_BASE_URL+"/storage/posts/"+data.img
    // })

  },
  methods: {

  },

  mounted() {

  }

}
</script>

<style>

</style>
