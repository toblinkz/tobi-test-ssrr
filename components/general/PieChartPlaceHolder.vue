<template>
	<content-loader
		:width="500"
		:height="300"
		:speed="2"
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
	>
		<rect x="147" y="36" rx="0" ry="0" width="50" height="15" />
		<rect x="72" y="36" rx="2" ry="2" width="50" height="15" />
		<rect x="302" y="36" rx="2" ry="2" width="50" height="15" />
		<rect x="223" y="36" rx="2" ry="2" width="50" height="15" />
		<rect x="187" y="65" rx="2" ry="2" width="50" height="12" />
		<circle cx="214" cy="181" r="85" />
	</content-loader>
</template>

<script>
	import {ContentLoader,} from 'vue-content-loader';
    export default {
        name: "PieChartPlaceHolder",
					components: { ContentLoader},
    }
</script>

<style scoped>

</style>
