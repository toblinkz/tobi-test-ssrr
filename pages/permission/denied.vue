<template>
	<div class="container-fluid body">
		<div id="msb" class="col-md-2 hidden-xs">
		<Sidebar></Sidebar>
		</div>
		<div class="col-md-10">
		<DashboardNavbar></DashboardNavbar>
			<!--Page header-->
			<div class="page-header">
				<div class="page-header-content">
				</div>
			</div>
			<!-- /page header -->
			<!-- Page container -->
			<div class="page-container">
				<!-- Page content -->
				<div class="page-content">
					<!-- Main content -->
					<div class="content-wrapper">
						<!-- main inner content -->
						<main id="wrapper" class="wrapper">
							<section class="wrapper-bottom-sec mt-50">
								<div class="col-md-12">
									<div class="jumbotron" data-pages="parallax">
										<div class="container-fluid container-fixed-lg">
											<div class="inner">
												<!-- END BREADCRUMB -->
												<div class="container-md-height m-t-20">
													<div class="row ">
														<center>
															<!-- START PANEL -->
															<div class="panel-transparent">
																<img src="/images/payment.svg" />
																<p class="" style="font-weight: bolder;">PAGE DENIED</p>
															</div>
														</center>
													</div>
													<!-- END PANEL -->
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
						</main>
					</div>
				</div>
			</div>
			<verification-modal></verification-modal>
		</div>
	</div>
</template>

<script>

import {mapGetters} from "vuex";
import Sidebar from "../../components/general/Sidebar";
import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";

export default {
	name: "page-denied",
	components: {DashboardNavbar, Sidebar},
	middleware: ['auth','inactive_user'],
	data(){
		return{
			name:"denied",

		}
	},
	computed: {
		...mapGetters([ 'getSuccessfulPaymentUrl',])
	},

	methods: {
		goBack(){
			window.location.href = this.getSuccessfulPaymentUrl;
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
@media (min-width: 769px){
	.content-wrapper {
		display: table-cell;
		vertical-align: top;
	}
}
@media (min-width: 769px){
	.page-content {
		display: table-row;
	}
}

.content-wrapper {
	width: 100%;
}
@media screen and (min-width: 769px){
	.container .jumbotron, .container-fluid .jumbotron {
		padding-left: 60px;
		padding-right: 60px;
	}
}
@media (min-width: 769px){
	.page-container {
		width: 100%;
		display: table;
		table-layout: fixed;
	}
}

@media screen and (min-width: 769px){
	.jumbotron {
		padding-top: 48px;
		padding-bottom: 48px;
	}
}
.page-header:not(.page-header-filled) + .page-container {
	padding-top: 35px;
}
.page-container {
	position: relative;
	/* padding-bottom: 40px; */
}

.jumbotron {

	margin-bottom: 10px;
	color: inherit;
	background-color: #fff;
}
.btn-primary {
	color: #fff;
	background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
	box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
}
.row {
	margin-left: 0px;
	margin-right: 0px;
}
#welcome {
	/* margin-bottom: 15px; */
	font-weight: 300;
	letter-spacing: normal;
	font-size: 18px;
	-webkit-font-smoothing: antialiased;
	color: #2c2c2c;
	display: block;
	font-style: normal;
	/* -webkit-margin-before: 1em; */
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
	/* -webkit-margin-before: 1em; */
	/* -webkit-margin-after: 1em; */
	/* -webkit-margin-start: 0px; */
	/* -webkit-margin-end: 0px; */
	/* display: block; */
}
.p-15 {
	padding: 15px!important;
}
.scrollme {
	overflow-y: auto;
}
.table {
	margin-bottom: 0;
}.table > thead > tr > th {
		border-bottom: dotted #ddd !important;
		vertical-align: middle;
		padding: 12px 20px;
		line-height: 1.5384616;
	}
.table-responsive {
	overflow-x: auto;
	min-height: 0.01%;
}
.table {
	width: 100%;
	max-width: 100%;
	/* margin-bottom: 20px; */
}

.table > tbody > tr > td{
	vertical-align: middle;
	padding: 12px 20px;
	line-height: 1.5384616;
}
th {
	font-weight: 500;
	text-align: left;
}
.table-hover > tbody > tr:hover {
	background-color: #f8f8f8;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
	background-color: transparent;
}
.btn-primary:hover {
	color: #fff;
	background-color: #0c7cd5;
	border: 1px solid transparent !important;
}
.label {
	font-size: 11px;
	padding: 2px 10px;
	margin: 2px 0;
	border-radius: 20px;
	font-weight: 600;
	line-height: 1;
	white-space: nowrap;
	text-align: center;
	display: inline-block;
	text-transform: uppercase;
	border: 1px solid transparent;
	letter-spacing: 0.1px;
}
.label-warning {
	color: #fff;
	background-color: #FF5722;
}
.label-danger{
	background-color: red;
	color: #fff;
}
.label-success {
	border-color: #4CAF50;
	color: #fff;
	background-color: #4CAF50;
}

</style>
