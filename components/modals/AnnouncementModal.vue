<template>
	<modal name="announcement-modal" height="auto" >
		<div  style="display: block; padding-left: 9px;" v-if="announcement_information.length !== 0">
			<div>
				<div>
					<div class="modal-header" >
						<button type="button" class="close"  aria-label="Close"><span style="cursor:pointer;" @click="close">&times;</span></button>
					</div>

					<div class="modal-body mt-20" v-if="show_home_page">
						<center>
							<img :src="announcement_information.data.image_url" width="500"/>
							<div class="mt-20">
								<p style="font-weight: 700; font-size: 32px; color: #365899;">{{announcement_information.data.title}}</p>
								<p style="font-size: 13px; padding-left: 50px; padding-right: 50px">{{announcement_information.data.body}}</p>
							</div>
							<div style="padding: 20px" v-if="announcement_information.data.items.length !==0 ">
								<a class="btn btn-primary" @click="()=>{this.show_home_page = false}">Continue  <i class="entypo-right-thin"></i> </a>
							</div>
						</center>
					</div>
					<div class="modal-body" v-if="!show_home_page ">
							<div class="padding-10">
								<p style="font-weight: 700; font-size: 18px; color: #365899;">What you can do on Teams?</p>
								<div class="mt-20 announcement_item">
            <div class="padding-10" style="display: flex" v-for="items in announcement_information.data.items">
													  <img src="/images/check-all.svg" class="m-r-5"/>
													   {{items}}
												</div>
								</div>
								<center>
									<div style="padding: 20px" >
										<a class="btn btn-primary" @click="close()">Done</a>
									</div>
								</center>
							</div>

					</div>
				</div>
			</div>
		</div>
	</modal>
</template>

<script>
export default {
name: "AnnouncementModal",
	data(){
	return{
		show_home_page: true
	}
},
	props:{
		announcement_information:{
			 required: true
		}
	},
methods:{

	close(){
		this.$modal.hide('announcement-modal');
	}
},
	mounted() {

	}
}
</script>

<style scoped>
@import "../../assets/css/modal/modal.css";
.announcement_item{
	background: #F5F5F5;
	opacity: 0.8;
	border-radius: 5px;
	padding: 10px;
}
</style>
