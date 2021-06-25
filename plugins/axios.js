export default ({  $axios, redirect, store  }) => {
			// passed apiBaseUrl from env object in nuxt config to axios default base url
	$axios.defaults.baseURL = process.env.apiBaseUrl;
	$axios.setHeader('Authorization',  `Bearer ${localStorage.getItem('local')}`);

	$axios.onError(error => {
		console.log(error.response.status)
		if(error.response.status === 401) {
			store.commit('setLIState', false);
			  redirect('/login')
		}
	})


}
