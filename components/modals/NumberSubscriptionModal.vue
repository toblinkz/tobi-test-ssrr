<template>

	<!-- Modal -->
	<modal name="number-subscription-modal" height="auto">
		<div  tabindex="-1" role="dialog" style="display: block;
    padding-left: 9px;">
			<div  role="document" >
				<div>
					<div class="modal-header" >
						<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="myModalLabel">New Subscription</h4>
					</div>
					<form method="post" @submit.prevent="numberSubscribe">

						<div class="modal-body">
							<div class="form-group">
								<div class="col-lg-12">
									<div class="row">
										<div class="col-md-6">
											<label>Number: </label>
											<span>{{phone_number}}</span>
											<br>
											<br>
										</div>
										<div class="col-md-6">
											<label>Number Type: </label>
											<span >{{number_type}}</span>
											<br>
											<br>
										</div>
									</div>
									<div class="row">
										<div class="col-md-6">
											<label>Monthly Charge: </label>
											<span >{{monthly_charge}}</span>
											<br>
											<br>
										</div>
										<div class="col-md-6">
											<label>Country: </label>
											<span >{{country}}</span>
											<br>
											<br>
										</div>
									</div>
									<div class="row">
										<div class="col-md-6">
											<label>Number ID: </label>
											<span >{{number_id}}</span>
											<br>
											<br>
										</div>
										<div class="col-md-6">
											<label>Number Status: </label>
											<span >{{number_status}}</span>
											<br>
											<br>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<a type="button" class="btn btn-danger" @click="close"> Close </a>
							<button type="submit" class="btn id-btn-primary" > Proceed </button>
						</div>

					</form>
				</div>
			</div>
		</div>
	</modal>

</template>

<script>
import ButtonSpinner from "../general/ButtonSpinner";
import {mapGetters} from "vuex";
export default {
	name: "NumberSubscriptionModal",

	props: {
		alias: {
			required: true
		},
		country: {
			required: true
		},
		number_type: {
			required: true
		},
		service_charge: {
			required: true
		},
		monthly_charge: {
			required: true
		},
		number_status: {
			required: true
		},
		payment_method:{
			required:true
		},
		phone_number:{
			required: true
		},
		number_id:{
			required:true
		}
	},
	data(){
		return{
			payment_gateway: 'wallet'
		}
	},

	methods: {
		close() {
			this.$modal.hide('number-subscription-modal');
		},

		async numberSubscribe() {

			try {
				let data =	await this.$axios.post('number/rent/'+ this.number_id + '/renew');


				this.$toast.success("Request sent successfully");
			} catch (e) {

				let errors = e.response.data.errors;
				for (let key in errors) {
					errors[key].forEach(err => {
						this.$toast.error(err);
					});
				}
			}
		},
	},
	mounted() {

	}
}
</script>

<style scoped >

@import "../../assets/css/modal/modal.css";

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
	top: 50%;
	/* margin-top: 0; */
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
	padding: 20px 20px 60px 20px;
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
	padding-top: 0;
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
