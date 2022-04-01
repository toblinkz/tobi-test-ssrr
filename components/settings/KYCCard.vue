<template>
	<div class="kyc--card-container">
		<a :href="`${this.documentObject.file_url}`" target="_blank"  style="width: 25%; font-size: 15px">{{ documentObject.name_of_file }}</a>
		<p style="width:25%; margin-left: 20px">{{documentObject.customer}}</p>
		<div style="width:25%; margin-left: 20px">
			<StatusPill
				:status-value="documentObject.status"
				style="width: 100px; font-size: 14px"
			/>
		</div>
		<div style="width:15%; margin-left: 20px">
			<div style="float: right; margin-right: 30px">
				<KYCActionMenu
					:id="documentObject.file_url"
					:documentObject="documentObject"
					@view-history="viewHistory"
					@edit-kyc-document="editKYCDocument"
					@delete-kyc-document="deleteKYCDocument"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import KYCActionMenu from "@/components/general/KYCActionMenu";
import StatusPill from "@/components/general/StatusPill";

export default {
	name: "KYCCard",
	components: {KYCActionMenu, StatusPill},

	props: {
		documentObject: {
			type: Object,
			required: true
		}
	},

	methods: {
		viewHistory(){
			this.$emit('view-kyc-history', this.documentObject)
		},

		editKYCDocument(){
			this.$emit('edit-kyc-document', this.documentObject)
		},

		deleteKYCDocument(){
			this.$emit('delete-kyc-document', this.documentObject)
		}
	}
}
</script>

<style scoped>
.kyc--card-container {
	width: 100%;
	/*height: 10rem;*/
	margin: 1rem auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	padding: 1rem 2rem;
	background-color: #FFFFFF;
	/*box-shadow: 0 10px 45px 0 rgba(0, 0, 0, .1);*/
	border-radius: 8px;
}
</style>
