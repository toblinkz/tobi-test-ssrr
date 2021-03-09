export class ResponseHandlerService {
	constructor (response) {
		this.response = response
	}

	async status () {
	return this.response.status
	}

	async data () {
		return this.response.data
	}

}
