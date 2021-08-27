export class VoiceOtpService {

	constructor(axios) {

		this.$axios = axios
	}


	async otpRequest(request_payload){
		return await this.$axios.$post('sandbox/voice-otp', {
			phone_number: request_payload.phone_number,
			pin_attempts: request_payload.pin_attempts,
			pin_time_to_live: request_payload.pin_time_to_live,
			pin_length: request_payload.pin_length
		});
	}


	async verifyOTP(pin, pin_id){
		return await this.$axios.$post('sandbox/voice-otp/verify', {
			pin:pin,
			pin_id:pin_id,
		});
	}


}
