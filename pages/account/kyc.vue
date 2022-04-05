<template>
	<div>
		<SettingsTabHeader
			:titleIcon="'entypo-newspaper'"
			:titleText="'Know Your Customer'"
			:body="'You can upload your KYC documents to validate the identity of your business.'"
			:tabImage="'/images/customers.gif'"
		/>

		<ApiNavbar/>

		<TableVuePlaceHolder v-if="isLoading"  />

		<div v-if="!isLoading">
			<div v-if="!isBreadCrumbShown" class="kyc--add-document-container">
				<div
					class="kyc--add-document"
					@click="showAddKYCModal"
					:class="{
				'kyc--add-document--left': !this.isKYCListIsEmpty,
				'kyc--add-document--center': this.isKYCListIsEmpty
			}"
				>
					Submit a KYC Document
				</div>
			</div>

			<div v-if="!isBreadCrumbShown" class="content-container">
				<div v-if="!isKYCListIsEmpty" class="mt-40 hidden-xs"
									style="display: flex; justify-content: space-between; font-size: 15px; font-weight: bold; width: 100%;">
					<span style="width: 25%; margin-left: 2rem">Document Name</span>
					<span style="width:20%; margin-left: 20px">Created At</span>
					<span style="width:20%; margin-left: 20px">Action By</span>
					<span style="width:20%; margin-left: 20px">Status</span>
					<span style="width:15%; margin-left: 20px"><span style="float: right; margin-right: 30px">Action</span></span>
				</div>

				<div v-if="!isKYCListIsEmpty" style="border-bottom: dotted #ddd!important; margin-top: 20px; width: 100%;"></div>

				<KYCCard
					v-for="row in documents"
					:key="row.id"
					:document-object="row"
					@view-kyc-history="displayHistory"
					@edit-kyc-document="showEditKYCModal"
					@delete-kyc-document="showDeleteKYCModal"
				/>
			</div>
		</div>

		<div v-if="isBreadCrumbShown">
			<div class="kyc--breadcrumb">
				<span class="kyc--list-link" @click="switchBackToKYCList">KYC List</span>
				<i class="fa fa-chevron-right" aria-hidden="true" style="margin: 0 6px; font-size: 12px"></i>
				<span>{{ kycDocument.name_of_file }}</span>
			</div>
			<TableVuePlaceHolder v-if="isLogsLoading" style="margin-top: -4rem" />
			<KYCHistoryCard v-if="!isLogsLoading" :kyc-document-logs="kycDocumentLogs"/>
		</div>

		<AddKYCDocument @refresh-kyc-list="getKYC"/>
		<EditKYCDocument :kyc-document="kycDocument" @refresh-kyc-list="getKYCWithoutSkeletonLoader"/>
		<ConfirmKYCDocumentDeleteModal @refresh-kyc-list="getKYCWithoutSkeletonLoader" :id="kycDocument.id"/>

	</div>
</template>

<script>
import ApiNavbar from "@/components/general/navbar/ApiNavbar";
import SettingsTabHeader from "@/components/settings/SettingsTabHeader";
import KYCCard from "@/components/settings/KYCCard";
import AddKYCDocument from "@/components/settings/modals/AddKYCDocument";
import EditKYCDocument from "@/components/settings/modals/EditKYCDocument";
import KYCHistoryCard from "@/components/settings/KYCHistoryCard";
import ConfirmKYCDocumentDeleteModal from "@/components/settings/modals/ConfirmKYCDocumentDeleteModal";
import TableVuePlaceHolder from "@/components/general/TableVuePlaceHolder";

export default {
	name: "kyc",
	middleware: ['auth', 'inactive_user', 'permission'],
	components: {
		ConfirmKYCDocumentDeleteModal,
		KYCHistoryCard,
		AddKYCDocument,
		EditKYCDocument,
		KYCCard,
		SettingsTabHeader,
		ApiNavbar,
		TableVuePlaceHolder
	},

	data() {
		return {
			isLoading: false,
			isLogsLoading: false,
			isKYCListIsEmpty: true,
			isBreadCrumbShown: false,
			documents: [],
			customerPermissions: localStorage.getItem('permissions'),
			kycDocument: {},
			kycDocumentLogs: [],
		}
	},

	methods: {
		async getKYC() {
			this.isLoading = true
			try {
				let kyc = await this.$kyc.getKYC()
				this.documents = kyc.data

				this.isLoading = false
				this.isKYCListIsEmpty = this.documents.length === 0;
			} catch (e){}
		},

		async getKYCWithoutSkeletonLoader() {
			try {
				let kyc = await this.$kyc.getKYC()
				this.documents = kyc.data
				this.isKYCListIsEmpty = this.documents.length === 0;
			} catch (e){}
		},

		switchBackToKYCList() {
			this.isBreadCrumbShown = false
		},

		async displayHistory(e) {
			this.isBreadCrumbShown = true
			this.kycDocument = e

			this.isLogsLoading = true

			let response = await this.$kyc.getKYCLogs(e.id)
			this.isLogsLoading = false
			this.kycDocumentLogs = response.data
		},

		showEditKYCModal(e) {
			this.kycDocument = e
			this.$modal.show('edit-kyc-document-modal')
		},

		showAddKYCModal() {
			this.$modal.show('add-kyc-document-modal')
		},

		showDeleteKYCModal(e) {
			this.kycDocument = e
			this.$modal.show('confirm-kyc-document-delete-modal')
		},
	},

	mounted() {
		this.getKYC()
	}
}
</script>

<style scoped>
.content-container {
	margin: 0 auto;
	padding: 0;
	width: 100rem;
}

.kyc--add-document-container {
	width: 100rem;
	margin: 0 auto;
}

.kyc--add-document {
	width: 180px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	color: #FFFFFF;
	padding: 10px 8px;
	background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
	box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
	border-radius: 8px;
	font-size: 14px;
}

.kyc--add-document--left {
	margin: 30px 0;
}

.kyc--add-document--center {
	margin: 40px auto;
}

.kyc--add-document:hover {
	cursor: pointer;
	box-shadow: none;
}

.kyc--breadcrumb {
	width: 100rem;
	margin: 2rem auto;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	font-size: 1.6rem;
	color: #777777;
}

.kyc--breadcrumb > i,
.kyc--breadcrumb > span {
	border-bottom: 1px solid transparent;
}

.kyc--list-link:hover {
	cursor: pointer;
	text-decoration: underline;
}
</style>
