<template>

			<div class="container-fluid" >
				<div class="row layout-flex" >
					<div id="msb" class="col-md-2 padding-0" >
						<Sidebar></Sidebar>
					</div>
					<div class="col-md-10 padding-0" >
					 <DashboardNavbar></DashboardNavbar>
						<nuxt keep-alive :keep-alive-props="{ max: 3 }"/>
					</div>
				</div>
			</div>


</template>
<style>
@media  (min-width: 768px){
	.layout-flex{
		display: flex!important;
	}
}
</style>

<script>
import DashboardNavbar from "../components/general/navbar/DashboardNavbar";
import Sidebar from "../components/general/Sidebar";
export default {
	components: {Sidebar, DashboardNavbar}
}
</script>
