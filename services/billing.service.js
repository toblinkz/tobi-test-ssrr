import {ResponseHandlerService} from "@/services/response-handler.service";

export class BillingService {

	constructor(axios) {

		this.$axios = axios
	}

	async getTransactionHistory (transaction_date, page) {

		const date = this.getDate(transaction_date)

		return this.$axios.get('billing/wallet/transactions', {
			params: {
				page: page,
				date_from: date.date_from,
				date_to: date.date_to,
			}
		});
	}

	async getTransactionSum(transaction_date){

		const date = this.getDate(transaction_date)

		return this.$axios.get('billing/wallet/transactions/sum', {
			params:{
				date_from: date.date_from,
				date_to: date.date_to,
			}
		});
	}

	getDate(date){
		return {
			date_from : (date) ? date[0] : null,
			date_to : (date) ? date[1] : null
		}
	}

}
