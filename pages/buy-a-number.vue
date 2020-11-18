<template>
		<div class="container-fluid body">
			<div id="msb" class="col-md-2 hidden-xs">
			<Sidebar class="hidden-xs"></Sidebar>
			</div>
			<div  class="col-md-10">
					<DashboardNavbar></DashboardNavbar>

							<div class="col-md-10">
							 	<div class="mt-150">
											<span style="font-size: 15px; font-weight: bold"> <i class="fa fa-tty m-r-5"></i>Buy a Number </span>
													<div class="mt-30" style="display: flex; flex-direction: row; width: 100%" >
														<select class="select-style mb-30 m-r-20"  @change="setCapability($event.target.value)">
															<option >Number Type</option>
															<option >Sms</option>
															<option >Whatsapp</option>
															<option >Voice</option>
														</select>
														<select class="select-style mb-30 m-r-20"  @change="setCountry($event.target.value)">
															<option >Select Country</option>
															<option>Algeria</option>
															<option >Nigeria</option>
															<option >Ghana</option>
														</select>
														<button class="search-button  mb-30 m-r-20">Search</button>
													</div>
								 </div>
							</div>
							<div class="col-md-11">
								<div class="panel" style="height: 300px;">
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
														<tr>
															<td>{{number}}</td>
															<td>United states </td>
															<td>{{number_type }}</td>
															<td>{{setup_charge }}</td>
															<td>{{monthly_charge}}</td>
															<td>{{inbound_sms}}</td>
															<td  @click="showRentNumberModal"><a  class="btn btn-success btn-xs"><img src="/images/ic_outline-confirmation-number.png"/> Rent Number</a></td>
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
import BuyNumberModal from "@/components/modals/BuyNumberModal";
import RentNumberModal from "@/components/modals/RentNumberModal";
export default {
	name: "numbers",
	components: {BuyNumberModal,  RentNumberModal, Sidebar, DashboardNavbar},
	data(){
		return {
			country:'',
			number:'',
			number_type:'',
			setup_charge:'',
			monthly_charge:'',
			inbound_sms:'',
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
		}
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
}

</style>
