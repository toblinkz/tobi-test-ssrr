export default ({  $axios, redirect }) => {
			// passed apiBaseUrl from env object in nuxt config to axios default base url
	$axios.defaults.baseURL = process.env.apiBaseUrl;
	$axios.setHeader('Authorization',  `Bearer ${localStorage.getItem('local')}`);

	$axios.onError(error => {
		if(error.response.status === 401) {
			redirect('/login')
		}
	})


}
