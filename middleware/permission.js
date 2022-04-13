export default function ({ app,}) {

	app.router.beforeEach((to, from, next) => {
		 if (!hasAccess(to.name)){
				$nuxt.$router.push({ name: 'index', });
				$nuxt.$modal.show('page-denied-modal')
			}else {
		 	 next();
			}
	});

}

function hasAccess(route_name){
	let permissions_data =  JSON.parse(localStorage.getItem('user_data')).permissions;

	 let customer_permissions = [];
	 permissions_data.forEach((permission) =>{
	 	  customer_permissions.push(permission.name);
		});

	switch (route_name){

		case "index":
			 return true;
		case "billing-fund":
			return customer_permissions.includes('top_up_wallet');
		case "invoices-all":
			return customer_permissions.includes('view_invoice');
		case "invoices-view-id":
			return customer_permissions.includes('view_invoice');
		case "tokens-overview":
			return customer_permissions.includes('view_invoice');
		case "tokens-logs":
			return customer_permissions.includes('view_invoice');
		case "invoices-iprint-id":
			return customer_permissions.includes('view_invoice');
		case "billing-transactions-history":
			return customer_permissions.includes('view_wallet_history');
		case "billing-balance-limit":
			return customer_permissions.includes('view_balance_limit');
		case "sms-sender-id-management":
			return customer_permissions.includes('view_sender_id');
		case "devices":
			return customer_permissions.includes('view_devices');
		case "device-id-subscriptions":
			return customer_permissions.includes('view_devices');
		case "my-number":
			return customer_permissions.includes('view_numbers');
		case "number-id-subscriptions":
			return customer_permissions.includes('manage_a_number');
		case "phone-book":
			return customer_permissions.includes('view_phonebooks');
		case "view-contact-id":
			return customer_permissions.includes('view_contact');
		case "edit-contact-id":
			return customer_permissions.includes('edit_contact');
		case "add-contact-id":
			return customer_permissions.includes('add_contact');
		case "sms-import-contacts":
			return customer_permissions.includes('import_contacts');
		case "message-select-type":
			return customer_permissions.includes('send_message');
		case "sms-quick-sms":
			return customer_permissions.includes('send_message');
		case "sms-group-sms":
			return customer_permissions.includes('send_message');
		case "sms-history":
			return customer_permissions.includes('view_delivery_report');
		case "sms-campaign-reports":
			return customer_permissions.includes('view_delivery_report');
		case "sms-insights":
			return customer_permissions.includes('view_delivery_report');
		case "sms-campaign-history-id":
			return customer_permissions.includes('view_delivery_report');
		case "account-api":
			return customer_permissions.includes('view_api_key');
		case "account-profile":
			return customer_permissions.includes('view_profile');
		case "account-deactivate":
			return customer_permissions.includes('deactivate_account');
		case "account-notification":
			return customer_permissions.includes('view_email_notification_settings');
		case "account-change-password":
			return customer_permissions.includes('change_password');
		case "account-webhook-config":
			return customer_permissions.includes('view_webhook_config');
		case "account-kyc":
			return customer_permissions.includes('view_webhook_config');
		case "sms-countries":
			return customer_permissions.includes('view_active_country_route');
		case "sandbox":
			return customer_permissions.includes('view_sandbox');
		case "sandbox-voice-otp":
			return customer_permissions.includes('view_sandbox');
		case "sandbox-sms":
			return customer_permissions.includes('view_sandbox');
		case "teams":
			return (JSON.parse(localStorage.getItem('user_data')).is_main) ;
		default:
			break;


	}
}
