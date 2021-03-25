export class DeviceService {

	constructor(axios) {
		this.$axios = axios
	}

	async getQRCode(device_id){
		return await this.$axios.$get(`devices/${device_id}/barcode`);
	}

}
