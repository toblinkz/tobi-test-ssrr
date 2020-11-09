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
								<div style="display: flex; flex-direction: row">
									<input id="email"   class="form-control ">
									<a class="btnl bg-blue" style="justify-content: flex-end" >
										Buy a Number
									</a>
								</div>
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
	components: {DashboardNavbar, Sidebar}
}
</script>

<style scoped>

</style>
