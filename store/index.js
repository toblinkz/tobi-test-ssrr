export const getters = {

				getCampaignCreatedDate(state){
						return state.campaign_report_created;
				},
				getPhoneBookId(state){
						return state.phone_book_id;
				},
			getBulkSmsId(state){
					return state.bulk_sms_id;
			},
			getSuccessfulPaymentUrl(state){
					return state.successful_payment_url;
			},
		getViewVerifyPage(state){
				return state.view_verify_page;
		},
	getFirstName(state){
				return state.first_name;
	}
}

	export const state = () => ({
			phone_book_id:'',
			bulk_sms_id:'',
			campaign_report_created: '',
			successful_payment_url: '',
			view_verify_page: 'false',
			first_name: '',
			L_I : false
	});

export const mutations = {

  setPhoneBookId(state, phonebook_id){
    state.phone_book_id = phonebook_id;
  },
	setBulkSmsId(state, bulk_sms_id){
  	state.bulk_sms_id = bulk_sms_id;
	},
  setViewVerificationPage(state, verify_state){
      state.view_verify_page = verify_state;
  },
  setCampaignCreatedDate(state, date){
    state.campaign_report_created = date;
  },
		setSuccessfulPaymentUrl(state, url){
				state.successful_payment_url = url;
		},
		setFirstName(state, first_name){
				state.first_name = first_name;
		},
		setLIState(state, LI_state){
				state.L_I = LI_state;
		}
}
