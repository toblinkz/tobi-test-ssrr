<template>
<div class="card-container">
	<span class="ellipse"
							v-bind:class="{
										delivered: campaign_status_filter === 'Delivered',
										scheduled: campaign_status_filter === 'Scheduled',
										running: campaign_status_filter === 'Running',
	}"></span>
	<div class="campaign-id-group">
		<p class="campaign-id">{{ campaign_id }}</p>
		<p class="phonebook">Phonebook: {{ phonebook }}</p>
		<p class="recipients">Recipients: {{recipients}}</p>
	</div>
	<div class="central_info">
		<div class="date">{{ created_at }}</div>
		<div class="date">{{run_at}}</div>
		<div class="sender">{{ sender }}</div>
		<div class="status"
							v-bind:class="{
										delivered: campaign_status === 'Delivered',
										scheduled: campaign_status === 'Scheduled',
										running: campaign_status === 'Running',
							}">
			{{ campaign_status }}
		</div>
	</div>

	<div class="action" v-click-outside="closeMenu">
		<img src="/images/icons/svg_icons/overflow-menu-vertical.svg" alt="" @click="toggleMenu">

		<div class="menu" v-if="isMenuOpen">
			<a @click="storeCreatedAtAndShowInsight"  class="menu-option view-report">
				<img src="/images/icons/svg_icons/entypo_popup.svg" alt="">
				<p>View report</p>
			</a>

			<div v-if="campaign_status === 'Scheduled'" class="menu-option delete-campaign" @click="showDeleteModal">
				<img src="/images/icons/svg_icons/delete-icon.svg" alt="">
				<p>Delete campaign</p>
			</div>
		</div>
		</div>
</div>
</template>

<script>
import ClickOutside from "vue-click-outside"

export default {
	name: "campaign-report-card",
	components: {
	},
	props: [
		"campaign_id",
		"phonebook",
		"recipients",
		"created_at",
		"run_at",
		"sender",
		"campaign_status",
		"campaign_status_filter",
	],
	data(){
		return {
			isMenuOpen: false,
			isDeleteModalShown: false,
		}
	},
	methods: {
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen
		},
		showDeleteModal(){
			this.isMenuOpen = !this.isMenuOpen
			this.$emit('show-delete-modal', this.campaign_id, this.run_at)
		},
		closeMenu() {
			this.isMenuOpen = false
		},
		storeCreatedAtAndShowInsight(){
			 this.$store.commit('setCampaignCreatedDate', this.created_at);
			 this.$router.push('campaign/history/' + this.campaign_id)
		}
	},

	directives: {
		ClickOutside
	},
}
</script>

<style scoped>

.card-container {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	width: 946px;
	background: #FFFFFF;
	box-shadow: 5px 4px 26px 2px rgba(0, 0, 0, 0.07);
	border-radius: 4px;
	margin: 15px 0 0;
	padding: 24px 32px 10px;
	position: relative;
}

.ellipse {
	background-color: #365899;
	width: 10px;
	height: 10px;
	border-radius: 10px;
	margin-top: 3px;
}

.campaign-id-group {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	font-style: normal;
	font-weight: 500;
	margin-left: 20px;
	width: 195px;
}

.campaign-id {
	font-size: 14px;
	line-height: 16px;
	letter-spacing: 0.01em;
	text-transform: uppercase;
	color: #333333;
}

.phonebook {
	font-size: 13px;
	line-height: 15px;
	color: #94969A;
}

.recipients {
	font-size: 13px;
	line-height: 15px;
	color: #334058;
}

.central_info{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	align-self: flex-start;
	margin-left: 20px;
}

.date {
	width: 84px;
	font-weight: normal;
	font-size: 14px;
	line-height: 20px;
	color: #333333;
	margin-right: 72px;
}

.sender {
	font-size: 14px;
	line-height: 16px;
	color: #333333;
	margin-right: 40px;
	text-align: left;
	width: 90px;
	word-break: break-word;
}

.status {
	width: 76px;
	height: 22px;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 12px;
	line-height: 14px;
	text-align: center;
	color: #FFFFFF;
	vertical-align: middle;
	margin-right: 94px;
}

.delivered {
	background: #4AB14E;
}
.scheduled {
	background: #BE6105;
}
.running {
	background: #F4BA0C;
}

.action {
	cursor: pointer;
}

.menu {
	position: absolute;
	width: 180px;
	background: #FFFFFF;
	box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.15);
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	z-index: 10;
}

.menu-option {
	width: 100%;
	vertical-align: middle;
	padding: 14px 20px;
	margin: 0;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	transition: all 0.2s ease-out;
	text-decoration: none;
}

.menu-option p {
	margin: 0 0 0 10px;
	vertical-align: middle;
	text-decoration: none;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	color: #333333;
}

.menu-option:hover {
	background-color: #d5d5d5;
	border-radius: 4px;
}

.menu-option.delete-campaign {
	border-top: 1px solid #F4F4F4;
	color: #C10202;
	width: 180px;
}

.menu-option.view-report {
	text-decoration: none;
}

</style>
