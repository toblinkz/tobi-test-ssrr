<template>
		<div>
			  <a v-if="hasMenuItem" @click="toggleSidebarItemMenu" class="sidebar-item-container" :class="{ 'sidebar-item-margin':!isMainItem, 'sidebar-item-color': isMainItem, 'sidebar-main-item-margin':isMainItem}">
						<div class="name-color"><i :class="iconName" class="m-r-10"></i> {{itemName}}</div>
						<slot name="caret-icon" v-if="showSidebarItemMenu"></slot>
						<i class="fa fa-angle-right" v-if="!showSidebarItemMenu"></i>

					</a>
					<nuxt-link v-if="!hasMenuItem" :to="routeName" class="sidebar-item-container " :class="{ 'sidebar-item-margin':!isMainItem, 'sidebar-item-color': isMainItem, 'sidebar-main-item-margin':isMainItem}">
						<div class="name-color"><i :class="iconName" class="m-r-10"></i> {{itemName}}</div>
						<slot name="caret-icon"></slot>

					</nuxt-link>
					<div class="sidebar-item-menu-container" v-if="showSidebarItemMenu && hasMenuItem">
							<slot name="sidebar-item-menu"></slot>
					</div>
		</div>
</template>

<script>
export default {
	name: "SidebarItem",
	data(){
		return{
			 showSidebarItemMenu: false,
		}
	},
	methods:{
		toggleSidebarItemMenu(){
			 this.showSidebarItemMenu = !this.showSidebarItemMenu;
		},
		close (e) {
			if (!this.$el.contains(e.target)){
				this.showSidebarItemMenu = false;
			}
		},
	},
	mounted () {
		document.addEventListener('click', this.close)
	},
	beforeDestroy () {
		document.removeEventListener('click',this.close)
	},
	props:{
		isUpdated: Boolean,
		itemName:  String,
		iconName:  String,
		routeName: String,
		isMainItem: Boolean,
		hasMenuItem: Boolean
	},
}
</script>

<style scoped>
.sidebar-item-container{
	display: flex;
	justify-content: space-between;
	padding: 0.6em 2.5em 0.6em 1.5em;
}
.sidebar-item-color{
	color: #FFFFFF;
	background: linear-gradient(-48deg,#0dcbe5 -30%,#365899 60%)!important;
}
.sidebar-main-item-margin{
	margin: 1em 0 0 ;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
}
.sidebar-item-margin{
	margin: 0.1em 0;
}
.name-color{
	color: #FFFFFF;
}
.sidebar-item-menu-container{
	position: absolute;
	left: 0;
	z-index: 1000;
	float: left;
	min-width: 160px;
	padding: 5px 0;
	margin: 2px 0 0 1em;
	list-style: none;
	font-size: 13px;
	text-align: left;
	background-color: #fff;
	border: 1px solid #efefef;
	border-radius: 3px;
	-webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
	background-clip: padding-box;
}
.sidebar-item-menu-container > li > a {
	display: block;
	padding: 15px 20px;
	font-size: 14px;
	font-weight: 100;
	color: #777;
}
.sidebar-item-menu-container > li > a:hover {
	background: #c8e9e6;
	color: #000 !important;
}
.caret:after {
	font-size: 18px;
	font-weight: 800;
	content: "\e9c5";
	font-family: "icomoon";
	display: block;
	font-size: 16px;
	line-height: 1;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.caret{
	margin-top: 3px;
	display: inline-block;
	vertical-align: middle;
}
.caret{
	font-style: normal;
	font-weight: 400;
	border: 0;
	width: auto;
	height: auto;
	text-align: center;
	margin: -1px 0 0;
	margin-left: 5px;
}

</style>
