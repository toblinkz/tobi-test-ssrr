<template>
	<div>
		<SettingsTabHeader
			:titleIcon="'icon-mail-read'"
			:titleText="'Email Notification'"
			:body="'You can add one or more email address to receive system triggered notifications like\n'+
										'new invoices, low balance notification, subscription expiry\n'+
										'or scheduled application maintenance.'"
			:tabImage="'/images/api-doc.gif'"
		/>

		<ApiNavbar />

		<div class="content-container">
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

		<VerificationModal />
		<UpdateCompanyNameModal />
		<AddNewEmailModal @addedEmail="addNewEmail($event)" />
		<update-email-notification-modal
			@addedEmail="addNewEmail($event)"
			:email-address="emailAddress"
			:selected_email_categories="emailCategories"
		/>
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
import UpdateCompanyNameModal from "../../components/index/modals/UpdateCompanyNameModal";
import SettingsTabHeader from "@/components/settings/SettingsTabHeader";
export default {
	name: "notification",
	middleware: ['auth', 'inactive_user', 'permission'],
	components: {
		SettingsTabHeader,
		UpdateCompanyNameModal,
		UpdateEmailNotificationModal,
		AddNewEmailModal, EmailCard, ApiNavbar, VerificationModal, DashboardNavbar, Sidebar},
	data(){
		return{
			emails: [],
			emailAddress:'',
			selected_categories: [],
			old_password:'',
			new_password:'',
			new_email:{},
			show_input_field: false,
			confirm_password:'',
			isLoading: false,
			showIcon: false,
			button_text: 'Change',
			error_message:[],
			hasOldPasswordError: false,
			hasConfirmPasswordError: false,
			hasNewPasswordError: false,
			emailCategories:[],
			customerPermissions: localStorage.getItem('permissions'),

		}
	},
	computed: {
		isDisabled: function (){
			return ( !this.new_password || !this.old_password || !this.confirm_password || this.hasOldPasswordError
				|| this.hasNewPasswordError || this.hasConfirmPasswordError)
		},
		canUpdateEmailNotificationSettings(){
			return (this.customerPermissions.includes("update_email_notification_settings"));
		},
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
   this.emailAddress = event;
		},
		showCategories(event){
			 this.emailCategories = event;
		}


	},
	mounted() {
		this.getNotificationEmails()
	}
}
</script>

<style scoped>
.content-container {
	margin: 0 auto;
	padding: 0;
	width: 1000px;
}
</style>
