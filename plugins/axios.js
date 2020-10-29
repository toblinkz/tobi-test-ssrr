export default ({  $axios }) => {
			// passed apiBaseUrl from env object in nuxt config to axios default base url
	$axios.defaults.baseURL = process.env.apiBaseUrl;
	$axios.setHeader('Authorization',  `Bearer ${localStorage.getItem('local')}`);
}
