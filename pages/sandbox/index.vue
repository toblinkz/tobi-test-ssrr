<template>
  <div>
			  <div class="page-header">
						  <div class="page-header-content">
									   <ul class="nav nav-pills campaign-steps mt-150" style="margin-bottom: -20px;">
													<li class="active">
														<nuxt-link to="/message/select-type">
															<img src="/images/gift_white.svg" style="margin-top: -5px;margin-right: 5px;"> Sandbox
														</nuxt-link>
													</li>
												</ul>
								</div>
					</div>
			  <div class="page-container">
						  <div class="page-content">
									   <div class="content-wrapper">
													  <main id="wrapper">
																  <div class="row">
                     <div class="col-md-10">
																						  <ul class="modern-listing big-icon no-top-border-list mt-10">
																											<li>
																													<nuxt-link to="/sandbox/voice-otp" class="btn btn-primary">Try now</nuxt-link>
																													<nuxt-link to="/sandbox/voice-otp">
																													<span class="">
																																	 <i class="entypo-phone blue-i"></i>
																													</span>
																													</nuxt-link>
																													<h4><nuxt-link to="/sandbox/voice-otp" class="blue-t">Voice OTP</nuxt-link></h4>
																													<p>
																														Verify your customers by triggering a phone call that reads their code to them.
																													</p>
																											</li>
																								</ul>
																						<ul class="modern-listing big-icon no-top-border-list mt-10">
																							<li>
																								<nuxt-link to="/sandbox/sms" class="btn btn-primary">Try now</nuxt-link>
																								<nuxt-link to="/sandbox/sms">
																													<span class="">
																																	 <i class="entypo-chat blue-i"></i>
																													</span>
																								</nuxt-link>
																								<h4><nuxt-link to="/sandbox/sms" class="blue-t">SMS</nuxt-link></h4>
																								<p>
																									Engage your users by having two-way conversation and send templated messages via Whatsapp
																								</p>
																							</li>
																						</ul>
																						<ul class="modern-listing big-icon no-top-border-list mt-10">
																							<li>
																								<a class="btn btn-primary">Coming soon</a>
																								<a>
																													<span class="">
																																	 <i class="fa fa-whatsapp blue-i"></i>
																													</span>
																								</a>
																								<h4><a  class="blue-t">WhatsApp Sandbox </a></h4>
																								<p>
																									Engage your users by having two-way conversation and send templated messages
																									via Whatsapp
																								</p>
																							</li>
																						</ul>
																					</div>
																		</div>
															</main>
												</div>
								</div>
					</div>
		</div>
</template>

<script>
export default {
	name: "sandbox",
	middleware: ['auth','inactive_user'],
}
</script>

<style scoped>
.row {
	margin-left: 0px;
	margin-right: 0px;
}
.nav {
	padding-left: 0;
	margin-bottom: 0;
	list-style: none;
}
@media (min-width: 769px){
	.nav > li {
		position: relative;
		display: block;
	}
}
.nav > li > a {
	position: relative;
	display: block;
	padding: 7px 15px;
}
.page-header {
	margin: 0;
	padding: 0;
	border-bottom-width: 0;
}
.page-header-content {
	margin: auto;
	max-width: 1280px;
}
.page-header-content {
	position: relative;
	background-color: inherit;
	padding: 0 20px;
}
ul.campaign-steps {
	text-align: left;
	border-bottom: dashed 2px #aaa;
	margin-top: 30px;
	width: 83%;
}
.mt-150 {
	margin-top: 150px !important;
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
ul.campaign-steps > li.active > a, ul.campaign-steps > li.active > a:hover {
	background-color: #fff;
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
ul.modern-listing {
	margin: 30px 0 30px 0;
	padding: 0;
}
.mt-0 {
	margin-top: 0px !important;
}
ul.no-top-border-list li:first-child {
	border-top: none;
}
ul.modern-listing li:first-child {
	/* border-top: solid 1px #ddd; */
	padding-top: 20px;
}
ul.modern-listing li {
	list-style: none;
	clear: both;
	border-bottom: solid 1px #ddd;
	margin-bottom: 20px;
}
ul.modern-listing li i, .table-row-icon {
	float: left;
	font-size: 30px;
	height: 70px;
	margin-right: 20px;
	color: #00838F;
	margin-top: 5px;
	width: 30px;
	text-align: center;
}
.blue-i {
	color: #2685b7 !important;
}
ul.modern-listing li h4 {
	margin: 0 0 5px;
	font-weight: 600;
	font-size: 20px;
}
ul.modern-listing li p {
	font-size: 15px;
}
ul.modern-listing li .btn {
	float: right;
}
.campaign-steps a {
	font-size: 16px;
}
.btn-primary {
	color: #fff;
	background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
	box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
}
.btn:hover, .btn:focus, .btn.focus {
	-webkit-box-shadow: 0 0 0 100px rgba(0, 0, 0, 0.05) inset;
	box-shadow: 0 0 0 100px rgba(0, 0, 0, 0.05) inset;
}
.btn-primary:hover {
	color: #fff;
	background-color: #0c7cd5;
	border: 1px solid transparent !important;
}
h5 {
	width: 100%;
	text-align: center;
	border-bottom: 1px solid #D3D3D3;
	line-height: 0.1em;
	margin: 10px 0 20px;
}

h5 span {
	 font-weight: 300;
	background:#fff;
	color: #CACACA;
	padding:0 10px;
}
</style>
