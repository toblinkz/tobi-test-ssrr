<template>
	<div class="padding-sides mt-70 campaign-page">
		<main>
			<div class="campaign-history-header">
				<div class="campaign-history-title">
					<div class="group-sms-div">
						<img src="/icons/svg_icons/messaging-icon.svg" width="20px" alt="">
						<p>Group SMS Campaign History</p>
					</div>
					<p class="campaign-history-subtitle">View all Group SMS Campaign history</p>
				</div>
				<div class="campaign-insight-graph-button">
					<img src="/icons/svg_icons/entypo_bar-graph.svg" width="16px" alt="">
					<p>View insight graph</p>
				</div>
			</div>

			<div class="filter-group">
				<div class="campaign-pill" >
					<button class="status-button " :class="{'all': all_active}" @click="display_all">All</button>
					<button class="status-button" :class="{'scheduled': scheduled_active}" @click="display_scheduled">Scheduled</button>
					<button class="status-button" :class="{'running': running_active}" @click="display_running">Running</button>
					<button class="status-button" :class="{'delivered': delivered_active}" @click="display_delivered">Delivered</button>
				</div>
				<form @submit.prevent="filterCampaignReport" role="form" method="get" id="search-form">
					<div class="date-picker-input">
						<date-picker @change="filterByDateRange"	v-model="date_time" value-type="YYYY-MM-DD " type="date" range style="width: 100%" placeholder="Search using date range" confirm></date-picker>
					</div>
				</form>
			</div>

			<TableVuePlaceHolder v-if="!show_shimmer"></TableVuePlaceHolder>

			<div class="campaigns" v-else>
				<div class="campaigns-header">
					<span class="ellipse"
											v-bind:class="{
															delivered: campaign_status === 'Delivered',
															scheduled: campaign_status === 'Scheduled',
															running: campaign_status === 'Running',
						}"></span>
					<p style="margin-left: -90px">Campaign ID</p>
					<p style="margin-left: 20px">Created at</p>
					<p style="margin-left: -20px">Run at</p>
					<p style="margin-left: 5px">From</p>
					<p>Status</p>
					<p style="margin-right: -10px">Action</p>
				</div>
			</div>

				<CampaignReportCard
					v-for="campaign in campaign_report"
					:key="campaign.campaign_id"
					:campaign_id="campaign.campaign_id"
					:phonebook="campaign.phone_book"
					:recipients="campaign.total_recipients"
					:created_at="campaign.created_at"
					:run_at="campaign.run_at"
					:sender="campaign.sender"
					:campaign_status="campaign.status"
					:campaign_status_filter=campaign_status
					@show-delete-modal="showDeleteModal"
				/>

			<Pagination
				:page="page"
				:total_page="total_page"
				:on-page-change="onPageChange"
				v-show="showPagination === true"
			>
			</Pagination>
		</main>

		<ConfirmCampaignDeleteModal :campaign_id="campaign_id"></ConfirmCampaignDeleteModal>
		<CampaignDeleteSuccessfulModal @refetch-campaign-reports="this.fetch"></CampaignDeleteSuccessfulModal>
		<VerificationModal></VerificationModal>
<!--		<UpdateCompanyNameModal></UpdateCompanyNameModal>-->
	</div>
</template>

<script>
import Sidebar from "../../components/general/Sidebar";
import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
import Pagination from "../../components/general/Pagination";
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';
import TableVuePlaceHolder from "../../components/general/TableVuePlaceHolder";
import VerificationModal from "~/components/modals/VerificationModal";
import UpdateCompanyNameModal from "../../components/index/modals/UpdateCompanyNameModal";

import CampaignReportCard from "../../components/message-reports/campaign/CampaignReportCard";
import ConfirmCampaignDeleteModal from "../../components/message-reports/campaign/modals/ConfirmCampaignDeleteModal";
import CampaignDeleteSuccessfulModal from "@/components/message-reports/campaign/modals/CampaignDeleteSuccessfulModal";

export default {
	name: "campaign-reports",
	middleware: ['auth', 'inactive_user', 'permission'],
	components: {
		CampaignReportCard,
		ConfirmCampaignDeleteModal,
		CampaignDeleteSuccessfulModal,
		UpdateCompanyNameModal,
		VerificationModal, TableVuePlaceHolder, Pagination, DashboardNavbar, Sidebar, DatePicker},
	data(){
		return{
			isLoading: false,
			showIcon: true,
			searchText: 'Search',
			campaign_report:[],
			customer_permissions: localStorage.getItem('permissions'),
			date_time: null,
			page: 1,
			total_page:'',
			showPagination: false,
			show_shimmer: false,
			campaign_status: '',
			all_active: true,
			scheduled_active: false,
			running_active: false,
			delivered_active: false,
			campaign_id: ''
		}
	},

	computed:{
		Disabled: function () {
			return (this.date_time === null);
		},
	},

	methods:{
		filterByDateRange(){
			console.log(this.date_time)
			this.filterCampaignReport()
		},

		showDeleteModal(campaign_id){
			this.campaign_id = campaign_id
			this.$modal.show('confirm-campaign-delete-modal')
			// this.$modal.show('campaign-delete-successful-modal')
		},

		async fetch(){
			//get campaign reports
			try {
				let response_data = await this.$campaign.getCampaignReports(this.page)
				this.campaign_report = response_data.data;

				if (this.campaign_report.length !== 0){this.showPagination = true;}
				this.page = response_data.meta.current_page;
				this.total_page = response_data.meta.last_page;
				this.show_shimmer = true;

			}catch (e) {}
		},

		async filterCampaignReport(){
			this.isLoading = true;
			this.searchText = '';
			this.showIcon = false;
			try {
				let response_data = await this.$campaign.filterCampaignReport(this.page, this.date_time[0], this.date_time[1])
				this.campaign_report = response_data.data;

				if (this.campaign_report.length !== 0){this.showPagination = true;}
				this.page = response_data.meta.current_page;
				this.total_page = response_data.meta.last_page;
				this.show_shimmer = true;

				this.isLoading = false;
				this.searchText = 'Search';
				this.showIcon = true;

				this.$toast.success('Search completed');
			}catch (e) {
				this.$toast.error('Something went wrong. Try again!');
				this.isLoading = false;
				this.searchText = 'Search';
				this.showIcon = true;
			}
		},

		isDisabled(status){
			return (status === 'In progress');
		},

		onPageChange(page) {
			this.page = page;
			this.show_shimmer = false;
			this.fetch();
		},

		async filterByStatus(){
			console.log(this.campaign_status)
			try {
						let response_data = await this.$campaign.filterCampaignReport(this.page, this.campaign_status)
						this.campaign_report = response_data.data;
			}catch (e) {}
		},

		async display_all(){
			this.campaign_status = 'All';
			this.page = 1;
			await this.filterCampaignReport();
			this.all_active = true;
			this.scheduled_active = false;
			this.running_active = false;
			this.delivered_active = false;
		},

		async display_scheduled(){
			this.campaign_status = 'Scheduled';
			this.page = 1;
			await this.filterByStatus();
			this.all_active = false;
			this.scheduled_active = true;
			this.running_active = false;
			this.delivered_active = false;

		},

		async display_running(){
			this.campaign_status = 'Running';
			this.page = 1;
			await this.filterByStatus();
			this.all_active = false;
			this.scheduled_active = false;
			this.running_active = true;
			this.delivered_active = false;
		},

		async display_delivered(){
			this.campaign_status = 'Delivered';
			this.page = 1;
			await this.filterByStatus();
			this.all_active = false;
			this.scheduled_active = false;
			this.running_active = false;
			this.delivered_active = true;
		},
	},

	mounted() {
		if(this.$store.state.view_verify_page === 'true'){
			this.$modal.show('verification-id-modal');
		}else {
			this.fetch();
		}
	}
}
</script>

<style scoped>
.campaign-page {
	width: 950px;
	margin: 0 auto;
}

p {
	padding: 0;
	margin: 0;
}

.campaign-history-header{
	margin: 150px 0 60px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}

.campaign-history-title {
	margin-left: 30px;
}

.group-sms-div {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	/*width: 260px;*/
}

.group-sms-div p {
	margin-left: 10px;
	vertical-align: middle;
	font-weight: bold;
	font-size: 18px;
	line-height: 21px;
	/*letter-spacing: -0.01em;*/
	color: #365899;
}
.campaign-history-subtitle {
	margin-top: 6px;
}

.campaign-insight-graph-button {
	cursor: pointer;
	padding: 11px 28px;
	color: #FFFFFF;
	background: linear-gradient(97.92deg, #4D6BA4 20.72%, #238FBE 74.67%);
	border-radius: 4px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
	transition: all 0.2s ease-out;
}

.campaign-insight-graph-button:focus,
.campaign-insight-graph-button:active {
	box-shadow: none;
}

.campaign-insight-graph-button > p {
	margin-left: 15px;
}

main {
	margin-left: -60px;
}

.filter-group {
	display: flex;
	flex-direction: row;
	width: 950px;
	justify-content: space-between;
}

.campaign-pill {
	display: flex;
	flex-direction: row;
	width: 340px;
	justify-content: space-between;
	margin-bottom: 30px;
	margin-left: 60px;
}

.status-button{
	padding: 2px 10px;
	margin: 2px 0;
	outline: none;
	color: #A9A9A9;
	border: 1px solid #A9A9A9;
	cursor: pointer;
	/*width: 44px;*/
	height: 26px;
	background-color: #FFFFFF;
	border-radius: 6px;
	transition: all 0.2s ease-out;
}
.status-button.all{
	background: #365899;
	color: #fff;
	border: 1px solid #365899;
}

.status-button.scheduled{
	background: #BE6105;
	color: #fff;
	border: 1px solid #BE6105;
}
.status-button.running{
	background: #F4BA0C;
	color: #fff;
	border: 1px solid #F4BA0C;
}
.status-button.delivered{
	background: #4AB14E;
	color: #fff;
	border: 1px solid #4AB14E;
}

.date-picker-input {
	width: 214px;
	height: 38px;
}

.campaigns {
	width: 950px;
	/*margin: 0 auto;*/
	margin-bottom: 35px;
	/*margin-left: -60px;*/
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}

.campaigns-header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	width: 946px;
	padding: 24px 32px 0;
}

.campaigns-header > p {
	padding: 0;
	margin: 0;
	font-weight: 600;
}

.ellipse {
	background-color: #365899;
	width: 10px;
	height: 10px;
	border-radius: 10px;
	/*border-radius: 50%;*/
	margin-top: 3px;
}

.ellipse.delivered {
	background: #4AB14E;
}
.ellipse.scheduled {
	background: #BE6105;
}
.ellipse.running {
	background: #F4BA0C;
}

@media (min-width: 769px){
	.content-wrapper {
		display: table-cell;
		vertical-align: top;
	}
}
@media (min-width: 769px){
	.page-content {
		display: table-row;
	}
}

.content-wrapper {
	width: 100%;
}
@media screen and (min-width: 769px){
	.container .jumbotron, .container-fluid .jumbotron {
		padding-left: 60px;
		padding-right: 60px;
	}
}
@media (min-width: 769px){
	.page-container {
		width: 100%;
		display: table;
		table-layout: fixed;
	}
}

@media screen and (min-width: 769px){
	.jumbotron {
		padding-top: 48px;
		padding-bottom: 48px;
	}
}
</style>
