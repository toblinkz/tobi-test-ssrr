<template>
 <div>
		 <div class="page-header">
				  <div class="page-header-content">
							  <div class="page-title mt-150">
										<ul class="nav nav-pills campaign-steps hidden-xs" style="margin-bottom: -20px;">
											<li>
												<nuxt-link to="/sandbox">
													<img src="/images/gift.svg" style="margin-top: -5px;margin-right: 5px;"> Sandbox
												</nuxt-link>
											</li>
											<li class="active">
												<nuxt-link to="/sms/quick-sms">
													<img src="/images/call_icon.svg" style="margin-top: -5px;margin-right: 5px;"> Voice OTP
												</nuxt-link>
											</li>
										</ul>
									</div>
						</div>
			</div>
		<div class="page-container">
			 <div class="page-content">
				 <div class="content-wrapper">
				   	<main id="wrapper" class="wrapper">
				 		<div class="row">
									<div class="col-md-6">
										<p>* This test service is currently only available to Nigerian phone numbers.</p>
										 <div class="row mt-50">
												 <div class="col-md-6">
														 <div style="position: relative">
																<input class="form-control has-input" type="tel" placeholder="Input your phone number here">
																<span class="input-field_helper">Phone number</span>
															</div>
														 <div style="position: relative">
																<input class="form-control has-input mt-50" type="number" placeholder="Input number of attempts">
																<span class="input-field_helper">Pin attempt</span>
															</div>
														<p class="mt-10" style="font-weight: 300;font-size: 12px;line-height: 17px;">* This is the amount of times a user can input<br>a wrong code</p>
													</div>
													<div class="col-md-6">
														  <div style="position: relative">
																	<select class="form-control has-input">
																	 	<option>Select number of digits</option>
																		 <option>4</option>
																			<option>5</option>
																			<option>6</option>
																	 	<option>7</option>
																	</select>
																	<span class="input-field_helper">Length of OTP</span>
																</div>
														  <div style="position: relative">
																	<input class="form-control has-input mt-50" type="number" placeholder="Input code expiry time">
																	<span class="input-field_helper">Code expiry time</span>
																	<p  class="mt-10" style="font-weight: 300;font-size: 12px;line-height: 17px; color: #E50300">* This is in minutes not seconds.</p>
																</div>
													</div>
											</div>
										 <div class="mt-30" style="background: #f5f5f5; border-radius: 3px; padding: 15px">
											<p class="text-center"><i class="entypo-cc" style="color: #079805 !important;"></i>
												You will be charged from your wallet per test (N1.37 naira)</p>
											</div>
										 <div class="mt-30 btn bg-blue " style="width: 100%; padding-top: 15px; padding-bottom: 18px; font-size: 15px">
												  Dial number
											</div>
									</div>
										<div class="col-md-6">
											 <div>
													<p>Request</p>
													<VoiceOtpCodeBlock></VoiceOtpCodeBlock>
												</div>
											  <div>
														<p>Response</p>
														<CodeBlockResponse></CodeBlockResponse>
													</div>

										</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import VoiceOtpCodeBlock from "../../components/sandbox/voice-otp/VoiceOtpCodeBlock";
import CodeBlockResponse from "../../components/general/CodeBlockResponse";
export default {
	name: "voice-otp",
	components: {CodeBlockResponse, VoiceOtpCodeBlock}
}
</script>

<style scoped>
/*@import "../../assets/css/general_style/authentication_pages.css";*/
@media (min-width: 769px){
	.nav-pills {
		font-size: 0;
	}
}
.nav {
	margin-bottom: 0;
	padding-left: 0;
	/* list-style: none; */
}

ul.campaign-steps {
	text-align: left;
	border-bottom: dashed 2px #aaa;
	margin-top: 30px;
	width: 83%;
}
.campaign-steps > li {
	margin-right: 50px;
	font-weight: 600;
}
@media (min-width: 769px){
	.nav-pills > li {
		display: inline-block;
		font-size: 13px;
	}
}
.nav-pills > li {
	float: none;
}
.campaign-steps > li > a {
	padding-right: 0;
	padding-left: 0;
}
.nav-pills > li > a {
	color: #333333;
	border-radius: 3px;
}
.nav > li > a {
	position: relative;
	display: block;
	padding: 7px 15px;
}
.campaign-steps a {
	font-size: 16px;
}
.campaign-steps > li > a {
	padding-right: 0;
	padding-left: 0;
}
ul.campaign-steps > li.active > a{
	border-bottom: solid 2px #365899;
	border-radius: 5px 5px 0 0;
	font-weight: 600;
	background: #365899;
	padding: 10px 15px;
	margin-bottom: -2px;
	color: #fff;
}
.page-header:not(.page-header-filled) + .page-container {
	padding-top: 35px;
}
.page-container {
	margin: auto;
	padding-bottom: 10px;
}
@media (min-width: 769px){
	.page-container {
		width: 100%;
		display: table;
		table-layout: fixed;
	}
}
@media (min-width: 769px){
	.page-content {
		display: table-row;
	}
}
@media (min-width: 769px){
	.content-wrapper {
		display: table-cell;
		vertical-align: top;
	}
}
.content-wrapper {
	width: 100%;
}
.form-control {
	display: block;
	width: 100%;
	height: 50px;
	padding: 7px 12px;
	/* font-size: 13px; */
	line-height: 1.5384616;
	color: #333333;
	background-color: #fff;
	background-image: none;
	border: 1px solid #ddd;
	border-radius: 5px;
	-webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	-o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
/*.form-control:focus {*/
/*	border-color: #4DB6AC;*/
/*	box-shadow: none;*/
/*	outline: 0;*/
/*}*/

.input-field_helper {
	font-size: 1rem;
	position: absolute;
	opacity: 0;
	background-color: #fff;
	padding-left: 8px;
	padding-right: 8px;
	top: -7px;
	font-weight: 600;
	color: rgba(10,46,101,.5);
	-webkit-transition: color .3s ease;
	transition: color .3s ease;
	left: 20px;
}
select:focus+.input-field_helper, input[type=number]:focus+.input-field_helper, input[type=password]:focus+.input-field_helper, input[type=tel]:focus+.input-field_helper, input[type=text]:focus+.input-field_helper {
	color: #2D74AC;
	opacity: 1!important;
}

select:focus, input[type=number]:focus, input[type=password]:focus, input[type=tel]:focus, input[type=text]:focus {
	border-color: #2D74AC;
	outline: none;
	background-color: transparent;
	-webkit-transition: border .3s ease-in;
	transition: border .3s ease-in;
	box-shadow: none;
}
input:focus::placeholder{
	color: transparent;
}
select.has-input+.input-field_helper, input[type=number].has-input+.input-field_helper, input[type=password].has-input+.input-field_helper, input[type=tel].has-input+.input-field_helper, input[type=text].has-input+.input-field_helper {
	opacity: 1;
}




</style>
