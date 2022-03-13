require('dotenv').config()
const isDev = process.env.NODE_ENV !== 'production'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // ssr: false,
  head: {
    title: 'ownhouse',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:"stylesheet", type:"text/css", href:'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' },
      // { rel:"stylesheet", type:"text/css", href:'AdminLTE/dist/css/adminlte.min.css' },
      // {rel:"stylesheet", type:"text/css", href:'AdminLTE/dist/css/adminlte.min.css'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/config.css',
    '@/assets/css/style.css',

  ],

  //Этот механизм подгружает страницу как только ссылка на
  // неё попадает в область видимости окна браузера. То есть ещё
  // до клика на ссылку, страница будет уже загружена и пользователь
  // без задержки откроет ссылку. Но в интернет-магазине будут сотни ссылок
  // и нам не нужно, чтобы каждая из них автоматически подгружалась (если у вас слабый сервер, а у клиентов 2G).
  router: {
    // prefetchLinks: false,
    routeNameSplitter: '/',
    base: '/'
  },

  modulesDir: ['../../node_modules'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '~/plugins/ownhouseAPI.js',
    '~/plugins/pagination.js',
    {src:'~/plugins/vue-quill-editor.js',mode: 'client'},
    { src: '~/plugins/vue-infinite-loading.js', ssr: false,mode: 'client' }
    // {src:'~/plugins/vue-infinite-scroll.js',mode: 'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth-next',
    'nuxt-ssr-cache',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL,
    credentials: true
  },

  auth: {
    redirect: {
      login: '/',
      home: false,
    },
    strategies: {
      'laravelSanctum': {
        provider: 'laravel/sanctum',
        url: process.env.API_BASE_URL,
        token: {
          property: 'accessToken',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {
            url: '/login',
            method: 'POST',
          },
          user: {
            url: '/api/v1/user',
            method: 'get',
          },
          logout: {
            url: '/logout',
            method: 'get',
          }
        }
      }
    }
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    //Отключаем для Development всю минификацию html, чтобы ускорить процесс разработки.
    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true
        }
      }
    }),
    //Это элегантное решение распространённой проблемы, когда вы скажем
    // обновили приложение на production, а у клиентов все js скрипты и стили в кеше
    // бразуера. Чтобы инвалидировать этот кеш, мы просто каждый раз генерируем у всех
    // файлов название, которое является хеш-функцией контента внутри этого файла. Соответственно если какой-то файл
    // поменяется, то при следующем заходе пользователя на страницу, браузер будет требовать уже файл с другим именем
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },

    //Разбиваем на независимые чанки всё приложение.
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },

    //Отключаем минификацию js для development.
    optimization: {
      minimize: !isDev
    },

    // По умолчанию Nuxt автоматически добавляет все стили проекта
    // прямо внутрь html через тег style. Это уменьшает количество
    // запросов к серверу, так как у нас нигде не будет нужно браузеру загружать css файлы отдельно.
    // Но это так же лишает браузер возможности кешировать css стили. Поэтому для development мы включаем
    ...(!isDev && {
      extractCSS: {
        ignoreOrder: true
      }
    }),

    //По умолчанию Babel старается
    // трансплитирировать весь код проекта, но иногда он не делает
    // это с некоторыми зависимостями и их нужно задать явно.
    transpile: ['vue-lazy-hydration', 'intersection-observer'],
    extractCSS: { allChunks: true }
  }

}
