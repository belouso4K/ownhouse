<template>
  <header>
    <div class="container">
      <nav class="navigation">
        <nuxt-link to="/" class="logo">OwnHouse</nuxt-link>
        <ul>
          <li>
            <nuxt-link to="/posts">Посты</nuxt-link>
          </li>
          <li>
            <a href="music-page.html">Музыка</a>
          </li>
          <li>
            <a href="film.html">Фильмы</a>
          </li>
        </ul>
        <nuxt-link v-if="$auth.loggedIn" to="/cabinet" class="cabinet-auth">Личный кабинет</nuxt-link>
        <div v-else class="auth">
          <nuxt-link to="/login">Войти</nuxt-link>
          <nuxt-link to="/register">Зарегистрироваться</nuxt-link>
        </div>

      </nav>
    </div>
  </header>
</template>

<script>
    export default {
        name: "AppHeader"
    }
</script>

<style scoped>

</style>
