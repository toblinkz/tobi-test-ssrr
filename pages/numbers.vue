<template>
		<div class="container-fluid body">
			<div id="msb" class="col-md-2 hidden-xs">
			<Sidebar class="hidden-xs"></Sidebar>
			</div>
			<div  class="col-md-10">
					<DashboardNavbar></DashboardNavbar>
					<div class="col-md-12">
							<div class="col-md-10">
							 	<div class="mt-150">
									<span style="font-size: 15px; font-weight: bold"> <i class="fa fa-tty m-r-5"></i>Buy a Number </span>
										<div class="mt-30" style="display: flex; flex-direction: row; width: 100%" >
											<select class="select-style mb-30 m-r-20" style="width: 30%">
												<option value="15 Minutes">Select Capability</option>
											</select>
											<select class="select-style mb-30 m-r-20"  style="width: 30%">
												<option value="15 Minutes">Select Country</option>
											</select>
											<select  class="select-style mb-30"  style="width: 30%">
												<option value="15 Minutes">Search Available Numbers</option>
											</select>
										</div>
								 </div>
								<div class="panel">
									<div class="panel-body p-none scrollme">
										<table class="table table-responsive  table-hover">
											<thead>
											<tr>
												<th style="width: 20%;">Numbers (0)</th>
												<th style="width: 20%;">Country</th>
												<th style="width: 20%;">Capabilities</th>
												<th style="width: 20%;"></th>
												<th style="width: 20%;"></th>
											</tr>
											</thead>
											<tbody>

											</tbody>
										</table>
									</div>
								</div>
							</div>
						<div class="col-md-1"></div>
					</div>

			</div>
		</div>
</template>

<script>
import DashboardNavbar from "@/components/general/navbar/DashboardNavbar";
import Sidebar from "@/components/general/Sidebar";
export default {
	name: "numbers",
	components: {Sidebar, DashboardNavbar}
}
</script>

<style scoped>
.select-style{
	padding: 10px 30px;
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
</style>
