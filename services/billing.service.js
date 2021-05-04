export class BillingService {

	constructor(axios) {

		this.$axios = axios
	}
	async getBalance(){
		return await this.$axios.$get('billing/wallet');
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

	async getNubanAccount(){
		let customer_country = JSON.parse(localStorage.getItem('user_data')).country;
		if (customer_country  === "Nigeria"){
			return  this.$axios.get('billing/dedicated-nuban');
		}

	}

	async getPaymentMethod(){
		return this.$axios.$get('billing/payment-method', {headers: {'Authorization':  `Bearer ${localStorage.getItem('local')}`}});
	}

	async getExchangeRate(amount){
		 return this.$axios.$get('billing/exchange-rate', {params: {
		 	  amount: amount
			 }});
	}

	async getBundledTopUpData(){
		 return this.$axios.$get('billing/top-up/plans');
	}



}
