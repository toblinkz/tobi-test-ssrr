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
					<div class="col-md-11">

						<div class="panel mt-50" >
							<div class="panel-body p-none scrollme">
								<div style="display: flex; flex-direction: row; width: 100%">
									<div style="width: 80%">
										<input type="text" v-model="searchQuery"  class="form-control" placeholder="Search number">
										<span class=" error_field_message" v-if="error_message">{{error_message}}</span>
									</div>
									<div style="width: 20%">
										<nuxt-link to="/buy-a-number" class="btnl bg-blue" style="justify-content: flex-end" >
											# Buy a Number
										</nuxt-link>
									</div>
								</div>
								<div class="mt-20 " style="border-bottom: dotted #ddd!important;"></div>
								<table class="table table-responsive  table-hover">
									<thead>
									<tr class="m-l-10">
										<th style="width: 10%;">Number</th>
										<th style="width: 15%;">Country</th>
										<th style="width: 15%;">Number Type</th>
										<th style="width: 15%;">Rental Charge</th>
										<th style="width: 15%;">Date Rented</th>
										<th style="width: 15%;">Expiry Date</th>
										<th style="width: 15%;"></th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="(row, index) in filteredPhoneNumber" :key="row.id">
										<td>{{ row.phone_number }}</td>
										<td>{{row.country}}</td>
										<td>{{ row.number_type}}</td>
										<td>{{ row.monthly_charge }}</td>
										<td>{{row.date_rented}}</td>
										<td>{{row.expiry_date}}</td>
										<td><a class="btn btn-danger btn-xs" @click="unRentNumber(row)"> Unrent</a></td>
									</tr>
									<tr>
										<td  colspan="7" style="text-align: center; cursor: pointer" v-show="filteredPhoneNumber.length < 1">No data available in table</td>
									</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>

				</div>
			</div>
</template>

<script>
import Sidebar from "@/components/general/Sidebar";
import DashboardNavbar from "@/components/general/navbar/DashboardNavbar";
export default {
 name: "number",
	middleware: ['auth', 'inactive_user'],
	components: {DashboardNavbar, Sidebar},
	watch: {
 	searchQuery(value){
 		this.validateSearchQuery(value);
		}
	},
		data(){
			return{
					rented_numbers: [],
					searchQuery: '',
			 	error_message:''
			}
		},
	computed: {
 		filteredPhoneNumber(){
 			if(!isNaN(this.searchQuery)){
 				return this.rented_numbers.filter(item => {
 						return item.phone_number.includes(this.searchQuery);
					})
				} else {
 				return this.rented_numbers
				}
			}
	},
		methods: {
				async getRentedNumbers(){
					try{
						this.rented_numbers = await this.$axios.$get('/number/rented').data;

					}catch (e) {

					}

				},
			validateSearchQuery(value){
				if (isNaN(value)){
					this.error_message = 'Please enter a valid number';
				}else{
					this.error_message = '';
				}
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
</style>
