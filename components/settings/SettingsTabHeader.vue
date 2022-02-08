<template>
	<div class="container">
		<div class="sub-container">
			<div class="content">
				<div class="content-title">
					<i class="content-title-icon" :class="titleIcon"></i>
					<h3>{{ titleText }}</h3>
				</div>

				<div class="content-main">{{ body }}</div>
			</div>

			<img :src=tabImage class="tab-image" alt="a face being focused on">
		</div>

	</div>
</template>

<script>
export default {
	name: "SettingsTabHeader",
	props: {
		titleIcon: String,
		titleText: String,
		body: String,
		tabImage: String,
	}
}
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 0;
	margin: 60px auto 0;
	height: 200px;
}

.sub-container {
	width: 80%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	width: 480px;
}

.content-title {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15px;
}

h3 {
	padding: 0;
	margin: 0;
}

.content-title-icon {
	margin-right: 6px;
}

.tab-image {
	width: 200px;
}
</style>
