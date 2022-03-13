<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <nuxt-link to="/admin" class="brand-link">
      <img
        src="dist/img/AdminLTELogo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: .8"
      >
      <span class="brand-text font-weight-light">AdminLTE 3</span>
    </nuxt-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
            src="dist/img/user2-160x160.jpg"
            class="img-circle elevation-2"
            alt="User Image"
          >
        </div>
        <div class="info">
          <a href="#" class="d-block">Alexander Pierce</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item has-treeview menu-open">
            <nuxt-link to="/" class="nav-link active">
              <i class="nav-icon fas fa-tachometer-alt" />
              <p>
                На сайт
              </p>
            </nuxt-link>

          </li>
          <li class="nav-item">
            <a href="pages/widgets.html" class="nav-link">
              <i class="nav-icon fas fa-th" />
              <p>
                Widgets
              </p>
            </a>
          </li>
          <li class="nav-item has-treeview">
            <a @click.prevent="openMenu($event)" href="#" class="nav-link">
              <i class="nav-icon fas fa-copy" />
              <p>
                Посты
                <i class="fas fa-angle-left right" />
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <nuxt-link to="/admin/posts" class="nav-link">
                  <i class="far fa-circle nav-icon" />
                  <p>Все посты</p>
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link to="/admin/post/add" class="nav-link">
                  <i class="far fa-circle nav-icon" />
                  <p>Добавить пост</p>
                </nuxt-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <nuxt-link to="/admin/tags" class="nav-link">
              <i class="nav-icon fas fa-th" />
              <p>
                Теги
              </p>
            </nuxt-link>
          </li>
          <li class="nav-header">
            EXAMPLES
          </li>
          <li class="nav-item">
            <a href="pages/calendar.html" class="nav-link">
              <i class="nav-icon far fa-calendar-alt" />
              <p>
                Calendar
                <span class="badge badge-info right">2</span>
              </p>
            </a>
          </li>
          <li class="nav-item has-treeview">
            <a @click.prevent="openMenu($event)" href="#" class="nav-link">
              <i class="nav-icon far fa-envelope" />
              <p>
                Mailbox
                <i class="fas fa-angle-left right" />
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="pages/mailbox/mailbox.html" class="nav-link">
                  <i class="far fa-circle nav-icon" />
                  <p>Inbox</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/mailbox/compose.html" class="nav-link">
                  <i class="far fa-circle nav-icon" />
                  <p>Compose</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/mailbox/read-mail.html" class="nav-link">
                  <i class="far fa-circle nav-icon" />
                  <p>Read</p>
                </a>
              </li>
            </ul>
          </li>

          <li class="nav-header">
            MULTI LEVEL EXAMPLE
          </li>
          <li class="nav-item has-treeview nested">
            <a @click.prevent="openMenu($event)" href="#" class="nav-link">
              <i class="nav-icon fas fa-circle" />
              <p>
                Level 1
                <i class="right fas fa-angle-left" />
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="far fa-circle nav-icon" />
                  <p>Level 2</p>
                </a>
              </li>
              <li class="nav-item has-treeview">
                <a @click.prevent="openMenu($event)" href="#" class="nav-link">
                  <i class="far fa-circle nav-icon" />
                  <p>
                    Level 2
                    <i class="right fas fa-angle-left" />
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="#" class="nav-link">
                      <i class="far fa-dot-circle nav-icon" />
                      <p>Level 3</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-link">
                      <i class="far fa-dot-circle nav-icon" />
                      <p>Level 3</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-link">
                      <i class="far fa-dot-circle nav-icon" />
                      <p>Level 3</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="far fa-circle nav-icon" />
                  <p>Level 2</p>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
    export default {
        name: "SideBar",
      data: () => ({
        active: false
      }),
      methods: {
        openMenu(e) {
          let sidebar = document.querySelectorAll('ul[role="menu"] li')
          let parrentLi = e.target.closest('li').classList

          if (parrentLi.contains('menu-open')) {

            parrentLi.remove('menu-is-opening')
            parrentLi.remove('menu-open')
          } else {
            sidebar.forEach((el) => {
              if (e.target.closest('.nested') && el.classList.contains('nested')) {
                return
              }
              el.classList.remove('menu-is-opening')
              el.classList.remove('menu-open')

            })
            parrentLi.add('menu-is-opening')
            parrentLi.add('menu-open')

          }

        }
      },


    }
</script>

<style scoped>
aside {
  margin-right: 0;
  max-width: inherit;
  position: fixed !important;
}

.main-sidebar {
  height: 100vh !important;
  overflow-y: hidden;
  z-index: 1038;
}

.main-sidebar .sidebar {
  overflow-y: overlay !important;
}

.nav-sidebar .menu-is-opening > .nav-treeview {
  overflow:hidden;
  max-height: 300px;
  -webkit-transition:max-height 0.5s ease-in-out;
  -moz-transition:max-height 0.5s ease-in-out;
  transition:max-height 0.5s ease-in-out;
}

.nav-sidebar .nav-treeview {
  overflow:hidden;
  max-height: 0;
  display: block;
  -webkit-transition:max-height 0.3s ease-in-out;
  -moz-transition:max-height 0.3s ease-in-out;
  transition:max-height 0.3s ease-in-out;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: rgb(145 145 145);
  border-radius: 10px;
}
.sidebar:hover::-webkit-scrollbar {
  width: 0.4rem;
  height: 0.4rem;
}

</style>
