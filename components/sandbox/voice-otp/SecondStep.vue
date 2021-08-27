<template>
	<div >
			<p class="mt-10 m-b-60" style="color: #E5E5E5;">* This test service is currently only available to Nigerian phone numbers.</p>
			<div class="text-center">
				<img src="/images/phone_call.svg"/>
				<p class="mt-20" style="font-weight: 700">Calling number and delivering OTP...</p>
			</div>
			<h5 class="mt-100"><span>Your OTP has been delivered Verify by clicking the button below</span></h5>
			<div style="display: block; text-align: center">
				<a class="mt-30 btn bg-blue" @click="showVerifyToken" style="padding-top: 12px; padding-bottom: 15px; font-size: 15px">
					Next step
				</a>
			</div>
	</div>
</template>

<script>
export default {
	name: "SecondStep",
	methods:{
		showVerifyToken(){
		 this.$emit('showVerifyToken');
		}
	}
}
</script>

<style scoped>
h5 {
	width: 100%;
	text-align: center;
	border-bottom: 1px solid #D3D3D3;
	line-height: 0.1em;
	margin: 100px 0 20px;
}

h5 span {
	font-weight: 300;
	background:#fff;
	color: #838080;
	padding:0 10px;
}
</style>
