export default ({  $axios, redirect, store,   }) => {
			// passed apiBaseUrl from env object in nuxt config to axios default base url
	$axios.defaults.baseURL = process.env.apiBaseUrl;
	$axios.setHeader('Authorization',  `Bearer ${localStorage.getItem('local')}`);

	$axios.onError(error => {

		if(error.response.status === 401 && localStorage.getItem('activity_log_error') === 'false') {
				store.commit('setLIState', false);
				redirect('/login')
				localStorage.clear();

		}

	})


}
