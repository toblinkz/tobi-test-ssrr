<template>
	<div class="container-fluid body">
		<div id="msb" class="col-md-2">
			<Sidebar class="hidden-xs"></Sidebar>
		</div>
		<div class="col-md-10">
			<DashboardNavbar></DashboardNavbar>
			<!-- Page header -->
			<div class="page-header">
				<div class="page-header-content">
					<!-- Page container -->
					<div class="page-container">
						<!-- Page content -->
						<div >
							<!-- Main content -->
							<div>
								<!-- START JUMBOTRON -->
								<div class="jumbotron" data-pages="parallax">
									<div class="container-fluid container-fixed-lg">
										<div class="inner">
											<div class="row m-t-60">
												<div class="col-md-8">
													<h3> </h3>
													<p><i class="icon-mail-read"></i> Email Notification</p>
													<p class="insight">
														You can add one or more email address to receive system triggered notifications like <br> new invoices, low balance notification, subscription expiry <br> or scheduled application maintenance.
													</p>
												</div>
												<div class="col-md-4 hidden-xs">
													<img src="/images/api-doc.gif" class="wide">
												</div>
											</div>
											<center>
												<div class="item-height"></div>
											</center>
										</div>
										<!-- Page container -->
										<div class="page-container mt-30">
											<!-- Page content -->
											<div class="page-content">
												<!-- main inner content -->
												<main id="wrapper" class="wrapper">
													<ApiNavbar></ApiNavbar>
													<div>
														<div  style="display:flex; justify-content: space-between; padding: 0px 25px">
															<p><b>Added Emails</b></p>
															<a v-if="canUpdateEmailNotificationSettings" @click="showInputField" style="font-weight: bold">+ <span style="margin-left: 3px">Add new</span></a>
														</div>
														<div class=" mt-40 hidden-xs" style="display: flex">
															<span  style="width: 40% ;font-size: 15px"><i class="fa fa-circle m-r-10 m-l-30"></i>Email Address</span>
															<span  style="width:30%; font-size: 15px; margin-left: 40px">Categories</span>
															<span style="width:30%; font-size: 15px;margin-left: 20px"><span style="float: right;margin-right: 70px">Action</span></span>
														</div>
														<div  class="col-md-12 mt-20">
															<div class="m-l-10 " style="border-bottom: dotted #ddd!important;"></div>
															<div v-for="(row, index ) in emails">
																<email-card :email="row.email" :categories="row.categories" @deletedEmail="deletedEmail($event)" @updateEmail="updateEmail($event)" @categories="showCategories($event)"></email-card>
															</div>
														</div>
													</div>
													<div>

													</div>
												</main>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<VerificationModal></VerificationModal>
				<AddNewEmailModal @addedEmail="addNewEmail($event)"></AddNewEmailModal>
				<update-email-notification-modal  @addedEmail="addNewEmail($event)"  :email_address="email_address" :selected_email_categories="email_categories" ></update-email-notification-modal>
			</div>
		</div>
	</div>
</template>

<script>
import Sidebar from "@/components/general/Sidebar";
import DashboardNavbar from "@/components/general/navbar/DashboardNavbar";
import VerificationModal from "@/components/modals/VerificationModal";
import ApiNavbar from "@/components/general/navbar/ApiNavbar";
import EmailCard from "@/components/general/EmailCard";
import AddNewEmailModal from "@/components/modals/AddNewEmailModal";
import UpdateEmailNotificationModal from "@/components/modals/UpdateEmailNotificationModal";
export default {
	name: "notification",
	middleware: ['auth', 'inactive_user', 'permission'],
	components: {
		UpdateEmailNotificationModal,
		AddNewEmailModal, EmailCard, ApiNavbar, VerificationModal, DashboardNavbar, Sidebar},
	data(){
		return{

			emails: [],
			email_address:'',
			selected_categories: [],
			old_password:'',
			new_password:'',
			new_email:{},
			show_input_field: false,
			confirm_password:'',
			isLoading: false,
			showIcon: false,
			button_text: 'Change',
			isOldPasswordToggled: false,
			isNewPasswordToggled: false,
			isConfirmPasswordToggled: false,
			error_message:[],
			hasOldPasswordError: false,
			hasConfirmPasswordError: false,
			hasNewPasswordError: false,
			old_type: "password",
			new_type: "password",
			confirm_type: "password",
			email_categories:[],
			customer_permissions: localStorage.getItem('permissions'),

		}
	},
	computed: {
		isDisabled: function (){
			return ( !this.new_password || !this.old_password || !this.confirm_password || this.hasOldPasswordError
				|| this.hasNewPasswordError || this.hasConfirmPasswordError)
		},
		canUpdateEmailNotificationSettings(){
			return (this.customer_permissions.includes("update_email_notification_settings"));
		},
	},
	watch: {
		old_password(value){
			this.validateOldPassword(value);
		},
		new_password(value){
			this.validateNewPassword(value);
		},
		confirm_password(value){
			this.validateConfirmPassword(value);
		}
	},
	methods:{
		showInputField(){
			this.$modal.show('add-new-email');
		},
		async getNotificationEmails(){
			let data = await this.$axios.$get('user/notification/email');
			this.emails = data.data;
		},
		addNewEmail(){
			this.getNotificationEmails();

		},

		deletedEmail(event){
			this.getNotificationEmails();
		},
		updateEmail(event){
			this.$modal.show('update-email-notification-modal')
   this.email_address = event;
		},
		showCategories(event){
			 this.email_categories = event;
		}


	},
	mounted() {
		this.getNotificationEmails()
	}
}
</script>

<style scoped>

.email-form-control {
	display: block;
	width: 100%;
	border: 1px solid rgba(204, 204, 204, 0.34);
	height: 40px;
	padding: 10px 16px;
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
.email-form-control:focus {
	border-color: #4DB6AC;
	box-shadow: none;
	outline: 0;
}
input[type="text"], input[type="password"]{
	-webkit-appearance: none;
	border: 1px solid rgba(0, 0, 0, 0.07);
}
.form-group i.password-visibility{
	height: 16px;
	cursor: pointer;
	fill: #0a2e65;
	top: 15px;
	width: 16px;
	opacity: 1;
	position: absolute;
	right: 16px;
}
</style>
