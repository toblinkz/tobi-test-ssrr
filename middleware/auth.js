export default async function ({  app ,  redirect, store, $toast}) {
	const {$axios} = app
if (navigator.onLine) {
	 if (store.state.L_I !== true){
	 	 return redirect('/login');
	 }
}else {
	$toast.show("No Internet connection");
}

}

