<template>
	<div class="container-fluid body">
		<div id="msb" class="col-md-2">
			<Sidebar class="hidden-xs"></Sidebar>
		</div>
		<div class="col-md-10">
			<DashboardNavbar></DashboardNavbar>
			<!-- Page header -->
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
							<section class="wrapper-bottom-sec">
								<div class="jumbotron" data-pages="parallax">
									<div class="container-fluid container-fixed-lg">
										<div class="inner">
											<div class="mt-20 ">
												<div class="row ">
													<center>
														<!-- START PANEL -->
														<div class="panel-transparent">
															<p id="welcome" style="margin-top: 10px;"><i class="fa fa-upload"></i> Import Phone Contacts!</p>
															<p class="insight">Upload your customer contacts by using our sample <br>csv file format or manually adding their contacts
															</p>
															<div class="row">
																<br>
																<a href="#" class="btn btn-primary"><i class="fa fa-download"></i> Please use this sample file</a>
															</div>
														</div>
													</center>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-12">
									<div class="p-t-none p-b-none">
										<div class="col-lg-3">
										</div>
										<div class="col-lg-6">
											<div class="panel">
												<div class="panel-body">
													<div class="send-sms-file-wrapper">
														<form @submit.prevent="addContact" role="form" method="post">
															<div class="form-group">
																<label>Import Numbers</label>
																<small style="color: red !important;font-size: 13px;">Download Our <a href="http://sandbox.termii.com/sms/download-contact-sample-file">Sample File</a> Before uploading your contacts and please do not remove the first row</small><br>
																<div class="form-group input-group input-group-file" style="margin-top: 20px !important;">
                                        <span class="input-group-btn">
                                            <span class="btn btn-primary btn-file">
                                                Browse <input type="file" class="form-control" @change="uploadFile(fieldName, $event.target.files)" >
                                            </span>
                                        </span>
																</div>
																<div class="form-group">
																	<label>Country Code</label>
																	<v-select :options="countries" append-to-body :calculate-position="withPopper"   :reduce="country => country.d_code" label="name" placeholder="Select Country Code" v-model="selected_country">

																		<template #option="{name, d_code}">
																			<p style="">{{ name }} {{`(${d_code})`}}</p>
																		</template>
																		<template #selected-option="{name, d_code }">
																			<div style="display: flex; align-items: center;">
																				{{name }} <strong>{{ `(${ d_code})` }}</strong>
																			</div>
																		</template>
																	</v-select>

																</div>
																<div class="form-group">
																	<label>Phone Book</label>
																	<small style="color: red !important;font-size: 13px;">Haven't created a phone book yet? <nuxt-link to="/phone-book" >Click here</nuxt-link></small><br>

																	<v-select :options="phone_books" append-to-body :calculate-position="withPopper" :reduce="phone_book => phone_book.id" label="phonebook_name" placeholder="Select Phone book" v-model="selected_phone_book">
																		<template #option="{phonebook_name}">
																			<p style="">{{ phonebook_name }}</p>
																		</template>
																	</v-select>
																</div>

																<button type="submit" id="" class="btn btn-success btn-sm pull-right" :disabled="isDisabled"><i class="fa fa-plus"></i> Add </button>
															</div>
														</form>
													</div>
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
		</div>
	</div>
</template>

<script>
	import Sidebar from "../../components/general/Sidebar";
	import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
	import CustomSelect from "../../components/general/dropdown/CustomSelect";
	import vSelect from 'vue-select';
	import 'vue-select/dist/vue-select.css';
	import S3 from 'aws-s3';
	import Swal from "sweetalert2";
	import {mapGetters} from "vuex";
	import Fuse from 'fuse.js'
	import { createPopper } from '@popperjs/core';

	export default {
		name: "import-contacts",
		middleware: 'auth',
		components: {CustomSelect, DashboardNavbar, Sidebar, vSelect},
		data(){
			return{
				placement: 'top',
				countries: [],
				phone_books: [],
				selected_country: '',
				selected_phone_book:'',
				contact_upload_url:'',
				fieldName:''
			}
		},
		computed:{
			isDisabled:function(){
				return (this.selected_country === '' || this.selected_phone_book === '' || this.contact_upload_url === '');
			},
			config(){
				return{
					bucketName: 'termii',
					dirName: 'upload/files',
					region: 'us-west-1',
					accessKeyId: 'AKIAIOJI3WN4QX7QPD7Q',
					secretAccessKey: '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',
				}
			},
			S3Client(){
				return new S3(this.config);
			},
			newFileName(){
				return `termii_list_${this.selected_phone_book}_${this.loggedInUser.customer.uid}`
			},
			...mapGetters(['isAuthenticated', 'loggedInUser'])
		},
		methods: {
			async fetch(){
				try {
					//get countries
					let countries_data = await this.$axios.$get('utility/countries');
					this.countries = countries_data.data;

					//get phonebook list
					let phone_book_list = await this.$axios.$get('sms/phone-book');
					this.phone_books = phone_book_list.data

				}catch (e) {

				}

			},
			validateFile(file){
				try {
					let file_extension = file.name.split('.').pop().toLowerCase();
					if ( file_extension === "csv" || file_extension === "xlsx"){
						return true
					}
					return false;
				}catch (e) {

				}

			},
			uploadFile(fieldName, files){
				try{
					let file = files[0];
					if (this.validateFile(file)){
						this.S3Client
							.uploadFile(file, this.newFileName)
							.then(data => { this.contact_upload_url = data.location, this.$toast.success('Uploaded successfully') })
							.catch(err => {Swal.fire({
								icon: 'error',
								title: 'Oops...',
								text: 'Something went wrong! Please try again.',
							})})
					}else {
						this.$toast.error("Please upload a valid file(CSV, XLSX)");
					}
				}catch (e) {

				}

			},
			async addContact(){
				try {
					let data = await this.$axios.$post('sms/phone-book/contact/add', {
						contact_upload_url : this.contact_upload_url.split('files').pop().substring(1),
						id: this.selected_phone_book,
						country_code: this.selected_country.substring(1)
					});
					this.$toast.success(data.data);
				}catch (e) {
							this.$toast.error("Something went wrong. Try again!");
				}

			},


			withPopper(dropdownList, component, {width}){
				dropdownList.style.width = width;
				const popper = createPopper(component.$refs.toggle, dropdownList, {
					placement: this.placement,
					modifiers: [
						{
							name: 'offset', options: {
								offset: [0, -1]
							}
						},
						{
							name: 'toggleClass',
							enabled: true,
							phase: 'write',
							fn ({state}) {
								component.$el.classList.toggle('drop-up', state.placement === 'top')
							},
						}]
				});
				return () => popper.destroy();
			}


		},
		mounted() {
			this.fetch();
		}
	}
</script>

<style >
	.v-select.drop-up.vs--open .vs__dropdown-toggle {
		border-radius: 0 0 4px 4px;
		border-top-color: transparent;
		border-bottom-color: rgba(60, 60, 60, 0.26);
	}

	[data-popper-placement='top'] {
		border-radius: 4px 4px 0 0;
		border-top-style: solid;
		box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.15)
	}
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
		/* padding-top: 30px; */
		/* padding-bottom: 10px; */
		margin-bottom: 10px;
		color: inherit;
		background-color: #fff;
	}

	.row {
		margin-left: 0px;
		margin-right: 0px;
	}
	.form-group {
		margin-bottom: 20px;
		position: relative;
	}
	.input-group {
		/* position: relative; */
		display: table;
		border-collapse: separate;
	}
	.input-group-btn {
		position: relative;
		font-size: 0;
		white-space: nowrap;
		width: 1%;
		display: table-cell;
	}
	.btn-file {
		position: relative;
		overflow: hidden;
	}
	.input-group .form-control:last-child{
		border-bottom-left-radius: 0;
		border-top-left-radius: 0;
	}
	.input-group .form-control:first-child{
		border-bottom-left-radius: 0;
		border-top-left-radius: 0;
	}
	.btn-file input[type=file] {
		position: absolute;
		top: 0;
		right: 0;
		min-width: 100%;
		min-height: 100%;
		text-align: right;
		background: none repeat scroll 0 0 transparent;
		cursor: inherit;
		display: block;
		opacity: 0;
		filter: alpha(opacity=0);
	}
	.form-group label {
		margin-bottom: 5px;
		display: block;
		font-weight: 600;
		line-height: 24px;
	}
	a {
		color: #3068a4;
	}
	a.btn {
		color: #fff;
	}
	.btn-success {
		color: #fff;
		background: linear-gradient(-48deg, #70ddad -30%, #226a4a 60%) !important;
		box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
	}

</style>
