<template>
	<div class="kyc--card-container">
		<a class="kyc--card--document-name"
					:href="`${this.documentObject.file_url}`"
					target="_blank"
					style="width: 25%; font-size: 15px;"
					@mouseover="hover = true"
					@mouseleave="hover = false"
		>
			{{ documentObject.name_of_file }}
		</a>

		<p v-if="hover" class="document-name--info">
			Click to view
		</p>

		<p style="width:20%; margin-left: 20px">{{ documentObject.created_at.replace('T', ' ').replace('.000000Z', '') }}</p>
		<p style="width:20%; margin-left: 20px">{{ documentObject.customer }}</p>
		<div style="width:20%; margin-left: 20px">
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

	data() {
		return {
			hover: false
		}
	},

	methods: {
		viewHistory() {
			this.$emit('view-kyc-history', this.documentObject)
		},

		editKYCDocument() {
			this.$emit('edit-kyc-document', this.documentObject)
		},

		deleteKYCDocument() {
			this.$emit('delete-kyc-document', this.documentObject)
		}
	}
}
</script>

<style scoped>
.kyc--card-container {
	width: 100%;
	/*height: 10rem;*/
	margin: 1.5rem auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	padding: 2rem;
	background-color: #FFFFFF;
	box-shadow: 0 10px 45px 0 rgba(0, 0, 0, .1);
	border-radius: 8px;
	position: relative;
}

.kyc--card--document-name {
	color: #2b2b2b;
}

.document-name--info {
	/*width: 1px;*/
	background: #365899;
	border-radius: 0 6px 6px 6px;
	font-size: 13px;
	line-height: 18px;
	color: #FFFFFF;
	padding: 6px;
	position: absolute;
	top: 38px;
	left: 50px;
	z-index: 99;
}
</style>
