<template>
  <section>
    <div class="container">
      <p style="font-size: 50px">404</p>
      Такой страницы не существует
    </div>
  </section>

</template>

<script>
    export default {
        name: "error.vue",
        layout: 'App',
        created() {
          // layout = this.$route.path.indexOf('/admin/') > -1 ? 'Admin' : 'App',
          // console.log(this.$route.path.indexOf('/admin/') > -1)
        }

    }
</script>

<style scoped>

</style>
