export default async function ({  app ,  redirect, store, $nuxt}) {
	const {$axios} = app
if (navigator.onLine) {
	 if (store.state.L_I !== true){
	 	 return redirect('/login');
	 }
}else {
	$nuxt.$toast.show("No Internet connection");
}

}

