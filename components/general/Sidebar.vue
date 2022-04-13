<template>
			<nav class="nav-container">
      <div  class="nav-header">
								<nuxt-link to="/">
									<img src="/images/logo.png" class="termii-logo" width="120"/>
								</nuxt-link>
							<div>
								<img :src="imageUrl" class="circular-image"/>
							</div>
						</div>
			  	<p v-if="!show_company_name" class="company-name">{{company_name}}</p>
				  <p v-if="isAdmin && show_company_name" class="company-name mt-10 " style="color: #d3d3d3; cursor:pointer" @click="showUpdateCompanyNameModal"><i class="entypo-plus"></i>Company Name <span class="badge badge-sm badge-sidebar">New</span></p>
							<SidebarItem item-name="Wallet" icon-name="entypo-cc" :has-menu-item=true :is-main-item=true route-name="/">
										<template v-slot:caret-icon >
											<i class="caret"></i>
										</template>
										<template v-slot:sidebar-item-menu>
											<li v-if="canTopUp"><nuxt-link to="/billing/fund"><i class="entypo-credit-card"></i> Top Up</nuxt-link></li>
											<li v-if="canViewWalletHistory"><nuxt-link to="/billing/transactions/history" ><i class="entypo-flow-tree"></i> History</nuxt-link></li>
											<li v-if="canAccessInvoice">
												<nuxt-link to="/invoices/all">
													<i class="entypo-basket"></i> Invoice
												</nuxt-link>
											</li>
											<li v-if="canAccessBalanceLimit"><nuxt-link to="/billing/balance-limit"><i class="entypo-key"></i> Alert <span class="badge badge-sm badge-sidebar">New</span></nuxt-link></li>
											<li><nuxt-link to="/billing/wallet-notification" ><i class="entypo-list-add"></i>Balance Notification</nuxt-link></li>
										</template>
							</SidebarItem>

				 <div  id="sidebarScroll" style="overflow-y: auto;">
						<SidebarProductItem item-name="Switch" icon-name="entypo-switch" :product-number = 1>
								<template v-slot:menu-item>
									<li v-if="canViewSenderId"><nuxt-link to="/sms/sender-id-management"><i class="entypo-list m-r-10"></i>SMS Sender IDs</nuxt-link></li>
									<li v-if="canViewDevices"><nuxt-link to="/devices"><i class="fa fa-barcode m-r-15 "></i>WhatsApp Devices</nuxt-link></li>
									<li v-if="canViewNumbers"><nuxt-link to="/my-number"><i class="fa fa-tty m-r-15"></i>Numbers</nuxt-link></li>
									<li v-if="canViewContacts"><nuxt-link to="/phone-book"><i class="entypo-user-add m-r-10"></i>Contacts</nuxt-link></li>
									<li v-if="canComposeMessage"><nuxt-link to="/message/select-type"><i class="entypo-paper-plane m-r-10"></i>Send Messages</nuxt-link></li>
								</template>
						</SidebarProductItem>

						<SidebarProductItem item-name="Tokens" icon-name="entypo-shareable" :product-number = 2>
							<template v-slot:menu-item>
<!--								<li><nuxt-link to="/tokens/overview"><i class="entypo-layout m-r-10 "></i>Overview</nuxt-link></li>-->
<!--								<li><nuxt-link to="/tokens/logs"><i class="fa fa-tty m-r-15"></i>Logs</nuxt-link></li>-->
								<li><a href="https://developers.termii.com/token" target="_blank"><i class="entypo-users m-r-10"></i>Api Documentation</a></li>
							</template>
						</SidebarProductItem>

						<SidebarProductItem v-if="canViewDeliveryReport" item-name="Insight" icon-name="entypo-light-up" :product-number = 3>
							<template v-slot:menu-item>
								<li><nuxt-link to="/sms/insights"><i class="entypo-layout m-r-10 "></i>Overview</nuxt-link></li>
								<li><nuxt-link to="/sms/history"><i class="entypo-chart-area m-r-10"></i>Message Report</nuxt-link></li>
								<li><nuxt-link to="/sms/campaign-reports"><i class="entypo-chart-pie m-r-10"></i>Campaign Report</nuxt-link></li>
							</template>
						</SidebarProductItem>

						<hr class="mb-10 mt-10">

						<SidebarItem v-if="canViewSandbox" item-name="Sandbox" icon-name="icon-gift" :has-menu-item=false :is-main-item=false route-name="/sandbox">
							<template v-slot:caret-icon >
								 <span class="badge badge-sm badge-sidebar">New</span>
							</template>
						</SidebarItem>

						<SidebarItem v-if="canViewCountryRoutes" item-name="Countries" icon-name="entypo-globe" :has-menu-item=false :is-main-item=false route-name="/sms/countries">
								<template v-slot:caret-icon >
									<span class="badge badge-sm badge-sidebar">New</span>
								</template>
						</SidebarItem>

						<SidebarProductItem v-if="canViewDevelopersSettings" item-name="Developers" icon-name="entypo-code" :product-number = 5>
							<template v-slot:menu-item>
								<li v-if="canViewDevelopersSettings"><a href="https://developers.termii.com" target="_blank" ><i class="entypo-docs m-r-10"></i> API Guide</a></li>
								<li v-if="canViewApiConsole"><nuxt-link to="/account/api"><i class="entypo-key m-r-10"></i> API console</nuxt-link></li>
								<li><a href="https://join.slack.com/t/termii-loop/shared_invite/zt-imbqlf68-w4lsPkOzibBXSQohu8_8dQ" target="_blank"><i class="entypo-users m-r-10"></i> Community</a></li>
							</template>
						</SidebarProductItem>

						<SidebarProductItem v-if="canViewSettings" item-name="Settings" icon-name="entypo-cog" :product-number = 6>
							<template v-slot:menu-item>
								<li><nuxt-link to="/account/profile"><i class="icon-user m-r-10"></i>Profile</nuxt-link></li>
								<li><nuxt-link to="/teams"><i class="entypo-user-add m-r-10"></i>Teams</nuxt-link></li>
								<li><nuxt-link to="/account/api"><i class="icon-key m-r-10"></i>API Token</nuxt-link></li>
								<li><nuxt-link to="/account/webhook/config"><i class="entypo-tools m-r-10"></i>Webhook Config</nuxt-link></li>
							</template>
						</SidebarProductItem>

					</div>
			</nav>
</template>

<script>
    import Dropdown from "./dropdown/Dropdown";
    import {mapGetters} from "vuex";
				import SidebarItem from "@/components/general/SidebarItem";
				import SidebarProductItem from "@/components/general/SidebarProductItem";
    export default {
        name: "sidebar",
        components: {SidebarProductItem, SidebarItem, Dropdown},
				  	data(){
        	return{
													show_drop_down: true,
													imageUrl: '',
										   permission_data : [],
										   customer_permissions:[],
										   company_name:JSON.parse(localStorage.getItem('user_data')).company.name,
										   show_company_name: true,
										   customer_data: [],
										   isAdmin: JSON.parse(localStorage.getItem('user_data')).is_main,
									}
					},
      computed: {
        	menu:{
        		 get(){
        		 	 return this.$store.state.menu.open
											},
										set (val) {
											this.$store.commit('menu/toggle', val)
										}
									},
							isDisabled: function (){
        	return(!this.show_drop_down)
							},
							canAccessWallet(){
								return (this.customer_permissions.includes("top_up _wallet") || this.customer_permissions.includes("view_invoice") ||
									this.customer_permissions.includes("view_wallet_history")||  this.customer_permissions.includes("view_balance_limit"));
							},
							canTopUp(){
								return (this.customer_permissions.includes("top_up_wallet"));
							},
							canAccessBalanceLimit(){
								return (this.customer_permissions.includes("view_balance_limit"));
							},
							canAccessInvoice(){
								return (this.customer_permissions.includes("view_invoice"));
							},
							canViewWalletHistory(){
								return (this.customer_permissions.includes("view_wallet_history"));
							},
							canViewSenderId(){
								return (this.customer_permissions.includes("view_sender_id"));
							},
							canViewDevices(){
								return (this.customer_permissions.includes("view_devices"));
							},
							canViewNumbers(){
								return (this.customer_permissions.includes("view_numbers"));
							},
							canManageContacts(){
								return (this.customer_permissions.includes("view_phonebooks") || this.customer_permissions.includes("import_contacts"));
							},
							canViewContacts(){
								return (this.customer_permissions.includes("view_phonebooks"));
							},
							canImportContacts(){
								return (this.customer_permissions.includes("import_contacts"));
							},
							canComposeMessage(){
								return (this.customer_permissions.includes("send_message"));
							},
							canViewDeliveryReport(){
								return (this.customer_permissions.includes("view_delivery_report"));
							},
							canViewDevelopersSettings(){
								return (this.customer_permissions.includes("view_developer_settings_section"));
							},
							canViewApiConsole(){
								return (this.customer_permissions.includes("view_api_key"));
							},
							canViewSettings(){
								return (this.customer_permissions.includes("view_profile"));
							},
							canViewSandbox(){
										return (this.customer_permissions.includes('view_sandbox'));
							},
							canViewCountryRoutes(){
										return (this.customer_permissions.includes('view_active_country_route'));
							}
      },
					methods:{
						getUserPermissions(){
							this.permissions_data = this.customer_data.permissions;
							this.permissions_data.forEach((permission) => {
								this.customer_permissions.push(permission.name);
							});
						},

						checkIfCompanyNameIsAnEmailAddress(){
							let email_address = JSON.parse(localStorage.getItem('user_data')).company.name;
							return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_address));
						},
						showUpdateCompanyNameModal(){
							this.$modal.show('update-company-name-modal');
						},

						handleScroll (e){
							if (e.target.classList.contains("on-scrollbar") === false) {
								e.target.classList.add("on-scrollbar");
							}
						}

					},
				async mounted() {
					this.customer_data = JSON.parse(localStorage.getItem('user_data'));
					if(this.$store.state.view_verify_page === 'true'){
						this.imageUrl = 'https://termii.s3-us-west-1.amazonaws.com/upload/images/sBBQZhMRRLWpKP5hjTR7BZ.jpeg';
					}else{
						this.getUserPermissions();
						if (this.customer_data.active_status_id.id ===  6){
							this.show_drop_down = false;
						}
						this.imageUrl = this.customer_data.image || 'https://termii.s3-us-west-1.amazonaws.com/upload/images/sBBQZhMRRLWpKP5hjTR7BZ.jpeg';
      this.show_company_name = this.checkIfCompanyNameIsAnEmailAddress();
					}
				 }


				}

</script>

<style scoped>

.nav-container{
	display: flex;
	flex-direction: column;
	position: fixed;
	height: 100%;
	background-color: #011b33;
	width: inherit;
}
.nav-header{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.termii-logo{
	margin: 2em 1em 2em 1em;
}
.circular-image{
	border-radius: 50%;
	width: 3.5em;
}
.company-name{
	text-align: center;
	font-size: 1.4rem;
	color:rgb(211, 211, 211);
	margin: 1em;
}
.caret{
	font-style: normal;
	font-weight: 400;
	border: 0;
	width: auto;
	height: auto;
	text-align: center;
	margin: -1px 0 0;
	margin-left: 5px;
}
li > a:hover, .nav > li > a:focus {
	text-decoration: none;
	background-color: #fff;
	color: #777 !important;
}
.caret:after {
	font-size: 18px;
	font-weight: 800;
	content: "\e9c5";
	font-family: "icomoon";
	display: block;
	font-size: 16px;
	line-height: 1;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.caret{
	margin-top: 3px;
	display: inline-block;
	vertical-align: middle;
}
.badge-sidebar{
	background: 0 0;
	border: 1px solid #08a4da;
	color: #08a4da !important;
	margin-left: 3px;
	margin-top: -2px;
}
.badge{
	display: inline-block;
	min-width: 10px;
	padding: 1px 5px;
	font-size: 12px;
	color: #08a4da;
	border-radius: 10px;
}
hr{
	border-color: rgba(28,60,90,.50196);
	width: 100%;
}

::-webkit-scrollbar {
	width: 3px;
	height: 3px;
}
::-webkit-scrollbar-thumb {
	background: #e4e4e4;
	border-radius: 3px;
}



</style>
