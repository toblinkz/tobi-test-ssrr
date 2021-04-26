<template>
  <div class="body navbar-fixed-top navbar navbar-inverse" style="z-index: 800;background-color: #ffffff;">
    <div class="navbar-header">
      <nuxt-link class="visible-menu-icon navbar-brand " to="/">
        <img src="/images/logo.png" alt="">
      </nuxt-link>
      <ul  class="nav navbar-nav pull-right visible-menu-icon" >
        <li>
          <a class="mobile-menu-button" data-toggle="collapse" ><i  class="icon-menu7 " style="color: #000;" @click.stop="menu = !menu"></i></a></li>
      </ul>
    </div>
    <div class="navbar-header hidden-xs" style="margin-left: 30px; margin-top: 18px">
      <div id="google_translate_element" style="margin-left: 20px "></div>
      <script type="text/javascript">
        function googleTranslateElementInit() {
          new google.translate.TranslateElement({
            pageLanguage: 'en',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
          }, 'google_translate_element');
        }
      </script>

      <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
					<script>
						// @see https://docs.headwayapp.co/widget for more configuration options.
						var HW_config = {
							selector: "#headway", // CSS selector where to inject the badge
							account:  "J1d207"
						}
					</script>
					<script async src="https://cdn.headwayapp.co/widget.js"></script>
    </div>
      <div class="navbar-collapse collapse " id="navbar-mobile">


        <ul class="nav navbar-nav navbar-right">

          <li class="m-left hidden-xs" v-if="canComposeMessage">
            <nuxt-link to="/message/select-type" type="button" class="btn stretch-a" style="height: 30px !important;margin-top: 8px !important;padding-bottom: 26px;
               color: #fff !important;padding-top: 7px !important;background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);font-weight: 100 !important;">
              <i class="entypo-paper-plane " style="font-size: 14px;"></i> Compose message
            </nuxt-link>
          </li>
          <Dropdown id="mobile-menu" class="hide-menu" style="margin-right: 10px;">
            <template v-slot:dropdown_title>
              <a class="dropdown-toggle stretch-a" data-toggle="dropdown" style="color: #2c2c2c !important;">
                <img preview-for="image" :src="imageUrl"  alt=""><span style="margin-left: 5px;"> Quick Menu</span>
                <i class="caret"></i>
              </a>
            </template>
            <template v-slot:dropdown_menu>
              <li v-if="canTopUp"><nuxt-link to="/billing/fund"><i class="entypo-credit-card"></i> Top Up</nuxt-link></li>
              <li v-if="canComposeMessage">
                <nuxt-link to="/message/select-type">
                  <i class="entypo-paper-plane"></i><span> Message</span>
                </nuxt-link>
              </li>

              <li v-if="canViewDeliveryReport">
                <nuxt-link to="/sms/history">
                  <i class="entypo-chart-line"></i><span> Reports</span>
                </nuxt-link>
              </li>

              <li  v-if="canViewProfile">
                <nuxt-link to="/account/profile"><i class="entypo-vcard"></i> Account</nuxt-link>
              </li>

              <li><a @click="logout"><i class="icon-switch2" ></i> logout</a></li>
            </template>
          </Dropdown>

										<li class="headway hidden-xs" style="color: #fff !important; margin-right: 65px;" id="headway">
											<div title="Change log" style="float: left;top: -2px;font-size: 20px;border-width: 0 1px;position: relative;height: 40px;line-height: 42px;cursor: pointer;color: #2c2c2c !important;">
												<i class="entypo-bell"></i></div>
										</li>

        </ul>
      </div>
    </div>
</template>

<script>
  import Dropdown from "../dropdown/Dropdown";
		import jwt_decode from "jwt-decode";
  export default {
    name: "DashboardNavbar",
		 	middleware: 'auth',
    components: {Dropdown},
			head: {
				script: [
					 // {src:"/js/auto-logout.js" },
				],
			},
    data(){
      return{
        isOpen:'false',
        email:"",
								permission_data : [],
								customer_permissions:[],
							 imageUrl: 'https://termii.s3-us-west-1.amazonaws.com/upload/images/sBBQZhMRRLWpKP5hjTR7BZ.jpeg'
      }
    },
			 computed:{
					menu:{
						get(){
							return this.$store.state.menu.open
						},
						set (val) {
							this.$store.commit('menu/toggle', val)
						}
					},
					canTopUp(){
						return (this.customer_permissions.includes("top_up_wallet"));
					},
					canComposeMessage(){
						return (this.customer_permissions.includes("send_message"));
					},
					canViewDeliveryReport(){
						return (this.customer_permissions.includes("view_delivery_report"));
					},
					canViewProfile(){
						return (this.customer_permissions.includes("view_profile"));
					}
				},
    methods: {
					getUserPermissions(){
						this.permissions_data = JSON.parse(localStorage.getItem('user_data')).permissions;
						this.permissions_data.forEach((permission) => {
							this.customer_permissions.push(permission.name);
						});
					},
      toggle: function () {
        this.isOpen = !this.isOpen
      },
					decode(){

						let timeout = localStorage.getItem('ET')
							setTimeout(  async function () {
								try {
									await $nuxt.$axios.$get('auth/logout');
									$nuxt.$store.commit('setLIState', false);
									localStorage.clear();
									await $nuxt.$router.push({name: 'login'});
									$nuxt.$store.commit('setViewVerificationPage', 'false');
									$nuxt.$toast.error("Token has Expired")

								}catch (e) {

								}
										}, timeout);

					},

      toggleMenu(){
        $("#mobile-menu").toggleClass("hide-menu");
      },
      async logout(){
      	try {
      		await this.$axios.$get('auth/logout');
							 this.$store.commit('setLIState', false);
								await localStorage.clear();
								await this.$router.push({name: 'login'});
								this.$store.commit('setViewVerificationPage', 'false');
								location.reload();
							} catch (e) {

							}
      }
    },
			async mounted() {
    	this.getUserPermissions();
				if(this.$store.state.view_verify_page === 'true'){
						this.imageUrl = 'https://termii.s3-us-west-1.amazonaws.com/upload/images/sBBQZhMRRLWpKP5hjTR7BZ.jpeg';
				}else{
					this.imageUrl = JSON.parse(localStorage.getItem('user_data')).image;
					this.decode();
				}
			 }


		}

</script>


<style scoped src="~/assets/css/general_style/dashboardNavbar.css">

</style>
