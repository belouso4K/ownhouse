<template>
  <section class="section-cabinet">
    <div class="container">
      <div class="main-header">
        <h1> Личный кабинет</h1>
        <ul class="breadcrumbs">
          <li>
            <a href="">OwnHouse</a>
          </li>
          <li>
            <p>Личны кабинет</p>
          </li>
        </ul>
      </div>
      <div class="flex-position">
        <aside>
          <div class="aside-title">
            Настройки
          </div>
          <ul class="menu">
            <li>
              <a>Профиль</a>
            </li>
            <li>
              <a>Рекомендации</a>
            </li>
            <li>
              <a>Настройки</a>
            </li>
            <li>
              <p @click="logout">Выйти</p>
            </li>
          </ul>
        </aside>
        <div class="right-content">
          <form action="" class="search">
            <input type="text" placeholder="Фильмы, жанры">
            <button><i class="fas fa-search"></i></button>
          </form>
          <form action="" class="search">
            <input type="text" placeholder="Фильмы, жанры">
            <button><i class="fas fa-search"></i></button>
          </form>
          <form action="" class="search">
            <input type="text" placeholder="Фильмы, жанры">
            <button><i class="fas fa-search"></i></button>
          </form>

        </div>

      </div>
    </div>
  </section>
</template>

<script>
    export default {
        layout: 'App',
        middleware: 'auth',
        methods: {
            async logout(){
                await this.$auth.logout();
            }
        }
    }
</script>

<style scoped>

</style>
