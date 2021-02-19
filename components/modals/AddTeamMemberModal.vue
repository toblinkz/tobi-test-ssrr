<template>

	<!-- Modal -->
	<modal name="add-team-member-modal" height="auto">
		<div   style="display: block; padding-left: 9px;">
			<div>
				<div>
					<div class="modal-header" >
						<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" style="font-weight: bold">Add Teammate</h4>
						<p class="mt-10">Add a new team-mate here</p>
					</div>
						<div class="modal-body">
							<div class="form-group">
								<label>Name</label>
								<input type="text" class="form-control"  placeholder="Name" v-model="name" >
								<span class=" error_field_message" >{{error_message.sender_id}}</span>
								<br>
								<label>Email address</label>
								<input type="text" class="form-control" v-model="email" >
								<span class=" error_field_message" v-if="error_message.email">{{error_message.email}}</span>
								<br>
								<label>Role</label>
								<select class="form-control" v-model="role">
									<option>Developer</option>
									<option>Customer Success</option>
								</select>
								<br>
								<div style="display: flex; justify-content: space-between">
									 <label style="font-size: 16px">Permissions</label>
									 <div style="display: flex">
											select all	<Switches type-bold="true" v-model="select_all" class="m-l-5"  color="blue"></Switches>
										</div>
								</div>
								<div class="mt-20">
									<span  :class="{'selected-pill': billing_selected, 'pill': !billing_selected}" @click="toggleBillingPermission">Billing</span>
									<span :class="{'selected-pill': number_selected, 'pill': !number_selected}" @click="toggleNumberPermission">Numbers</span>
									<span :class="{'selected-pill': contact_selected, 'pill': !contact_selected}" @click="toggleContactPermission">Contacts</span>
									<span :class="{'selected-pill': webhook_selected, 'pill': !webhook_selected}" @click="toggleWebhookPermission">Webhook</span>
									<span :class="{'selected-pill': report_selected, 'pill': !report_selected}" @click="toggleReportPermission">Reports</span>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button @click="addTeamMember" class="btn id-btn-primary"   :disabled="isDisabled">
								<i class="fa fa-plus m-r-5"></i>{{save_button_text}}
								<span v-show="isLoading" >
															<img src="/images/black_spinner.svg" height="20px" width="30px"/>
													</span>
							</button>
						</div>

				</div>
			</div>
		</div>
	</modal>

</template>

<script>
import ButtonSpinner from "../general/ButtonSpinner";
import Switches from 'vue-switches';
import {mapGetters} from "vuex";
export default {
	name: "AddTeamMemberModal",
	middleware:'auth',
	components: {ButtonSpinner, Switches},
	data(){
		return{
			select_all: false,
			name:'',
			email:'',
			role:'',
			permission:[],
			error_message:[],
			error: "",
			isLoading: false,
			save_button_text: 'Add teammate',
			billing_selected: false,
			number_selected: false,
			contact_selected: false,
			webhook_selected: false,
			report_selected: false,
			team_member_info: ''
		}
	},
	computed:{
		isDisabled:function () {
			return (!this.name  || !this.email || !this.role);
		},
 billing_selected(){

	}
	},
	watch: {
			select_all(){
				 if (this.select_all){
				 	 this.billing_selected = true;
				 	 this.number_selected = true;
				 	 this.contact_selected = true;
				 	 this.webhook_selected = true;
				 	 this.report_selected = true;
				 	 this.permission = [];
				 	 this.permission.push('Billing', 'Number', 'Contact', 'Webhook', 'Reports');
					} else {
						this.billing_selected = false;
						this.number_selected = false;
						this.contact_selected = false;
						this.webhook_selected = false;
						this.report_selected = false;
						this.permission = [];
					}
			},


	},
	methods: {
		close() {
			this.$modal.hide('add-team-member-modal');
		},
		toggleBillingPermission(){
			this.billing_selected = !this.billing_selected;
			let index = this.permission.indexOf('Billing');
			this.billing_selected === true ?  this.permission.push('Billing') :this.permission.splice(index, 1);
		},
		toggleNumberPermission(){
			this.number_selected = !this.number_selected;
			let index = this.permission.indexOf('Number');
			this.number_selected === true ?  this.permission.push('Number') :this.permission.splice(index, 1);
		},
		toggleContactPermission(){
			this.contact_selected = !this.contact_selected;
			let index = this.permission.indexOf('Contact');
			this.contact_selected === true ?  this.permission.push('Contact') :this.permission.splice(index, 1);
		},
		toggleWebhookPermission(){
			this.webhook_selected = !this.webhook_selected;
			let index = this.permission.indexOf('Webhook');
			this.webhook_selected === true ?  this.permission.push('Webhook') :this.permission.splice(index, 1);
		},
		toggleReportPermission(){
			 this.report_selected = !this.report_selected;
			let index = this.permission.indexOf('Reports');
			this.report_selected === true ?  this.permission.push('Reports') :this.permission.splice(index, 1);
		},
		validateEmail(email){
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
				this.error_message['email'] = '';
				this.hasEmailError = false;

			}else {
				this.error_message['email'] = 'The email field must be a valid email';
				this.hasEmailError = true;

			}
		},
		addTeamMember(){
			 this.team_member_info = {name: this.name, email: this.email, role: this.role, permissions: this.permission};
			 this.$emit('team-member', this.team_member_info);
			 this.close();
		}

		},
}
</script>

<style scoped>

.pill {
	font-size: 13px;
	padding: 6px 10px;
	margin: 2px 0;
	border-radius: 20px;
	font-weight: 500;
	background: #EAEAEA;
	color: #818181;
	cursor: pointer;
}
.selected-pill{
	cursor: pointer;
	font-size: 13px;
	padding: 6px 10px;
	margin: 2px 0;
	border-radius: 20px;
	font-weight: 500;
	background: #EEF8F4;
	color: #818181;
}
textarea.form-control {
	height: auto;
}
.vm--container{
	display: block;
	overflow-y: auto;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1050;
	-webkit-overflow-scrolling: touch;
	outline: 0;
	background-color: rgba(0, 0, 0, 0.5);
}

.modal-header {
	padding: 20px;
	border-bottom: 1px solid transparent;
}
.modal-header {
	position: relative;
	padding-bottom: 0;
}

.modal-header .close[type=button] {
	background: rgba(255,255,255,0.3);
	width: 25px;
	height: 25px;
	display: block;
	border-radius: 20px;
	color: #000;
	font-weight: bold;
	margin-top: -3px;
	margin-right: -10px;
}
.modal-header .close {
	position: absolute;
	right: 20px;
}
.modal-title {
	margin: 0;
	line-height: 1.5384616;
}
.error_field_message {
	font-size: 1.2rem;
	color: red;
	display: block;
	margin-top: 5px;
}
button.close {
	padding: 0;
	cursor: pointer;
	background: transparent;
	border: 0;
	-webkit-appearance: none;
}
.close {
	font-size: 17px;
	text-shadow: none;
	opacity: 0.6;
	filter: alpha(opacity=60);
	line-height: 1;
}
.close:hover, .close:focus {
	outline: 0;
	opacity: 1;
	color: black;
	filter: alpha(opacity=100);
}
.modal-body {
	padding: 20px 20px 40px 20px;
	position: relative;
}
.form-group {
	margin-bottom: 20px;
	position: relative;
}
.form-group label {
	margin-bottom: 5px;
	display: block;
	font-weight: 600;
	line-height: 24px;
}
label {
	max-width: 100%;
}
.form-control{
	font-size: 13px;
	border-radius: 5px;
	border: 1px solid rgba(204, 204, 204, 0.34);
	font-weight: 500;
	box-shadow: none;
	display: block;
	width: 100%;
	height: 36px;
	padding: 7px 12px;
	line-height: 1.5384616;
	color: #333333;
	background-color: #fff;
	background-image: none;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.form-control:hover {
	border-color: #aaa;
}
.form-control:focus {
	border-color: #4DB6AC;
	outline: none;
}
.btn-danger {
	color: #fff;
	background-color: #F44336;
	border-color: #F44336;
}
input[type=text].error {
	border-color: red!important;
}
input {
	font: inherit;
}
strong {
	font-weight: 600;
}
.modal-footer {
	padding: 20px;
	text-align: right;
	border-top: 1px solid transparent;
}

.btn-default {
	color: #333;
	background-color: #fcfcfc;
	border-color: #ddd;
}
.modal-footer .btn + .btn {
	margin-left: 5px;
	/* margin-bottom: 0; */
}
.btn-primary:hover {
	color: #fff;
	/* background-color: #0c7cd5; */
	border: 1px solid transparent !important;
}

</style>
