export default async function ({  app ,  redirect, route, store, $toast}) {
	const {$axios} = app
	if (navigator.onLine) {
		if (store.state.L_I !== true){
			let REDIRECT_URL = '/login'
			if (route.path !== '/') {
				REDIRECT_URL = `/login?redirect=${route.path}`
			}
			await localStorage.setItem('redirect_path', route.path)
			return redirect(REDIRECT_URL);
		}
	}else {
		$toast.show("No Internet connection");
	}

}

