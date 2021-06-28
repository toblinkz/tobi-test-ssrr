<template>
  <div>
			<div class="container-fluid body" >
				<div class="row">
					<div id="msb" class="col-md-2">
						<Sidebar></Sidebar>
					</div>
					<div class="col-md-10">
					 <DashboardNavbar></DashboardNavbar>
						<nuxt keep-alive :keep-alive-props="{ max: 3 }"/>
					</div>
				</div>
			</div>

  </div>
</template>
<style>

</style>

<script>
import DashboardNavbar from "../components/general/navbar/DashboardNavbar";
import Sidebar from "../components/general/Sidebar";
export default {
	components: {Sidebar, DashboardNavbar}
}
</script>
