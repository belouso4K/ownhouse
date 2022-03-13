<template>
  <div id="app-layout">

    <div>
      <AppHeader v-show="showHeader"/>
    </div>

      <nuxt />

    <AppFooter v-show="showFooter"/>
  </div>
</template>


<script>
    import AppHeader from "../components/global/Header/AppHeader";
    import AppFooter from '../components/global/Footer/AppFooter.vue';
    export default {
        data(){
            return {
                dddd: this.$route
            }
        },
        computed: {
            showFooter(){
                let pages = [
                ];
                return pages.indexOf( this.$route.name ) == -1;
            },
            showHeader(){
                let pages = [
                ];
                return pages.indexOf( this.$route.name ) == -1;
            }
        },
        components: {
            AppHeader,
            AppFooter
        }
    }
</script>

<style scoped>
  #app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

</style>
