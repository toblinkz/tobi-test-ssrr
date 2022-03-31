<template>
	 <div>
				<div class="sidebar-item-container"  @click="toggleMenuItem">
					<div class="name-color"><i :class="iconName" class="m-r-10"></i> {{itemName}}</div>
					<i class="caret"></i>
				</div>
			 <div class="sidebar-product-item-menu-container"  v-if="productNumber === 1 || showSidebarItemMenu">
				 	<slot name="menu-item"></slot>
				</div>

		</div>

</template>

<script>
export default {
	name: "SidebarProductItem",
	data(){
		return{
			showSidebarItemMenu: false
		}
	},
	props:{
		itemName: String,
		iconName: String,
		productNumber: Number
	},
	methods:{
		toggleMenuItem(){
			 if (this.productNumber === 1){
					  this.productNumber = 4;
					  this.showSidebarItemMenu = !this.showSidebarItemMenu;
							return;
				}
			 this.showSidebarItemMenu = !this.showSidebarItemMenu;
		}
	},
}
</script>

<style scoped>

.sidebar-item-container{
	display: flex;
	justify-content: space-between;
	padding: 0.6em 2.5em 0.6em 1.5em;
	margin: 1em 0 0 ;
	color: #FFFFFF;
	cursor: pointer;
}
.name-color{
	color: #FFFFFF;
	font-weight: 700;
}
.sidebar-product-item-menu-container{
	min-width: 160px;
	list-style: none;
	font-size: 13px;
	margin-top: 0.5em;
	margin-left: 2em;
}
.sidebar-product-item-menu-container > li > a {
	display: block;
	padding: 0.4em 2em;
	font-size: 14px;
	font-weight: 100;
	color: #FFFFFF;
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
</style>
