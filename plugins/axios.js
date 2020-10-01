export default ({  $axios }) => {
	$axios.defaults.baseURL = process.env.apiBaseUrl;
}
