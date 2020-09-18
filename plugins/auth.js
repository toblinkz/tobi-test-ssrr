var idle_time = 0;
var used_time = 0;
const strategy = 'local'
export default async function ({ app }) {
	const { $axios, $auth,  } = app

	let token = $auth.getToken(strategy);


	//Increment the idle time counter every minute.
	var idleInterval = setInterval( async function () {

		 used_time = used_time + 1;
		 idle_time = idle_time + 1;

		if (idle_time > 59) {
			 await $auth.logout();
		 	$nuxt.$router.push({name: 'login'});
			 clearInterval(idleInterval);
		}
		if (used_time > 58 && idle_time === 1){
				let response = 	await $axios.$get('auth/refresh/token');
				token = 'Bearer ' + response.access_token;
				let refreshToken = response.access_token;
				$auth.setToken(strategy, token);  // set new token
			 $auth.setRefreshToken(strategy, refreshToken); // set refresh token
			 location.reload();
			 clearInterval(idleInterval);
		}

	}, 60000); // 1 minute

	//set the idle timer to zero when user is active.
	document.onclick = function () {
				idle_time = 0;
	}
	document.onkeypress = function () {
				idle_time = 0;
	}
	document.onmousemove = function () {
				idle_time = 0;
	}

}
