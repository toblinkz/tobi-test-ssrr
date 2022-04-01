<template>
	<ContentLoader
		:width="400"
		:height="300"
		:speed="5"
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
	>
		<rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
		<rect x="44" y="323" rx="3" ry="3" width="100" height="6" />
		<rect x="130" y="30" rx="10" ry="10" width="150" height="80" />
	</ContentLoader>
</template>

<script>
import {ContentLoader,} from 'vue-content-loader';
export default {
	name: "BoardSkeleton",
	components: { ContentLoader},
}
</script>

<style scoped>

</style>
