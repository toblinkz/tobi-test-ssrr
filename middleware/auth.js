export default async function ({ app ,  redirect, store}) {
	const {$axios} = app

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
}

