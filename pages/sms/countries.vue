<template>
	<div class="padding-sides mt-70">

		<!-- /page header -->
			<!-- Page container -->
			<div class="page-container">
				<!-- Page content -->
				<div class="page-content">
					<!-- Main content -->
					<div class="content-wrapper">
						<!-- main inner content -->
						<main id="wrapper" class="wrapper">
							<section class="wrapper-bottom-sec ">
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
																<p id="welcome" style="margin-top: 10px;margin-bottom: 15px"><i class="entypo-list-add"></i> Active country channels</p>
																<p class="insight hidden-xs">Request and View approved country channels and pricing on your account <br> To send messages to other countries on Termii,
																 you can make a  <br> request for the country to be added to your account.
																</p>

																<div class="row">
																	<center>
																		<div class="col-sm-4 hidden-xs">
																		</div>
																		<div class="col-sm-4">
																			<br>
																			<a  class="btn btn-primary" id="CHATID"><i class="fa fa-plus"></i> Make a new request</a>
																		</div>
																		<div class="col-sm-4 hidden-xs">
																		</div>

																	</center>
																</div>
															</div>
														</center>
													</div>
													<!-- END PANEL -->
												</div>
											</div>
										</div>
									</div>
									<TableVuePlaceHolder v-if="!show_shimmer">

									</TableVuePlaceHolder>
									<div v-else>
										<div class="p-15 ">
											<div class="row">
												<div>
													<div class="panel">
														<div class="panel-body p-none scrollme" style="overflow-x:auto;">
															<table class="table table-responsive  table-hover">
																<thead>
																<tr>
																	<th style="width: 25%;" class="hidden-xs">Country</th>
																	<th style="width: 25%;">Country Code</th>
																	<th style="width: 25%;">Channels</th>
																	<th style="width: 25%;">Pricing</th>

																</tr>
																</thead>
																<tbody>
																<tr v-for="row in active_country_routes.data" :key="row.id">
                   <td>{{row.country_name}}</td>
																  	<td>{{row.country_code}}</td>
																	  <td><p  class="label"  :class="channelClass(row.channel)">{{row.channel}}</p></td>
																	  <td>{{row.price}}</td>
																</tr>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
										<Pagination
											:page="page"
											:total_page="total_page"
											:on-page-change="onPageChange"
										>

										</Pagination>
									</div>
									<VerificationModal></VerificationModal>
									<UpdateCompanyNameModal></UpdateCompanyNameModal>
								</div>
							</section>
						</main>
					</div>
				</div>
			</div>
	</div>
</template>

<script>
import Sidebar from "../../components/general/Sidebar";
import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
import TableVuePlaceHolder from "../../components/general/TableVuePlaceHolder";
import VerificationModal from "~/components/modals/VerificationModal";
import Pagination from "../../components/general/Pagination";
import UpdateCompanyNameModal from "../../components/index/modals/UpdateCompanyNameModal";

export default {
	name: "countries",
	middleware:['auth', 'permission'],
	components: {
		UpdateCompanyNameModal,
		Pagination,
		VerificationModal,  TableVuePlaceHolder,  DashboardNavbar, Sidebar},
	data(){
		return{
			active_country_routes:[],
			customer_permissions: localStorage.getItem('permissions'),
			show_shimmer:false,
			page: 1,
			total_page:'',
			showPagination:false,


		}
	},
	computed:{

	},
	methods: {
		 async getActiveCountryRoutes(){
		 	 this.active_country_routes = await this.$sms.getActiveCountryRoutes(this.page);
		 	 this.show_shimmer = true
		 	 this.page = this.active_country_routes.meta.current_page;
		 	 this.total_page = this.active_country_routes.meta.last_page;
			},
		onPageChange(page) {
			this.page = page;
			this.showShimmer  = false;
			this.getActiveCountryRoutes();
		},
		channelClass(channel){
			switch (channel) {
				case "dnd": {
					return 'label-dnd'
				}
				case "generic": {
					return 'label-generic'
				}
				case "whatsapp": {
					return 'label-whatsapp'
				}
				default: {
					return 'label-danger'
				}
			}
		},
	},
	mounted() {
		if(this.$store.state.view_verify_page === 'true'){
			this.$modal.show('verification-id-modal');
		}else {
      this.getActiveCountryRoutes();
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
.label-whatsapp {
	color: #fff;
	background-color: #982649;
}
.label-generic{
	background-color: #482C3D;
	color: #fff;
}
.label-dnd {
	border-color: #FF5722;
	color: #fff;
	background-color: #FF5722;
}

</style>
