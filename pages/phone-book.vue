<template>
	<div class="padding-sides mt-70">
			<!-- Page container -->
			<div class="page-container">
				<!-- Page content -->
				<div class="page-content">
					<!-- Main content -->
					<div class="content-wrapper">
						<!-- main inner content -->
						<main id="wrapper" class="wrapper">
							<section class="wrapper-bottom-sec">
								<div class="jumbotron" data-pages="parallax">
									<div class="container-fluid container-fixed-lg">
										<div class="inner">
											<div >
												<div class="row">
													<center>
														<!-- START PANEL -->
														<div class="panel-transparent">
															<p id="welcome" style="margin-top: 10px;margin-bottom: 0px"><i class="entypo-users"></i> Your Phone Book!</p>
															<p class="insight hidden-xs">Add new phone lists, edit, delete and manage all your <br>uploaded customer phone contacts
															</p>
															<div class="row hidden-xs">
																<br>
																<nuxt-link to="/sms/import-contacts" class="btn btn-primary"><i class="fa fa-upload"></i> Import using excel</nuxt-link>
															</div>
														</div>
													</center>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-12">
									<div class="p-15">
										<div class="row">
											<div class="p-30">
												<h2></h2>
											</div>
											<div class="row">
												<div class="col-md-2 col-lg-2">
												</div>
												<div  v-if="canAddPhonebook" class="col-md-8 col-lg-8">
													<div class="panel">
														<div class="panel-body">
															<form class="" role="form" method="post" @submit.prevent="addPhoneBook">
																<div class="col-lg-11">
																	<div class="form-group">
																		<input type="text" class="form-control" :class="{'error': hasPhoneBookNameError}" placeholder="Create new phone book list" v-model="phonebook_name">
																		<span class=" error_field_message" v-if="error_message">{{error_message}}</span>
																	</div>
																</div>
																<div v-if="canAddPhonebook" class="col-md-1">
																	<button type="submit" class="btn btn-success btn-sm pull-right" :disabled="isDisabled"><i class="fa fa-plus"></i> Add </button>
																</div>
															</form>
														</div>
													</div>
												</div>

											</div>
											<TableVuePlaceHolder v-if="!show_shimmer">
											</TableVuePlaceHolder>
											<div class="row m-t-35" v-else>
												<div >
													<div class="panel">
														<div class="panel-body scrollme">
															<div class="row">
																<div class="col-sm-6">
																	<div class="dataTables_length" id="DataTables_Table_0_length">
																		<label>
																			Show
																			<select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="form-control2 input-sm">
																				<option value="10">10</option>
																				<option value="25">25</option>
																				<option value="50">50</option>
																				<option value="100">100</option>
																			</select>
																			entries
																		</label>
																	</div>
																</div>
																<div class="col-sm-6">
																	<div id="DataTables_Table_0_filter" class="dataTables_filter"><label>Search:<input type="search" class="form-control2 input-sm" v-model="searchQuery"></label></div>
																</div>
															</div>
															<table class="table table-responsive data-table table-hover">
																<thead>
																<tr>
																	<th >SL</th>
																	<th>Phone Book</th>
																	<th>Total Contacts</th>
																	<th >Action</th>
																</tr>
																</thead>
																<tbody>
																<tr v-for="(row, index) in filteredPhonebook" :key="row.id" v-show="filteredPhonebook.length > 0">
																	<td>
																		<p>{{index + 1}}</p>
																	</td>
																	<td>
																		<p>{{row.phonebook_name}}</p>
																	</td>
																	<td>
																		<p>{{row.total_contact}}</p>
																	</td>
																	<td >
																		<nuxt-link v-if="canViewContact" :to="{path: 'view-contact/'+ row.id }" class="btn btn-primary btn-xs" ><i class="fa fa-eye"></i> View</nuxt-link>
																		<a v-if="canEditPhonebook" class="btn btn-success btn-xs" @click="showModal(row)" ><i class="fa fa-edit"></i> Edit</a>
																		<nuxt-link v-if="canAddContact" class="btn btn-success btn-xs"  :to="{path: 'add-contact/' + row.id ,}" >
																			<i class="fa fa-user-plus"></i> Add Contact
																		</nuxt-link>
																		<a v-if="canDeleteContact" @click="deletePhoneBook(row)" class="btn btn-danger btn-xs " ><i class="fa fa-trash"></i></a>
																	</td>
																</tr>
																<tr>
																	<td  colspan="7" style="text-align: center; cursor: pointer" v-show="filteredPhonebook.length < 1">No data available in table</td>
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
											v-show="showPagination === true"
										>

										</Pagination>
									</div>
								</div>
							</section>
						</main>
					</div>
				</div>
				<EditPhoneBookModal @updated="getPhoneBook" :phone_book_name="phone_book_name" :phone_book_id="phone_book_id"></EditPhoneBookModal>
				<VerificationModal></VerificationModal>
				<UpdateCompanyNameModal></UpdateCompanyNameModal>
			</div>
	</div>
</template>

<script>
	import Sidebar from "../components/general/Sidebar";
	import DashboardNavbar from "../components/general/navbar/DashboardNavbar";
	import EditPhoneBookModal from "../components/modals/EditPhoneBookModal";
	import Swal from 'sweetalert2'
	import Pagination from "../components/general/Pagination";
	import TableVuePlaceHolder from "../components/general/TableVuePlaceHolder";
	import VerificationModal from "~/components/modals/VerificationModal";
	import UpdateCompanyNameModal from "../components/index/modals/UpdateCompanyNameModal";

	export default {
		name: "phone-book",
		middleware:  ['auth', 'inactive_user', 'permission'],
		components: {
			UpdateCompanyNameModal,
			VerificationModal, TableVuePlaceHolder, Pagination, EditPhoneBookModal, DashboardNavbar, Sidebar},
		data(){
			return{
				phone_book:[],
				phonebook_name: '',
				customer_permissions: localStorage.getItem('permissions'),
				error_message:'',
				hasPhoneBookNameError: false,
				phone_book_name:'',
				phone_book_id:'',
				searchQuery: '',
				page: 1,
				total_page: '',
				showPagination: false,
				show_shimmer: false
			}
		},
		computed:{
			isDisabled:function () {
				return (this.phonebook_name === '')
			},
			filteredPhonebook(){
				if (this.searchQuery){
					return this.phone_book.filter(item => {
						return item.phonebook_name.includes(this.searchQuery)
					})
				}else {
					return this.phone_book;
				}
			},
			canAddPhonebook(){
				return (this.customer_permissions.includes("add_phonebook"));
			},
			canViewContact(){
				return (this.customer_permissions.includes("view_contact"));
			},
			canEditPhonebook(){
				return (this.customer_permissions.includes("edit_phonebook"));
			},
			canAddContact(){
				return (this.customer_permissions.includes("add_contact"));
			},
			canDeleteContact(){
				return (this.customer_permissions.includes("delete_contact"));
			}

		},
		watch:{
			phonebook_name(value){

				this.error_message = '';
				this.hasPhoneBookNameError = false;
			}
		},
		methods:{
			async getPhoneBook() {
				try {
					let data = await this.$campaign.getPhonebooks(this.page);
					this.phone_book = data.data;
					this.showPagination = data.meta.last_page > 1;
					this.page = data.meta.current_page;
					this.total_page = data.meta.last_page;
					this.show_shimmer = true;
				}catch (e) {

				}

			},
			async addPhoneBook(){
				try{
					await this.$axios.$post('sms/phone-book',
						{
							phonebook_name: this.phonebook_name
						});
					await this.getPhoneBook();
					this.$toast.success("Phone book added successfully");
					await this.getPhoneBook();
				} catch (e) {
					this.error_message = 'Phone-book name already exists';
					this.hasPhoneBookNameError = true;
				}
			},
			onPageChange(page) {
				this.page = page;
				this.show_shimmer = false;
				this.getPhoneBook();
			},
			async deletePhoneBook(row_id){
				let id = row_id.id
				await Swal.fire({
					title: 'Are you sure?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!'
				}).then(async (result) => {
					if (result.value){
						await this.$axios.$delete('sms/phone-book/'+ id).catch((e)=>{this.$toast.error("An Error Occured while trying to delete this phone book");});
						this.$toast.success("Phone book deleted successfully");
						await this.getPhoneBook();
					}
				});
				},
			showModal(row){
				this.phone_book_id = row.id;
				this.phone_book_name = row.phonebook_name;
				this.$modal.show('edit-phonebook-modal')
			}
			},


		mounted() {
			if(this.$store.state.view_verify_page === 'true'){
				this.$modal.show('verification-id-modal');
			}else {
				this.getPhoneBook();
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
	.panel {
		border-radius: 5px;
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

	.page-container {
		position: relative;
		/* padding-bottom: 40px; */
	}

	.jumbotron {
		/* padding-top: 30px; */
		/* padding-bottom: 10px; */
		margin-bottom: 10px;
		color: inherit;
		background-color: #fff;
	}
.paddx-20{
	padding-right: 20px;
	padding-left: 20px;
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
	.wide {
		width: 200px !important;
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
	.form-control {
		display: block;
		width: 97%;
		height: 36px;
		padding: 7px 12px;
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
	input[type="text"]{
		border: 1px solid rgba(0, 0, 0, 0.07);
	}
	.form-control:focus {
		border-color: #4DB6AC;
		box-shadow: none;
		outline: 0;
	}
	.btn-success {
		color: #fff;
		background: linear-gradient(-48deg, #70ddad -30%, #226a4a 60%) !important;
		box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
	}
	.btn-danger {
		color: #fff;
		background-color: #F44336;
		border-color: #F44336;
	}
	.dataTables_length {
		float: right;
		display: inline-block;
		margin: 0 0 20px 20px;
	}
	.dataTables_length > label {
		margin-bottom: 0;
	}
	select.input-sm {
		height: 34px;
		line-height: 34px;
	}
	.btn-primary {
		color: #fff;
		background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
		box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
	}
	.form-control2 {
		font-size: 13px;
		border-color: #bbb;
		border-radius: 5px;
		border: solid 1px rgba(204, 204, 204, 0.34);
		font-weight: 500;
		box-shadow: none;
		height: 36px;
		padding: 7px 12px;
		line-height: 1.5384616;
	}
	.form-control2:focus {
		border-color: #4DB6AC;
		outline: 0;
	}





</style>
