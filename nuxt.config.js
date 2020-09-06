export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title:  'Termii - Send personalized messages' ||  process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script: [
      {src: '/js/intercom.js'},
      {src: '/js/feedback.js'},
      { src: 'https://cdn.jsdelivr.net/jquery/latest/jquery.min.js' },
      { src: 'https://cdn.jsdelivr.net/momentjs/latest/moment.min.js'},

      {src:"/js/intro.js" },
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
    { src: '~/plugins/vue-intercom' },
    { src: '~/plugins/vue-clipboard' },
    { src: '~plugins/vue-js-modal.js'},
    { src: '~plugins/vue-paginate.js'},
    { src: '~plugins/vue-notification.js'},
			{ src: '~plugins/vue-select.js'},
    { src: '~plugins/local-storage.js', ssr: false},

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
		 	'@nuxtjs/auth-next',
    '@nuxtjs/toast',
			['nuxt-stripe-module', {
				publishableKey: 'pk_test_nueC1m5g6hJZsKLIPjFIExWj00J4L2PZkP',
			}],
  ],

  axios: {
    // proxyHeaders: false
    baseURL: 'http://api.sandbox.termii.com/v1/',

  },
  toast: {
    position: 'bottom-center',
    duration: 2500
  },

  auth: {

    redirect:{
    login: '/login',
      home: '/dashboard'

    },
    strategies: {
      local: {
							scheme: 'refresh',
							token: {
								property: 'access_token',
								// type: 'Bearer'
							},
      refreshToken: {
      	property: 'access_token',
							data: 'access_token',
							maxAge: 60 * 60
						},
							user: {
								property: 'data',
							},
        endpoints: {
          login: {url: 'auth/login', method: 'post',},
									 refresh:{url: 'auth/refresh/token', method:'get'},
          user: {url: '/user', method: 'get', },
          logout:{url:'/auth/logout', method:'get'}

        },
							autoLogout: true

      },
    },
  },


  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },

  }
}
