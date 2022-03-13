<template>
  <footer>
    <nuxt-link v-if="$auth.loggedIn && $auth.user.permission === 'admin'" to="/admin"  class="button-admin">
      <i class="fas fa-users-cog"></i>
    </nuxt-link>
    <div class="author-section">
      <div class="container">
        <p>Социальные сети автора:</p>
        <div class="social-icon">
          <a href=""><i class="fab fa-vk"></i></a>
          <a href=""><i class="fab fa-instagram"></i></a>
          <a href=""><i class="fab fa-whatsapp"></i></a>
          <a href=""><i class="fab fa-telegram-plane"></i></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
    export default {
      name: "AppFooter",
      mounted() {
      },
      computed: {
        ...mapGetters({
          getReloadStatus: 'ui/getReloadStatus'
        })
      },
    }
</script>

<style scoped>

</style>
