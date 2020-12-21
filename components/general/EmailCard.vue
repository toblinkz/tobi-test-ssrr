<template>
	<div class="email-card">
		<div class="col-md-11">
			<p>{{ email }}</p>
		</div>
		<div class="col-md-1">
			<i class="fa fa-minus-circle" style="cursor: pointer"></i>
		</div>

	</div>
</template>

<script>
export default {
name: "EmailCard",
	props: {
			email:{

			}
	},

}
</script>

<style scoped>
.email-card{
	padding: 10px 10px;
	border-width: 1px;
	border-radius: 8px;
	margin-bottom: 5px;
	/*background-color: white;*/
	display: flex;
	/*box-shadow: 0 10px 45px 0 rgba(0,0,0,.1);*/
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
</style>
