<template>
	<div class="container-fluid body">
		<div id="msb" class="col-md-2 hidden-xs">
			<Sidebar class="hidden-xs"></Sidebar>
		</div>
		<div class="col-md-10">
			<DashboardNavbar></DashboardNavbar>
			<div class="col-md-10">
				<div class="mt-150">
					<span style="font-size: 20px; font-weight: bold"> <i class="fa fa-tty m-r-5" style="font-size: 15px"></i> Numbers </span>
					<p class="insight">Reach your customers easily in other<br> regions by using numbers with their country code</p>
				</div>

			</div>
			<div class="col-md-12">

				<div class="panel mt-50" >
					<div class="panel-body p-none scrollme">
						<div style="display: flex; flex-direction: row; width: 100%">
							<div style="width: 20%">
								<button @click="showBuyNumberModal" class="btnl bg-blue" style="justify-content: flex-end" >
									# Rent a Number</button>
							</div>
						</div>
						<div class="mt-10 " style="border-bottom: dotted #ddd!important;"></div>
						<table class="table table-responsive  table-hover">
							<thead>
							<tr class="m-l-10">
								<th style="width: 10%;">Number</th>
								<th style="width: 5%;">Country</th>
								<th style="width: 5%;">Number Type</th>
								<th style="width: 15%;">Rental Charge</th>
								<th style="width: 15%;">Date Rented</th>
								<th style="width: 15%;">Expiry Date</th>
								<th style="width: 10%;">Status</th>
								<th style="width: 10%;"></th>
								<th style="width: 15%;"></th>
							</tr>
							</thead>
							<tbody>
							<tr v-for="row in rented_numbers.data" :key="row.id">
								<td>{{ row.phone_number }}</td>
								<td>{{row.country}}</td>
								<td>{{ row.number_type}}</td>
								<td>{{ row.monthly_charge }}</td>
								<td>{{row.date_rented}}</td>
								<td>{{ row.expiry_date }}</td>
								<td> <p class="label"  :class="statusClass(row.status)">{{row.status.toUpperCase()}}</p></td>
								<td v-show="current_date < row.expiry_date"><a class="btn btn-danger btn-xs"  :aria-disabled="isDisabled(row.status)"  @click="unRentNumber(row)" >Unrent</a></td>
								<td  v-show="current_date > row.expiry_date"><a class="btn btn-success btn-xs"  :aria-disabled="isDisabled(row.status)"  @click="renewNumber(row)" >Renew</a></td>
								<td><nuxt-link :to="{name: 'number-id-subscriptions', params:{id: row.uuid, phone_number: row.phone_number}}" class="btn btn-primary btn-xs"  :aria-disabled="isDisabled(row.status)" > Manage Number</nuxt-link></td>
							</tr>
							<tr>
								<td  colspan="7" style="text-align: center; cursor: pointer" v-show="!rented_numbers">No data available in table</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<BuyNumberModal></BuyNumberModal>
		</div>
	</div>
</template>

<script>
import Sidebar from "@/components/general/Sidebar";
import DashboardNavbar from "@/components/general/navbar/DashboardNavbar";
import BuyNumberModal from "~/components/modals/BuyNumberModal";
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select';
import Fuse from "fuse.js";
import {createPopper} from "@popperjs/core";

export default {
 name: "number",
	middleware: ['auth', 'inactive_user'],
	components: {DashboardNavbar, Sidebar, BuyNumberModal, vSelect},
		data(){
			return{
					rented_numbers: [],
			 	error_message:'',
					current_date: moment(Date.now()).format('YYYY/MM/DD'),
					number_action_button_text:'',
				data:[{"uuid":"7747747", "phone_number":"02022214836","number_type":"Local","country":"","monthly_charge":0,"service_charge":0,"alias":"","status":"active","date_rented":"2020-12-08","expiry_date":"2020-12-11", },{"phone_number":"+13252034406","number_type":"Local", "uid":"7747747","country":"","monthly_charge":0,"service_charge":0,"alias":"","status":"pending","date_rented":"2020-12-08","expiry_date":"2021-09-08"},{"phone_number":"17657051520","number_type":"Local","country":"US","monthly_charge":0,"uid":"7747747","service_charge":0,"alias":"Termii number637","status":"active","date_rented":"2020-12-13","expiry_date":"2002-01-13"},{"phone_number":"13254005451","number_type":"Local","country":"US","uuid":"7747747","monthly_charge":1.1868,"service_charge":0,"alias":"Termii number335","status":"active","date_rented":"2020-12-13","expiry_date":"2021-01-13"},{"phone_number":"13254006498","number_type":"Local","country":"US","monthly_charge":1.1868,"service_charge":0,"alias":"Termii number063","status":"active","date_rented":"2020-12-13","expiry_date":"2021-01-13"}]
			}
		},
		methods: {
				async getRentedNumbers(){
					try{
						this.rented_numbers = await this.$axios.$get('/number/rented');
					}catch (e) {

					}

				},
			statusClass(status){
				switch (status) {
					case "active": {
						return 'label-success'
					}
					case "pending": {
						return 'label-warning'
					}
					default: {
						return 'label-danger'
					}
				}
			},
			isDisabled(status) {
				switch (status) {
					case "active": {
						return false;
					}
					case "pending":
					default: {
						return true;
					}
				}
			},

			showBuyNumberModal(){
				this.$modal.show('buy-number-modal')
			},
			async unRentNumber(row){

						try{
							await this.$axios.$delete('/number/unrent', {
								params:{
									phone_number: row.phone_number
								}
							});
							this.$toast.success('Done successfully');
						}catch (e) {

						}

			},
			async renewNumber(row){
						try{
									await this.$axios.$patch("/number/rent/"+row.uuid +"/renew")
									this.$toast.success('Renewed successfully');
						}catch (e){

						}
			}
		},
		mounted() {
				 this.getRentedNumbers();
		}
}
</script>

<style scoped>
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
.form-control{
	display: block;
	width: 30%;
	height: 30px;
	padding: 10px 16px;
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
input[type="text"], input[type="password"]{
	-webkit-appearance: none;
	border: 2px solid rgba(0, 0, 0, 0.07);
}
.form-control:focus {
	border-color: #4DB6AC;
	box-shadow: none;
	outline: 0;
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
