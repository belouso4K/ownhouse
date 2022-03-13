<template>
  <div>
    <client-only v-if="getReloadStatus">
      <NavBar/>
      <SideBar/>

        <nuxt />

      <Footer/>
      <div @click="overlay()" id="sidebar-overlay"></div>
    </client-only>
   <div v-else class="blink-1"><i class="fas fa-cogs"></i></div>
  </div>
</template>

<script>
  import NavBar from "../components/admin/global/NavBar";
  import SideBar from "../components/admin/global/SideBar";
  import Footer from "../components/admin/global/Footer";

  import { mapGetters } from "vuex";

    export default {
      name: "Admin",
      middleware: 'admin',
      ssr: false,
      // data: () => ({
      //
      // }),
      data() {
        return {
          isStripeLoaded: false,
          fullHeight: null
        }
      },
      head() {
          return {
              link: [
                  { rel:"stylesheet", type:"text/css", href:'AdminLTE/dist/css/adminlte.min.css' },
                  { rel:"stylesheet", type:"text/css", href:'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback' },

              ],
              script: [
                // {
                //   hid: 'stripe',
                //   src: 'AdminLTE/plugins/bootstrap/js/bootstrap.bundle.min.js',
                //   defer: true,
                //   // Changed after script load
                // },
                // {
                //   hid: 'stripe',
                //   src: 'AdminLTE/plugins/ekko-lightbox/ekko-lightbox.min.js',
                //   defer: true,
                //   // Changed after script load
                // },
                // {
                //   hid: 'stripe',
                //   src: 'AdminLTE/dist/js/adminlte.min.js',
                //   defer: true,
                //   // Changed after script load
                // },
                ],
              bodyAttrs: {
                // class: this.isMenuOpen ? 'menu-opened' : ''
                class: 'sidebar-mini'
              }
          }
      },

      methods: {
        // whenever the document is resized, re-set the 'fullHeight' variable
        handleResize (event) {
          this.fullHeight = document.documentElement.clientHeight
        },
        overlay() {
          let body = document.querySelector('body')

          body.classList.remove('sidebar-open')
          body.classList.add('sidebar-collapse')
          body.classList.add('sidebar-closed')
        }
      },

      computed: {
        ...mapGetters({
          getReloadStatus: 'ui/getReloadStatus'
        })
      },

      created() {
          setTimeout(() => {
            this.$store.commit('ui/toggleReload', true)
          }, 500)
      },

      destroyed() {
        this.$store.commit('ui/toggleReload', false)
      },

      updated() {
        let body = document.querySelector('body')
        if (window.innerWidth < 991) {
          body.classList.add('sidebar-closed')
          body.classList.add('sidebar-collapse')

        }
      },

      mounted() {
        // this.$nextTick(() => {
        //
        //   // this.monitorHeight()
        // })
        this.fullHeight = window.innerWidth
        let body = document.querySelector('body')
        if (window.innerWidth < 991) {
          body.classList.add('sidebar-closed')
          body.classList.add('sidebar-collapse')
          console.log('dd')
        }

        window.addEventListener('resize', () => {

          let body = document.querySelector('body')
          if (window.innerWidth < 991 && this.$nuxt.$data.layoutName === 'Admin') {
            if (body.classList.contains('sidebar-open')) {

            } else {

              body.classList.add('sidebar-closed')
              body.classList.add('sidebar-collapse')
            }

          } else {
            body.classList.remove('sidebar-closed')
            body.classList.remove('sidebar-collapse')
            body.classList.remove('sidebar-open')

          }
        })
      },

      beforeDestroy() {
        let body = document.querySelector('body')
        body.classList.remove()
        window.removeEventListener('resize', () => {
          body.classList.remove()
        })
      },

      components: {
          NavBar,SideBar,Footer
      },
    }
</script>

<style scoped>
section.content, section.content-header {
  margin-top: 0
}
.blink-1 {
  animation-name: blink;
  animation-timing-function: linear;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  color: #686868;
  font-size: 70px;
  min-width: 100vh;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

#__layout > div {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1 0 auto;
}

</style>
<style>


.form-group.img {
  padding: 8px 83px;

}

.form-group.img img {
  height: fit-content;
  max-height: 128px;
  object-fit: contain;

}
.content-wrapper section {
  margin: 0;
}

.ql-container{
  min-height: inherit;
}


.form-group label.label-tags {
  position: relative;
}

.form-group label p {
  position: absolute;
  top: -3px;
  right: -14px;
  font-size: 12px;
  color: #999999;
}


.form-group .tags {
  margin-top: 15px;
}
</style>
