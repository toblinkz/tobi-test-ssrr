export default function ({store, redirect}) {
	if (store.state.auth.user.active_status_id.id ===  6){
		return redirect('/account/deactivate');
	}
}
