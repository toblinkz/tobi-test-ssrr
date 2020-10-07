export default ({  $axios }) => {
	$axios.defaults.baseURL = process.env.API_BASE_URL
}
