export class SmsSandboxService{

	constructor(axios) {
		this.$axios = axios;
	}

	async getSenderIdByChannel(){
		 return await this.$axios.$get('sandbox/sender-id');
	}

	async getMessageContent(){
		return await  this.$axios.$get('sandbox/sms/content');
	}

	async sendMessage(to, from, channel, type ){
		 return await this.$axios.$post('sandbox/sms/send', {
				to: to,
				from: from,
				channel: channel,
				type: type
			})
	}

}
