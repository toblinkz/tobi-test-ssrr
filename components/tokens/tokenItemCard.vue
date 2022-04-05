<template>
	<div class="card-container">
		<div class="card-sub-container">
			<p class="title blue-t">{{title}}</p>
			<p>{{info}}</p>
			<slot name="coming-soon"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "tokenItemCard",
	props:{
		  title: String,
		  info: String
	}
}
</script>

<style scoped>
.card-container{
	display: flex;
	padding: 2.5em;
	width: 30%;
	border-radius: 10px;
	box-shadow: 0 10px 45px 0 rgb(0 0 0 / 10%);
}
.card-sub-container{
	display: flex;
	flex-direction: column;
}
.title{
	 font-weight: 700;
}
</style>
