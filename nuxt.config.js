require('dotenv').config();
export default {
 ssr: true,
	router: {
		mode: 'hash',
	},

	render: {
		csp: {
			reportOnly: false,
			addMeta: true,     // Add CSP meta-tag in addition to the HTTP header
			hashAlgorithm: 'sha256',
			unsafeInlineCompatiblity: true,
			policies: {
				'script-src': ["'self'", "'strict-dynamic'", 'https:'],
				'style-src': ["'self'", "'strict-dynamic'", 'https:'],
				'frame-src': [],
				'object-src': ["'none'"],
				'base-uri': ["'self"]
			}
		}
	},
	/*
	** Headers of the page
	*/
	head: {
		title:  'Termii - Easily Engage Customers' ,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content:  'Termii helps teams drive repeat interaction with customers through personalized email, voice, text, and instant messages.' },
		],
		script: [
			{src: '/js/intercom.js'},
			{src: '/js/feedback.js'},
			{src: '/js/google_tag.js'},
			{ src: 'https://cdn.jsdelivr.net/jquery/latest/jquery.min.js' },
			{ src: 'https://cdn.jsdelivr.net/momentjs/latest/moment.min.js'},
			{src:"/js/intro.js" },
			{src:"/js/has_request_payload.js" },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		]
	},
	publicRuntimeConfig: {
		baseURLv2: process.env.API_BASE_URL_v2,
		baseURL: 'https://termii.com',
		TERMII_API_KEY: process.env.TERMII_API_KEY,
		PUBLIC_API_BASE_URL: process.env.PUBLIC_API_BASE_URL,
		campaignApiBaseURL: process.env.CAMPAIGN_BASE_URL,
		IPAS: process.env.IPAS,
	},

	/*
	** Customize the progress-bar color
	*/
	loading:{
		color: '#1991bd',
		height: '2px',
		throttle: 0
	},
	loadingIndicator: {
		name: '~/termii_bird_loader.html',
		background: 'white'
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
		{ src: '~plugins/vue-chart.js'},
		{ src: '~plugins/axios.js'},
		{ src: '~plugins/services.plugin.js'},
		{ src: '~plugins/idle-vue.js'},
		{ src: '~plugins/vue-code-highlight.js'},
		{ src: '~plugins/local-storage.js', ssr: false},
		{ src: '~plugins/google_tag_no_script.js'},
		{ src: '~plugins/vue-captcha-v3.js'}
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
		'@nuxtjs/toast',
		'nuxt-helmet',
		['nuxt-stripe-module', {
			publishableKey: process.env.STRIPE_PK,
		}],
	],
	helmet: {
		frameguard: { action: "deny" },
		'Content-Security-Policy': "frame-ancestors 'none';",
		'X-Frame-Options':"none"
	},
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
	//added env object in other to access API_BASE_URL variable in .env file
	env: {
		apiBaseUrl: process.env.API_BASE_URL,
		termiiApiKey: process.env.TERMII_API_KEY,
		ADSK: process.env.ADSK,
		IPAS: process.env.IPAS,
		RSK: process.env.RSK
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
