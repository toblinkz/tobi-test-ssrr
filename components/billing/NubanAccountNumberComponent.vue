<template>
<div class="nuban-card-container">
	<div v-for="row in nuban_account" class="alert m-r-10 nuban-card">
		<!-- START PANEL -->
		<div  v-clipboard:copy="row.account_number" @click="changeCopyText(row.account_number)" class="copy-clipboard">
			<img class="m-r-5"  src="https://res.cloudinary.com/termii-inc/image/upload/v1614952698/billingpage/feather_copy_lqsu0a.svg"/>
			<span style="font-size: 12px; color: #365899" v-if="row.account_number !== copy_id"></span>
			<span style="font-size: 12px; color: #365899" v-if="row.account_number === copy_id">Copied!</span>
		</div>

		<p>
			<span style="font-size: 13px">ACCOUNT NUMBER</span>
		</p>
		<p>
			<span style="font-weight: bold; color: #1a202c; font-size: 22px">{{row.account_number}}</span>
		</p>
		<p>
			<span style="color: #718096;">{{row.bank_name.toUpperCase()}}</span>
		</p>
		<!-- END PANEL -->
	</div>
</div>
</template>

<script>
export default {
	name: "NubanAccountNumberComponent",
	props: {
		nuban_account: {
			required: true
		}
	},
		data(){
			return{
				copy_id: '',
			}
	},
	methods: {
		changeCopyText(account_number){
			this.copy_id = account_number;

			setTimeout( () => {
				this.copy_id = '';
			}, 1000)
		},
	}
}
</script>

<style scoped src="@/assets/css/billing/fund_page.css";></style>
