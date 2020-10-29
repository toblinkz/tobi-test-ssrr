export default function ({store, redirect}) {
	if (localStorage.getItem('local') && localStorage.getItem('user_data')) {
		if (JSON.parse(localStorage.getItem('user_data')).active_status_id.id ===  6) {
			return redirect('/account/deactivate');
		}
	}

}
