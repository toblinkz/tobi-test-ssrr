<template>
	<div class="layout-container">
		<div class="sidebar-container">
			<Sidebar></Sidebar>
		</div>
		<div class="main-container">
			<DashboardNavbar></DashboardNavbar>
			<nuxt keep-alive :keep-alive-props="{ max: 3 }"/>
		</div>
	</div>
</template>

<script>
import DashboardNavbar from "../components/general/navbar/DashboardNavbar";
import Sidebar from "../components/general/Sidebar";
export default {
	components: {Sidebar, DashboardNavbar}
}
</script>
<style>

.layout-container{
	display: flex;
	width: 100%;
	height: 100%;
}

.sidebar-container{
	width: 17%;
	background-color: #011b33;
}

/*::-webkit-scrollbar {*/
/*	width: 0;*/
/*}*/

::-webkit-scrollbar {
	display: none;
}

.main-container{
	width: 83%;

}
</style>
