<template>
	<transition>


		<modal name="verification-id-modal" :clickToClose="false" >
			<div >
				<div class="col-md-3" style="height: 50vh; background-color: darkblue">
					<p>ff</p>
				</div>
				<div class="col-md-9 modal-body">
					<div class="p-x-y">
						<p  class="m-t-80 text-bold">Verify it's you</p>
						<p>Welcome to your Dashboard. We sent a verification code to your email address. Please enter the code into the text field below</p>
						<form  method="post" >

							<div class="mt-20">
								<div class="form-group">
									<input type="text" class="form-control" placeholder="Enter 6-digit code" >
											<div class="mt-20">
												<ButtonSpinner :button_text="button_text" ></ButtonSpinner>
											</div>
									<a  class="text-info2 mt-50 ">Resend verification code</a>
									<p class="mt-20">verify later instead? <a class="text-info2">Log Out</a></p>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</modal>
	</transition>
</template>

<script>
import ButtonSpinner from "~/components/general/ButtonSpinner";
export default {
name: "VerificationModal",
 	components: {ButtonSpinner},
	 data(){
				return{
					button_text: 'Verify'
				}
		}
}
</script>

<style scoped>
.vm--modal {
	border-radius: 8px !important;
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
button.close {
	padding: 0;
	cursor: pointer;
	background: transparent;
	border: 0;
	-webkit-appearance: none;
}
.error_field_message {
	font-size: 1.2rem;
	color: red;
	display: block;
	margin-top: 5px;
}
input[type=text].error {
	border-color: red!important;
}
.form-control:focus {
	border-color: #4DB6AC;
	outline: none;
}
P{
	font-size: 14px;
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
	width: 90%;
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
.p-x-y{
	 padding-left: 30px;
	 padding-right: 30px;
}
</style>
