export default {
  mode: 'spa',
	router: {
		mode: 'hash'
	},
  /*
  ** Headers of the page
  */
  head: {
    title:  'Termii - Send personalized messages' ,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content:  'Termii helps teams drive repeat interaction with customers through personalized email, voice, text, and instant messages.' }
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
		publicRuntimeConfig: {
			baseURL: 'https://termii.com'
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
			 '@nuxtjs/auth',
    '@nuxtjs/toast',
			['nuxt-stripe-module', {
				publishableKey: 'pk_test_nueC1m5g6hJZsKLIPjFIExWj00J4L2PZkP',
			}],
  ],

		generate: {
			fallback: true, // if you want to use '404.html' instead of the default '200.html'
		},
  axios: {
    // proxyHeaders: false
    baseURL: process.env.API_BASE_URL,

  },

  toast: {
    position: 'bottom-center',
    duration: 3000
  },

	auth: {
		localStorage: false,
		cookie: {
			prefix: 'auth.',
			options: {
				maxAge: 600
			}
		},
		redirect:{
			login: '/login',
			home: '/'

		},
		strategies: {
			local: {
				endpoints: {
					login: {url: 'auth/login', method: 'post', propertyName: 'access_token'},
					user: {url: '/user', method: 'get', propertyName: 'data'},
					logout:{url:'auth/logout', method:'get'}

				}
			}
			},
		plugins: [{ src: '~/plugins/auth.js', mode: 'client' }]
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
