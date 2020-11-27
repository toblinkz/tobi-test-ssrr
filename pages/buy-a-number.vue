<template>
		<div class="container-fluid body">
			<div id="msb" class="col-md-2 hidden-xs">
			<Sidebar class="hidden-xs"></Sidebar>
			</div>
			<div  class="col-md-10">
					<DashboardNavbar></DashboardNavbar>

							<div class="col-md-10">
							 	<div class="mt-150 mb-30">
											<span style="font-size: 15px; font-weight: bold"> <i class="fa fa-tty m-r-5"></i>Buy a Number </span>
									</div>
							</div>
											<div class="mb-50" >
												<form @submit.prevent="getAvailableCountryNumber">
													<div class="col-md-7" >
														<v-select class="style-chooser" :options="countries" :reduce="code => code.code"  label="name" placeholder="Select country"  append-to-body :calculate-position="withPopper"  v-model="selected_country_code">
															<template #option="{ name, code }">
																<p >{{ name }} </p>
															</template>
														</v-select>
													</div>
													<div class="col-md-5">
														<button type="submit" class="search-button  m-r-20">
															{{ button_text }}
															<span v-show="isLoading">
																<img src="/images/spinner.svg" height="20px" width="30px"/>
														</span>
														</button>
													</div>
												</form>
											</div>

							<div class="col-md-11 mt-30">
								<div class="panel" >
									<div class="panel-body p-none scrollme">
										<table id="number-table" class="table table-responsive  table-hover">
											<thead>
											<tr>
												<th style="width: 10%;">Numbers</th>
												<th style="width: 15%;">Country</th>
												<th style="width: 15%;">Number Type</th>
												<th style="width: 15%;">Setup Charge</th>
												<th style="width: 20%;">Monthly Charge</th>
												<th style="width: 15%;">Inbound Sms</th>
												<th style="width: 10%;"></th>
											</tr>
											</thead>
											<tbody>
														<tr v-for="(row, index) in numbers_available_for_rent" :key="row.id" >
															<td>{{row.number}}</td>
															<td>{{row.country}} </td>
															<td>{{row.number_type }}</td>
															<td>{{row.service_charge }}</td>
															<td>{{row.monthly_charge}}</td>
															<td>{{row.inbound_sms}}</td>
															<td  @click="showRentNumberModal"><a  class="btn btn-success btn-xs"><img src="/images/ic_outline-confirmation-number.png"/> Rent Number</a></td>
														</tr>
														<tr>
															<td  colspan="7" style="text-align: center; cursor: pointer" v-show="numbers_available_for_rent.length < 1">No available number</td>
														</tr>
											</tbody>
										</table>
									</div>
								</div>
								<RentNumberModal></RentNumberModal>
								<BuyNumberModal></BuyNumberModal>
							</div>
			</div>
		</div>
</template>

<script>
import DashboardNavbar from "@/components/general/navbar/DashboardNavbar";
import Sidebar from "@/components/general/Sidebar";
import 'vue-select/dist/vue-select.css';
import { createPopper } from '@popperjs/core';
import Fuse from 'fuse.js';
import vSelect from 'vue-select';
import BuyNumberModal from "@/components/modals/BuyNumberModal";
import RentNumberModal from "@/components/modals/RentNumberModal";
export default {
	name: "numbers",
	components: {BuyNumberModal,  RentNumberModal, Sidebar, DashboardNavbar, vSelect},
	data(){
		return {
			countries:[],
			country_code:'',
			placement: 'top',
			number:'',
			number_type:'',
			selected_country_code:'',
			setup_charge:'',
			monthly_charge:'',
			inbound_sms:'',
			isLoading: false,
			button_text: 'Search',
			numbers_available_for_rent:''
		}
	},
	methods: {
			setCapability(value){
				this.number_type = value;
			},
			setCountry(value){
				this.country = value;
			},
			setNumber(value){
				this.number = value;
			},
			showRentNumberModal(){
				this.$modal.show('rent-number-modal');
			},
			showBuyNumberModal(){
				this.$modal.show('buy-number-modal')
			},
			deleteSelectedNumber(){
				document.getElementById("number-table").deleteRow(1);
			},
		async getAvailableCountryNumber(){
				this.button_text = '';
				this.isLoading = true;
				try {
					let response = await this.$axios.$get('sms/number/search', {params: {
							country: this.selected_country_code
						}});
					this.numbers_available_for_rent = response.data;
					this.button_text = "Search";
					this.isLoading = false;
				}catch (e){

				}

		},
		async getCountries(){
			let response = await this.$axios.$get('utility/countries');
			this.countries = response.data;
		},
		fuseSearch(options, search) {
			const fuse = new Fuse(options, {
				keys: ["name", "d_code", ],
				shouldSort: true
			});
			return search.length
				? fuse.search(search).map(({ item }) => item)
				: fuse.list;
		},
		withPopper (dropdownList, component, {width}) {
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

		},
	},
	mounted() {
		this.getCountries();
	}
}
</script>

<style scoped>
.select-style{
	padding: 10px 10px;
	outline: none;
	border-radius: 5px;
	border-color: #2D74AC;
	color: #2D74AC;
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

[class^="icon-"], [class*=" icon-"] {
	color: #F10000 !important;
}
.search-button {
	background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
	box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
	color: #fff !important;
	padding: 10px 10px;
	border-radius: 5px;
	outline: none;
	cursor: pointer;
}

</style>
