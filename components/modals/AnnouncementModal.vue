<template>
	<modal name="announcement-modal" height="auto" >
		<div  style="display: block; padding-left: 9px;">
			<div>
				<div>
					<div class="modal-header" >
						<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>

					<div class="modal-body" v-if="show_home_page">
						<center>
							<img :src="announcement_information.image_url"/>
							<div class="mt-20">
								<p style="font-weight: 700; font-size: 32px; color: #365899;">{{announcement_information.title}}</p>
								<p style="font-size: 13px">{{announcement_information.body}}</p>
							</div>
						</center>
						<div style="text-align: right; padding: 20px">
							<a class="btn btn-danger">Close</a>
							<a class="btn btn-primary" @click="()=>{this.show_home_page = false}">Continue</a>
						</div>
					</div>
					<div class="modal-body" v-if="!show_home_page">
							<div class="padding-20">
								<p style="font-weight: 700; font-size: 18px; color: #365899;">What you can do on Teams?</p>
								<div class="mt-20 announcement_item">
            <div class="padding-10" style="display: flex" v-for="items in announcement_information.items">
													  <img src="/images/check-all.svg" class="m-r-5"/>
													   {{items}}
												</div>
								</div>
								<div style="text-align: right; padding: 10px 20px ">
									<a class="btn btn-danger">Close</a>
								</div>

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
  async getAnnouncement(){
			  try{
			  	 const announcement_information = await this.$axios.$get('announcements');
			  	 console.log(announcement_information.data)
			  	 this.announcement_title = announcement_information.data.title;
			  	 this.announcement_image_url = announcement_information.data.image_url;
						 this.announcement_description = announcement_information.data.body;
						 this.announcement_items = announcement_information.data.items;
					}catch (e) {

					}
		},
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
