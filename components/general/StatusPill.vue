<template>
	<p
		class="status"
		:class="{
              'status--approved': this.statusValue === 'APPROVED',
              'status--pending': this.statusValue === 'PENDING',
              'status--declined': this.statusValue === 'DECLINED',
            }"
	>
		{{statusValue}}
	</p>
</template>

<script>
export default {
	name: "StatusPill",

	props: {
		statusValue: {
			type: String,
			required: true
		}
	},
}
</script>

<style scoped>
.status {
	padding: 2px 10px;
	border-radius: 20px;
	font-weight: 600;
	font-size: 11px;
	height: 20px;
	color: #FFFFFF;
	text-transform: uppercase;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.status--approved {
	background-color: #4CAF50;
}

.status--pending {
	background-color: #FF5722;
}

.status--declined {
	background-color: #999999;
}
</style>
