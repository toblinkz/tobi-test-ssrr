<template>
	<div class="flex-container">
		<div class="flex-item-left hidden-xs" style="background: url(/images/verification_banner.svg); background-size: contain" >

		</div>

		<div  class="flex-item-right" style="padding: 0 30px">
			<div class="mt-100 mb-150 text-center">

					<img src="/images/welcome.png" width="250"/>
					<div class="mt-10">
						<p style="font-weight: bold; color: #365899; font-size: 28px">You’re welcome!</p>
						<p style="font-size: 15px; color: #333333 ">Thank you for signing up to Termii, kindly select <br> service you’d love to explore</p>
						<div class="mb-20" >
							<a class="btn btn-primary mt-20" style="padding: 13px 15px; font-size: 14px" @click="showServicePage">Select Service</a>
						</div>
					</div>

			</div>
		</div>
	</div>
</template>

<script>
export default {
name: "WelcomeComponent",
methods:{
	showServicePage(){
		  this.$emit('showServicePage');
	}
}
}
</script>

<style scoped>
.flex-item-left {
	flex: 30%;
}

.flex-item-right {
	flex: 70%;
}
</style>
