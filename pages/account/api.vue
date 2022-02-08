<template>
	<div>
		<SettingsTabHeader
			:titleIcon="'icon-profile'"
			:titleText="'Your API Keys'"
			:body="'We have given you the power to build awesome apps that can integrate\n'+
										'with our system but we only ask that you repay us the favour by keeping\n'+
										'your passkeys secure and private.'"
			:tabImage="'/images/api-doc.gif'"
		/>

		<ApiNavbar />

		<div class="content-container">
				<div class="col-md-6">
					<!-- START PANEL -->
					<p class="text-semibold"><i class="fa fa-certificate" style="color: #079805 !important;"></i> API Key</p>
					<div class="alert toke wd">
						<button class="clipboard-style"  v-clipboard:copy="api_key">
							<img src="/images/copy.svg"/>
						</button>
						<p class="insight" style="color: #595959 !important;">{{api_key}}</p> </div>
					<form>
						<br>
						<button v-if="canRenewApiKey" class="btn btn-primary btn-cons" @click="showModal">
							<i class="fa fa-certificate" v-show="showIcon"></i>
							Renew API key
						</button>
					</form>
					<!-- END PANEL -->
				</div>
				<div class="col-md-6">
					<!-- START PANEL -->
					<p class="text-semibold"><i class="fa fa-certificate" style="color: #079805 !important;"></i> Secret Key</p>
					<div class="alert toke wd">
						<button class="clipboard-style"  v-clipboard:copy="secretKey">
							<img src="/images/copy.svg"/>
						</button>
						<p class="insight" style="color: #595959 !important;">{{secretKey}}</p> </div>
					<form>
						<br>
					</form>
					<!-- END PANEL -->
				</div>
		</div>

		<VerificationModal />
		<UpdateCompanyNameModal />
		<AccountPassword
			event-name="api_token"
			@set_api_key="setApiKey($event)"
		/>
	</div>
</template>

<script>
    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import Main from "../../components/landing_page/MainContent";
    import ApiNavbar from "../../components/general/navbar/ApiNavbar";
    import VueClipboard from "vue-clipboard2";
    import Swal from 'sweetalert2';
    import {mapGetters} from "vuex";
				import VerificationModal from "~/components/modals/VerificationModal";
				import AccountPassword from "../../components/modals/AccountPassword";
				import UpdateCompanyNameModal from "../../components/index/modals/UpdateCompanyNameModal";
				import SettingsTabHeader from "@/components/settings/SettingsTabHeader";

    export default {
					 name: "api",
      components: {
							SettingsTabHeader,
							UpdateCompanyNameModal,
							AccountPassword, VerificationModal, ApiNavbar, Main, DashboardNavbar, Sidebar, VueClipboard },
					 middleware: ['auth', 'inactive_user', 'permission'],
      data(){
        return{
        	password:'',
									button_text:' Renew API key',
									isLoading: false,
									showIcon: true,
									api_key: '',
									secretKey:'',
									errorMessage:[],
									customerPermissions: localStorage.getItem('permissions'),
									hasPasswordError: false,
									type: "password",
									isToggled: false,
        }
      },
      computed: {
							isDisabled: function () {
								return (this.hasPasswordError || this.password === '');
							},
							canRenewApiKey(){
								return (this.customerPermissions.includes("renew_api_key"));
							},
      },
					watch:{
       password(value){
       		this.validatePassword(value);
							}
					},
      methods: {
							showModal(){
								this.$modal.show('account-password-modal');
							},
							validatePassword(value){
								if (value.length < 6) {
									this.errorMessage['password'] = 'The password field must be at least 5 characters';
									this.hasPasswordError = true;
								}else {
									this.errorMessage['password'] = '';
									this.hasPasswordError = false;
								}
							},
							showPassword(){
								if (this.type === "password") {
									this.type = 'text';
									this.isToggled = true;
								}
								else {
									this.type = "password";
									this.isToggled = false;
								}
							},
							setApiKey(api_key){
								this.api_key = api_key;
							}
      },
					mounted() {
						this.api_key = 	JSON.parse(localStorage.getItem('user_data')).customer.live_api_key;
						this.secretKey = 	JSON.parse(localStorage.getItem('user_data')).customer.secret_key;
					}

    }
</script>

<style scoped>
  .clipboard-style{
    position: absolute;
    right: 4px;
    top: 4px;
    cursor: pointer;
    border: 1px solid transparent;
    background-color: transparent;
  }

  .content-container {
			margin: 0 auto;
			padding: 0;
			width: 1000px;
  }

  .toke {
    background-color: #f5f5f5;
    border-color: #efefef;
    color: #595959 !important;
  }
  .alert {
    position: relative;
    padding: 20px 20px 5px 20px;
    /* margin-bottom: 20px; */
    border: 1px solid transparent;
  }
  .wd {
    border-radius: 5px;
    word-wrap: break-word;
  }

		.btn:hover {
			background-color: #fafafa;
			border: 1px solid rgba(98, 98, 98, 0.27);
		}
  .insight {
    font-size: 13.5px !important;
    letter-spacing: normal !important;
    font-weight: 400 !important;
    line-height: 20px !important;
    margin: 0px 0px 10px 0px;
    font-style: normal;
    white-space: normal;
    color: #333333;
     -webkit-margin-before: 1em;
     -webkit-margin-after: 1em;
     -webkit-margin-start: 0px;
     -webkit-margin-end: 0px;
     display: block;
  }
</style>
