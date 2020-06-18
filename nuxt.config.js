
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script: [
      {src: '/js/intercom.js'},
      {src: '/js/feedback.js'},
      {src: '/js/customScrollbar.js'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#1991bd',
    height: '2px',
    throttle: 0
  },
  /*
  ** Global CSS
  */
  css: [
    '@assets/css/general_style/landing_page.css',
    '@assets/font/karla/css/karla.css',
    '@assets/icons/entypo/css/entypo.css',
    '@assets/icons/fontawesome/styles.min.css',
    '@assets/icons/icomoon/styles.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-intercom'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',

  ],
  axios: {
    // proxyHeaders: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
