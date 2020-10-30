export default async function ({ app ,  redirect, store}) {
	const {$axios} = app
if (navigator.onLine){
	try {
		let response = await $axios.get('user', {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('local')}`
			}
		});
	}catch (e){
		if (e.response.data.error === 'Token is Expired' || !localStorage.getItem('local')){
			store.commit('setLIState', false);
			redirect('/login');
		}
	}
}else {
	$nuxt.$toast.show("No Internet connection");
}

}

