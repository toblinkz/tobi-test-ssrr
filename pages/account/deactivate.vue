<template>
	<div>
		<SettingsTabHeader
			:titleIcon="'icon-profile'"
			:titleText="'Deactivate your Account'"
			:body="'Thinking about leaving us, We make it super easy! Simply fill the forms\n'+
										'below and you will be on your way!'"
			:tabImage="'/images/customers.gif'"
		/>

		<ApiNavbar />

		<main id="wrapper" class="content-container">
						<div v-if="canDeactivateAccount" class="col-md-9">
							<b class="mb-20 mt-10">*Help us understand why you want to leave. We will use your feedback to get better.</b>
							<textarea rows="8" cols="100" v-model="userFeedback" name="feedback" ></textarea>
							<div class="mt-30">
								<button v-if="canDeactivateAccount"  @click="showModal" class="btn btn-primary" :disabled="isDisabled">Deactivate Account</button>
							</div>
						</div>
				</main>

		<VerificationModal />
		<UpdateCompanyNameModal />
		<AccountPassword
			event-name="deactivate_account"
			:feedback="userFeedback"
		/>
	</div>
</template>

<script>
    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import ApiNavbar from "../../components/general/navbar/ApiNavbar";
    import Swal from "sweetalert2";
				import VerificationModal from "~/components/modals/VerificationModal";
				import AccountPassword from "../../components/modals/AccountPassword";
				import UpdateCompanyNameModal from "../../components/index/modals/UpdateCompanyNameModal";
				import SettingsTabHeader from "@/components/settings/SettingsTabHeader";
    export default {
						name: "deactivate",
      components: {
							SettingsTabHeader,
							UpdateCompanyNameModal,
							AccountPassword,
							VerificationModal,
							ApiNavbar,
							DashboardNavbar,
							Sidebar
						},
					middleware: ['auth', 'permission'],
      data(){
          return{
            userFeedback: '',
            hasFeedbackError: false,
            errorMessage:[],
											 customerPermissions: localStorage.getItem('permissions'),
          }
      },
      computed:{
        isDisabled: function () {
          return(this.userFeedback === '' || this.hasFeedbackError);
        },
								canDeactivateAccount(){
									return (this.customerPermissions.includes("deactivate_account"));
								},
      },
      watch:{
        userFeedback(value){
          this.userFeedback = value;
          this.validateFeedback(value);
        }
      },
      methods:{
							showModal(){
								this.$modal.show('account-password-modal');
							},
          async deactivateUserAccount(){
            try{
              await this.$axios.$post('user/deactivate/account', {
                feedback: this.userFeedback,
                password: this.user_password
              });
              await Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'We are sorry to see you leave.',
              });
													await this.$axios.$get('auth/logout');
													localStorage.clear();
													await this.$router.push({name: 'login'});
													this.$store.commit('setViewVerificationPage', 'false');
													location.reload();

            }catch (e) {
              if (e.response.data.data === 'Incorrect Password Entered'){
                this.errorMessage['password'] = 'Incorrect Password Entered';
                this.hasPasswordError = true;
              }

            }
          },
        validateFeedback(value){
          if ( value === ""){
            this.errorMessage['feedback'] = 'The Feedback field is required';
            this.hasPasswordError = true;
          }else {
            this.errorMessage['feedback'] = '';
            this.hasFeedbackError = false;
          }
        }
      },
      mounted() {
							if(this.$store.state.view_verify_page === 'true'){
								this.$modal.show('verification-id-modal');
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

  h3 {
    text-transform: uppercase;
    display: inline-block;
    letter-spacing: 0.02em;
    font-size: 15px;
    font-weight: 600;
    margin: 0;
    padding: 0;
    line-height: normal;overflow: hidden;text-overflow: ellipsis;-webkit-text-stroke: 0px
  grey;filter: alpha(opacity=40);-webkit-transition: opacity 0.3s ease;transition: opacity 0.3s ease;
  }
  textarea {
    outline: 0;
    -webkit-appearance: none;
    border: 1px solid rgba(0, 0, 0, 0.07);
  }

  input[type="password"]{
    -webkit-appearance: none;
    border: 1px solid rgba(0, 0, 0, 0.07);
  }
  .btn-primary:hover {
    color: #fff;
    border: 1px solid transparent !important;
  }

</style>
