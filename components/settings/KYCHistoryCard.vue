<template>
	<div class="kyc--history-card">
		<div class="kyc--document-log-header">
			<p style="width: 200px; margin: 0 30px 0 0;">Time</p>
			<p style="width: 200px; margin: 0 50px 0 0;">Action</p>
			<p style="margin: 0">Action By</p>
		</div>

		<div style="border-bottom: dotted #ddd!important; margin: 0 0 20px; width: 100%;"></div>

		<div v-for="(row, index) in kycDocumentLogs" class="kyc--document-log">
			<p style="width: 200px; margin: 0 30px 0 0">{{ row.created_at.replaceAll('T', ' ').replaceAll('.000000Z', '') }}</p>
			<div style="width: 200px; margin: 0 50px 0 0; display: flex">
				<p class="kyc-action-status">{{ row.kyc_action.replaceAll('_', ' ') }}</p>
			</div>
			<p style="margin: 0">{{ row.action_by }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "KYCHistoryCard",

	props: {
		kycDocumentLogs: {
			type: Array,
			required: true
		}
	}
}
</script>

<style scoped>

.kyc--history-card {
	width: 100rem;
	margin: 2.5rem auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	padding: 1rem;
	background-color: #FFFFFF;
	box-shadow: 0 10px 45px 0 rgba(0, 0, 0, .1);
	border-radius: 8px;
}

.kyc--document-log-header {
	width: 100%;
	padding: 1rem 4rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	font-size: 15px;
	font-weight: 600;
	color: #2b2b2b;
}

.kyc--document-log {
	width: 100%;
	padding: 1rem 4rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	font-size: 14px;
	color: #2b2b2b;
}

.kyc--document-log:hover {
	background-color: #e1e4e5;
}

.kyc-action-status {
	text-align: center;
	background-color: #0DCBE5;
	padding: 1px 8px;
	border-radius: 20px;
	color: #FFFFFF;
	font-size: 13px;
	font-weight: 600;
}
</style>
