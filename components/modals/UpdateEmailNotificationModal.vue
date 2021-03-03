<template>
	<transition>
		<modal name="update-email-notification-modal"  role="dialog" height="auto">
			<div>

				<!-- Modal content-->
				<div>
					<div class="modal-header">
						<button type="button" class="close" @click="close">×</button>
						<h4 class="modal-title"><i class="entypo-mail"></i> Update</h4>
					</div>
					<div class="modal-body">
						<div class="row">
						</div>

						<div>
							<form @submit.prevent="addEmailForNotification">
									<div>
											<div class="form-group mt-20">
												<label>{{ email_address }}</label>
											</div>
											<div>
												<div class="m-b-5" style="font-size: 15px">Select Notification Category </div>
												<div class="checkboxes" v-for="row in emails">
													<label ><input type="checkbox" :value="row.id" v-model="selected_categories" /> <span> {{ row.category }}</span></label>
												</div>
											</div>
										</div>
										<div class="modal-footer">
												<button class="btn id-btn-primary" type="submit" :disabled="isDisabled">
													{{button_text}}
													<span v-show="isLoading">
														<img src="/images/spinner.svg" height="20px" width="30px"/>
												</span>
												</button>
										</div>
							</form>
						</div>

					</div>
				</div>
			</div>
		</modal>
	</transition>
</template>

<script>
import PricingDropdown from "@/components/general/dropdown/PricingDropdown";
export default {
	name: "update-email-notification-modal",
	components: {PricingDropdown},
	data(){
		return{
             emails:'',
			 isLoading: false,
			 button_text: "Update",
			 error_message:[],
			 hasEmailError: false,
			 email_categories:[],
			 selected_categories:[]
		}
	},
	props: {
		email_address:{
		},
		selected_email_categories:{

		}
	},
	watch:{
			email_address(value){
					if (this.email_address){
						this.selected_categories = []
						 this.mergeEmailCategories();
					}
			}
	},
computed:{
	isDisabled:function () {
		 return ( this.selected_categories.length === 0);
	},
},

	methods: {
			close() {
				this.$modal.hide('update-email-notification-modal');
				this.email="";
				this.hasEmailError = false;
		},

		async addEmailForNotification(){
  this.isLoading = true;
  this.button_text = '';
			try {
			await this.$axios.$post('user/notification/email', {
					email_to_category:[{
						email: this.email_address,
						categories: this.selected_categories
					}],

				});

				this.isLoading = false;
				this.button_text = 'Update';
				this.$emit('addedEmail');
				this.close();
				this.$toast.success("Updated Successfully");
			}catch (e) {
				this.isLoading = false;
				this.button_text = 'Update';

				let errors = e.response.data;

				if(e.response.status === 422){
					this.handle422Errors(errors)
				}else{
					this.handleOtherErrors(errors)
				}

			}

		},
		mergeEmailCategories(){

			this.selected_email_categories.forEach((email)=>{
				  this.selected_categories.push(email.id)
			})
		let ids = new Set(this.email_categories.map(d => d.id));
			this.emails = [...this.email_categories, ...this.selected_email_categories.filter(d => !ids.has(d.id))];
		},
		async getEmailCategories(){
				try {
						let categories = await this.$axios.$get('utility/email/category');
						this.email_categories = categories.data;
				}catch (e) {

				}
		},

		handle422Errors(data){
			let errors = data.errors
			for (let key in errors) {
				errors[key].forEach(err => {
					this.$toast.error(err);
				});
			}
		},

		handleOtherErrors(data){
			this.$toast.error(data.message);
		}


	},
	mounted() {
     this.getEmailCategories();
	}

}
</script>

<style scoped>
@import "assets/css/general_style/authentication_pages.css";
.error{
	border-color: red !important;
}

.modal-open .modal {
	overflow-x: hidden;
	overflow-y: auto;
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
@media (min-width: 769px){
	.modal-dialog {
		width: 600px;
		margin: 30px auto;
	}
}
.modal-dialog {
	position: relative;
}
.modal-content {
	border: 0;
	border-radius: 0;
	margin-top: 100px;
}
.modal-content {
	/* border-radius: 3px; */
	-webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}
.modal-content {
	position: relative;
	background-color: #fff;
	border: 1px solid #999;
	border: 1px solid transparent;
	border-radius: 5px;
	-webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
	box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
	background-clip: padding-box;
	outline: 0;
}
.modal-header {
	position: relative;
	padding-bottom: 0;
}
.modal-header {
	padding: 5px 20px;
	border-bottom: 1px solid transparent;
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
	top: 50%;
	/* margin-top: 0; */
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
}
.close:hover, .close:focus {
	outline: 0;
	opacity: 1;
	filter: alpha(opacity=100);
}
.modal-body {
	padding: 0px 20px 60px 20px;
	position: relative;
}
.row {
	margin-left: 0px;
	margin-right: 0px;
}
#welcome {
	margin-bottom: 15px;
	font-weight: 300;
	letter-spacing: normal;
	font-size: 18px;
	-webkit-font-smoothing: antialiased;
	color: #2c2c2c;
	display: block;
	font-style: normal;
	-webkit-margin-before: 1em;
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
.wide {
	width: 200px !important;
}
.rent-body {
	position: relative;
	/*padding: 20px;*/
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
.table {
	width: 100%;
	max-width: 100%;
	margin-bottom: 0;
}
.table > tbody > tr > td, .table > tfoot > tr > td {
	vertical-align: middle;
	padding: 12px 20px;
	line-height: 1.5384616;
	border-top: 2px solid #ddd;
}
.table >tbody:first-child >tr>td{
	border-top: 0;
}

.modal.in .modal-dialog {
	-webkit-transform: translate(0, 0);
	-ms-transform: translate(0, 0);
	-o-transform: translate(0, 0);
	transform: translate(0, 0);
}

.modal-footer {
	padding-top: 0;
	padding: 20px;
	text-align: right;
	border-top: 1px solid transparent;
}
.form-control {
	display: block;
	width: 100%;
	height: 36px;
	padding: 7px 12px;
	font-size: 13px;
	line-height: 1.5384616;
	color: #333333;
	background-color: #fff;
	background-image: none;
	border: 1px solid #ddd;
	border-radius: 3px;
	-webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	-o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

.form-control:focus {
	border-color: #4DB6AC;
	box-shadow: none;
	outline: 0;
}
.form-group label {
	margin-bottom: 5px;
	display: block;
	font-weight: 600;
	line-height: 24px;
}
.btn-default {
	color: #333;
	background-color: #fcfcfc;
	border-color: #ddd;
}
.modal-footer .btn + .btn {
	margin-left: 5px;
	/* margin-bottom: 0; */
	/* margin-bottom: 0; */
}
.checkboxes label {
	display: inline-block;
	padding-right: 10px;
	white-space: nowrap;
}
.checkboxes input {
	vertical-align: middle;
}
.checkboxes label span {
	vertical-align: middle;
}
</style>
