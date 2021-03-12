<template>
	<div class="alert foreign-card" >
		<div style="display:flex; flex-direction: column">
			<p class="" style="color: #595959; font-size: 13px">ACCOUNT NUMBER</p>
			<!-- START PANEL -->

			<p>
				<span style="font-weight: bold; color: #1a202c; font-size: 22px">{{account_number}}</span>
					<span class="" v-clipboard:copy="account_number" @click="showCopied" style="cursor: pointer">
						<img src="https://res.cloudinary.com/termii-inc/image/upload/v1614952698/billingpage/feather_copy_lqsu0a.svg"/>
						<span style="font-size: 12px; color: #365899" v-if="show_copied">Copied!</span>
				</span>
			</p>
			<!-- END PANEL -->
		</div>
		<div style="display:flex; flex-direction: column">
			<p class="text-semibold"  style="color: #595959; font-size: 13px">BANK</p>
			<!-- START PANEL -->
			<p >
				<span style="color:  #718096;">{{bank_name.toUpperCase()}}</span>
			</p>
			<!-- END PANEL -->
		</div>
		<div style="display:flex; flex-direction: column">
			<p class="text-semibold"  style="color: #595959; font-size: 13px">ACCOUNT NAME</p>
			<!-- START PANEL -->
			<p>
				<span>{{account_name}}</span>
			</p>
			<!-- END PANEL -->
		</div>
	</div>
</template>

<script>
export default {
	name: "GenericAccountNumberComponent",
	data(){
		return {
			show_copied: false
		}
		},
	props:{
		account_number: {
			required : true
		},
		bank_name: {
			required : true
		},
		account_name: {
			required : true
		}
	},
	methods:{
		showCopied(){
			this.show_copied = true;
			setTimeout( () => {
				this.show_copied = false;
			}, 2000)
		},
	}

}
</script>

<style scoped src="@/assets/css/billing/fund_page.css";></style>
