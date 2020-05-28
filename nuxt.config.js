
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
      {src: 'https://code.iconify.design/1/1.0.6/iconify.min.js' },
      {src: '/js/static/intercom.js'},
      {src: '/js/static/feedback.js'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {href:"https://termii.com/css/entypo/css/entypo.css?v=9", rel:"stylesheet", type:"text/css"},
      //{href: "https://termii.com/assets/pages/css/pages.css", rel: "stylesheet", type: "text/css"},
      {href:"https://fonts.googleapis.com/css?family=Karla:400,700", rel:"stylesheet", type:"text/css"},
      {href:"https://termii.com/assets/css/icons/icomoon/styles.css", rel:"stylesheet", type:"text/css"},
      {href:"https://termii.com/assets/css/icons/fontawesome/styles.min.css", rel:"stylesheet", type:"text/css"},

    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@assets/css/general_style/general_style.css'
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
