<template>
	<div>
		<SettingsTabHeader
			:titleIcon="'icon-profile'"
			:titleText="'Your Webhook'"
			:body="'We have given you the power to integrate your application with our system.\n'+
										'Use your webhook url to receive status of your messages.'"
			:tabImage="'/images/api-doc.gif'"
		/>

		<ApiNavbar />

		<main id="wrapper" class="content-container">
					<form @submit.prevent="updateWebhook" method="POST" >
						<div class="row">
							<div class="col-md-5">
								<label>Webhook URL</label>
								<div class="form-group control-text">

									<input
										id="live_webhook" placeholder="Webhook URL"
										v-model="webhook"
										type="text"
										name="live_webhook"
										class="form-control "
										:class="{'error': hasWebhookError}"
									>
									<span class=" error_field_message" v-if="errorMessage.webhook">{{errorMessage.webhook}}</span>
								</div>
								<button class="btn bg-teal pull-right" type="submit" :disabled="isDisabled"><i class="icon-check"></i> Save</button>
							</div>
						</div>
					</form>
				</main>

		<VerificationModal />
		<UpdateCompanyNameModal />
	</div>
</template>

<script>
    import Sidebar from "../../../components/general/Sidebar";
    import DashboardNavbar from "../../../components/general/navbar/DashboardNavbar";
    import ApiNavbar from "../../../components/general/navbar/ApiNavbar";
    import Swal from "sweetalert2";
				import VerificationModal from "~/components/modals/VerificationModal";
				import UpdateCompanyNameModal from "../../../components/index/modals/UpdateCompanyNameModal";
				import SettingsTabHeader from "@/components/settings/SettingsTabHeader";
    export default {
        name: "config",
      components: {SettingsTabHeader, UpdateCompanyNameModal, VerificationModal, ApiNavbar, DashboardNavbar, Sidebar},
					 middleware: ['auth', 'inactive_user'],
      data(){
          return {
            webhook: '',
            errorMessage: [],
            hasWebhookError: false,
          }
      },
					watch:{
       webhook(value){
       	this.validateWebhookUrl(value);
							}
					},
      computed:{
          isDisabled: function () {
              return( this.hasWebhookError )
          }
      },
      methods: {
          async updateWebhook(){
            try {
              await this.$axios.$patch('user/webhook', {
                live_webhook: this.webhook,
              });
              await Swal.fire({
                icon: 'success',
                text: 'Webhook Updated Successfully',

              });
            }catch (e) {
														this.$toast.error(e.response.data.message);
            }
          },
							validateWebhookUrl(value){
          	if (/^(ftp|http|https):\/\/[^ "]+$/.test(value) || !value){
												this.hasWebhookError = false;
												this.errorMessage['webhook'] = '';
											}else{
												this.hasWebhookError = true;
												this.errorMessage['webhook'] = 'The webhook format is invalid.';
											}
							}
      },
					mounted() {
						if(this.$store.state.view_verify_page === 'true'){
							this.$modal.show('verification-id-modal');
						}else {
							let user_data = JSON.parse(localStorage.getItem('user_data'));
							 this.webhook = user_data.customer.live_webhook_url;
						}
					}
				}
</script>

<style scoped>

.content-container {
	margin: 0 auto;
	padding: 0;
	width: 1000px;
}

  label {
    margin-bottom: 6px;
    display: inline-block;
  }
  .form-group {
    margin-bottom: 20px;
    position: relative;
  }

  .form-control {
    display: block;
    width: 100%;
    height: 36px;
    padding: 7px 12px;
    font-size: 13px;
    border-radius: 5px;
    font-weight: 500;
    box-shadow: none;
    line-height: 1.5384616;
    color: #333333;
    background-color: #fff;
    background-image: none;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }
  input[type="text"]{
    border: 1px solid rgba(0, 0, 0, 0.07);
  }
  .form-control:focus {
    border-color: #4DB6AC;
    box-shadow: none;
    outline: 0;
  }
  .bg-teal {
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    color: #fff !important;
    border: none;
    padding-left: 19px;
    padding-right: 19px;
  }
  input::placeholder {
    color: #999;
    font-size: 12px;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid rgba(221, 221, 221, 0.15);
  }

</style>
