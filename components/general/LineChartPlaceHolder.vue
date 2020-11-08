<template>
	<content-loader
		:width="400"
		:height="150"
		:speed="6"
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
	>
		<rect x="71" y="112" rx="0" ry="0" width="1" height="170" />
		<rect x="353" y="109" rx="0" ry="0" width="1" height="170" />
		<rect x="281" y="109" rx="0" ry="0" width="1" height="170" />
		<rect x="213" y="108" rx="0" ry="0" width="1" height="170" />
		<rect x="140" y="110" rx="0" ry="0" width="1" height="170" />
		<rect x="72" y="280" rx="0" ry="0" width="360" height="1" />
		<rect x="165" y="67" rx="0" ry="0" width="43" height="16" />
		<rect x="314" y="66" rx="0" ry="0" width="45" height="16" />
		<rect x="234" y="64" rx="0" ry="0" width="56" height="16" />
		<rect x="85" y="68" rx="0" ry="0" width="60" height="16" />
	</content-loader>
</template>

<script>
	import {ContentLoader,} from 'vue-content-loader';
	export default {
		name: "LineChartPlaceHolder",
		components: { ContentLoader},
	}
</script>

<style scoped>

</style>
