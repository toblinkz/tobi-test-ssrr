export default async function ({ app }){
	const { $axios  } = app

	let token = localStorage.getItem('local');
	let base64Url = token.split('.')[1];
	let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	let decoded = JSON.parse(jsonPayload);
	let exp_time = decoded.exp
	let current_time = Date(0);
	const d = new Date(0);
	d.setUTCSeconds(exp_time);
	let log_out_time = moment(d).subtract(55, 'minutes').toDate();
	let logut_out_time_in_sec = new Date().getMilliseconds()  ;

	setTimeout( async function () {
		await $axios.$get('auth/logout')
		console.log('gl')
	}, log_out_time - Date.now());

	console.log('current time', current_time);
	console.log('expiry_time', d);
	console.log('Log_out_time', log_out_time);
	console.log(logut_out_time_in_sec);
	console.log(log_out_time - Date.now())


}



