<template>
	<div class="action" v-click-outside="closeMenu">
		<img
			src="/images/icons/svg_icons/overflow-menu-vertical.svg"
			alt=""
			class="action-menu-icon"
			@click="toggleActionMenu"
		>

		<div class="action-menu" v-if="isActionMenuIconClicked">
			<div class="menu-option" @click="updateFunc" v-if="documentObject.status === 'PENDING'">
				<img src="/images/icons/svg_icons/update-icon.svg" alt="">
				<p>Update</p>
			</div>

			<div class="menu-option" @click="deleteFunc" v-if="documentObject.status !== 'APPROVED'">
				<img src="/images/icons/svg_icons/delete-icon.svg" alt="">
				<p>Delete</p>
			</div>

			<div class="menu-option" @click="viewHistoryFunc">
				<i class="fa fa-history" aria-hidden="true"></i>
				<p>View History</p>
			</div>
		</div>
	</div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
	name: "ActionMenu",

	props: {
		id: {
			type: String,
			required: true
		},

		documentObject: {
			type: Object,
			required: true
		}
	},

	data(){
		return {
			isActionMenuIconClicked: false
		}
	},

	methods: {
		toggleActionMenu(){
			this.isActionMenuIconClicked = !this.isActionMenuIconClicked
			// console.log('menu icon clicked', this.id)
		},

		closeMenu() {
			this.isActionMenuIconClicked = false
		},

		async updateFunc() {
			this.$emit('edit-kyc-document')
			this.closeMenu()
		},

		deleteFunc() {
			this.$emit('delete-kyc-document')
			this.closeMenu()
		},

		viewHistoryFunc() {
			this.$emit('view-history')
			this.closeMenu()
		}
	},

	directives: {
		ClickOutside
	}
}
</script>

<style scoped>
.action {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	position: relative;
}

.action-menu-icon {
	cursor: pointer;
	margin-left: 20px;
}

.action-menu {
	position: absolute;
	right: 0;
	top: 25px;
	width: 140px;
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
	cursor: pointer;
	width: 100%;
	vertical-align: middle;
	padding: 10px;
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
</style>
