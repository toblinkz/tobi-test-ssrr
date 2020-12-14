<template>
  <!-- BEGIN SIDEBPANEL-->
  <nav class="page-sidebar" data-pages="sidebar">
    <!-- BEGIN SIDEBAR MENU HEADER-->
    <div id="user-side-bar" class="sidebar-header">
      <center>
        <nuxt-link to="/">
          <img src="/images/logo.png"  width="120px"
               height="auto">
        </nuxt-link>
      </center>
    </div>
    <!-- END SIDEBAR MENU HEADER-->
    <!-- START SIDEBAR MENU -->
    <div class="sidebar-menu">
                        <span>
           <center>

             <img preview-for="image"  :src="imageUrl" class="circular" alt="">

            </center>

            </span>

      <ul class="nav">
        <li>
          <div class="m-t-10 padd-x">
            <center>
              <p class="text-center mt-10" style="color: #d3d3d3;">Per-Billing Account</p>
            </center>
          </div>
        </li>
        <Dropdown>
          <template v-slot:dropdown_title>
            <a  class="dropdown-toggle color-a btn-primary btn-cons bord" :aria-disabled="isDisabled"><span class="menu-text"><i class="entypo-cc"></i> Wallet <i class="caret"></i>
												</span></a>
          </template>
          <template v-slot:dropdown_menu v-if="show_drop_down">
            <li><nuxt-link to="/billing/fund"><i class="entypo-credit-card"></i> Top Up</nuxt-link></li>
            <li><nuxt-link to="/billing/transactions/history" ><i class="entypo-flow-tree"></i> History</nuxt-link></li>
            <li>
              <nuxt-link to="/invoices/all">
                <i class="entypo-basket"></i> Invoice
              </nuxt-link>
            </li>
            <li><nuxt-link to="/billing/balance-limit"><i class="entypo-key"></i> Alert <span class="badge badge-sm badge-sidebar">New</span></nuxt-link></li>
          </template>
        </Dropdown>
        <!-- BEGIN SIDEBAR MENU ITEMS-->
        <div class="clearfix mb-30"></div>
							<Dropdown>
								<template v-slot:dropdown_title>
									<a data-toggle="dropdown" class="dropdown-toggle color-a"><span class="menu-text"><i class="entypo-list"></i> Setup Sender
									    <i class="caret"></i></span> </a>
								</template>
								<template v-slot:dropdown_menu>
									<li><nuxt-link to="/sms/sender-id-management" ><i class="entypo-list-add"></i> Sender ID</nuxt-link></li>

								</template>
							</Dropdown>

							<li class="padd-x" v-if="show_drop_down">
								<nuxt-link  to="/devices" class="color-a level-1">
									<span> <i class="fa fa-barcode"></i> Manage Device </span>
									<span class="badge badge-sm badge-sidebar">New</span>
								</nuxt-link>
							</li>
							<li class="padd-x" v-if="show_drop_down">
								<nuxt-link to="/my-number" class="color-a level-1">
									<span> <i class="fa fa-tty "></i> Rent Numbers </span>
									 <span class="badge badge-sm badge-sidebar">New</span>
								</nuxt-link>
							</li>
        <Dropdown>
          <template v-slot:dropdown_title>
            <a data-toggle="dropdown" class="dropdown-toggle color-a" :aria-disabled="isDisabled"><span class="menu-text"><i class="entypo-users"></i> Add Contacts
									    <i class="caret"></i></span></a>
          </template>
          <template v-slot:dropdown_menu v-if="show_drop_down">
            <li><nuxt-link to="/phone-book" ><i class="entypo-user-add"></i> Single contacts</nuxt-link></li>
            <li><nuxt-link to="/sms/import-contacts"><i class="entypo-upload"></i> Bulk contacts</nuxt-link></li>
          </template>
        </Dropdown>
        <li class="padd-x" v-if="show_drop_down">
          <nuxt-link to="/message/select-type" class="color-a level-1">
            <span> <i class="entypo-paper-plane"></i> Compose message</span>
          </nuxt-link>
        </li>
        <Dropdown>
          <template v-slot:dropdown_title>
            <a data-toggle="dropdown" class="dropdown-toggle color-a" :aria-disabled="isDisabled"><span class="menu-text"><i class="entypo-chart-line"></i> Delivery Report
									    <i class="caret"></i></span></a>
          </template>
          <template v-slot:dropdown_menu v-if="show_drop_down">
            <li><nuxt-link to="/sms/history" ><i class="entypo-chart-area"></i> Direct Insights</nuxt-link></li>
            <li><nuxt-link to="/sms/campaign-reports"><i class="entypo-chart-pie"></i> Group Insights</nuxt-link></li>

          </template>
        </Dropdown>

        <div class="m-t-30 padd-x">
          <hr>
        </div>
        <Dropdown>
          <template v-slot:dropdown_title>
            <a data-toggle="dropdown" class="dropdown-toggle color-a" :aria-disabled="isDisabled"><span class="menu-text"><i class="entypo-code"></i> Developers
									    <i class="caret"></i></span></a>
          </template>
          <template v-slot:dropdown_menu v-if="show_drop_down">
            <li><a href="http://developer.termii.com" ><i class="entypo-code"></i> API Guide</a></li>
            <li><nuxt-link to="/account/api"><i class="entypo-key"></i> Api console</nuxt-link></li>
          </template>
        </Dropdown>
							<li class="padd-x">
								<a target="_blank" class="color-a level-1"  href="https://join.slack.com/t/termii-loop/shared_invite/zt-imbqlf68-w4lsPkOzibBXSQohu8_8dQ">
									<i class="entypo-users"></i> Join Community</a>
							</li>
        <li class="padd-x">
          <nuxt-link to="/account/profile" class="color-a level-1">
            <i class="entypo-cog"></i>
            Settings</nuxt-link>
        </li>

        <div class="clearfix"></div>

        <!-- END SIDEBAR MENU -->
      </ul>

    </div>
    <a class="sidebar-help-button" href="http://help.termii.com/en/" ><i class="entypo-help-circled"></i> Help Center</a>
  </nav>
</template>

<script>
    import Dropdown from "./dropdown/Dropdown";
    import {mapGetters} from "vuex";
    export default {
        name: "sidebar",
					   middleware: 'auth',
        components: { Dropdown},
				  	data(){
        	return{
													show_drop_down: true,
													imageUrl:  'https://termii.s3-us-west-1.amazonaws.com/upload/images/sBBQZhMRRLWpKP5hjTR7BZ.jpeg'
									}
					},
      computed: {
							isDisabled: function (){
        	return(!this.show_drop_down)
							}
      },

				async mounted() {
					if(this.$store.state.view_verify_page === 'true'){
						this.imageUrl = 'https://termii.s3-us-west-1.amazonaws.com/upload/images/sBBQZhMRRLWpKP5hjTR7BZ.jpeg';
					}else{
						if (JSON.parse(localStorage.getItem('user_data')).active_status_id.id ===  6){
							this.show_drop_down = false;
						}
						this.imageUrl = JSON.parse(localStorage.getItem('user_data')).image;

					}
				 }


				}

</script>

<style scoped>
  @import "../../assets/css/general_style/divpages.css";

  .nav {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
  }

  .nav > li > a {
    position: relative;
    display: block;
    padding: 7px 15px;
  }
  .color-a {
    color: #fff !important;
  }
  .btn-primary {
    color: #fff;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
  }
  .bord {
    border-radius: 5px 0px 0px 5px !important;
    border: none !important;
  }

  .caret {
    font-style: normal;
    font-weight: normal;
    border: 0;
    margin: 0;
    width: auto;
    height: auto;
    text-align: center;
    margin-top: -1px;
  }
  .caret {
    margin-left: 5px;
  }
  .caret:after {
    font-size: 18px;
    font-weight: 800;
  }
  .caret:after {
    content: '\e9c5';
    font-family: 'icomoon';
    display: block;
    font-size: 16px;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .caret{
    display: inline-block;
    vertical-align: middle;
  }
  .navbar-nav > .dropdown-user > a > span {
    display: inline-block;
    padding-left: 7px;
  }
  .btn-primary .badge {
    color: #2196F3;
    background-color: #fff;
  }
  .badge, .label {
    line-height: 1;
    white-space: nowrap;
    text-align: center;
  }
  .badge {
    display: inline-block;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 12px;
    color: #08a4da;
    border-radius: 10px;
  }
  .badge, .fa-stack {
    vertical-align: middle;
  }
  .badge-sm {
    font-size: 85%;
    padding: 2px 5px!important;
  }
  .badge {
    letter-spacing: 0.1px;
    border: 1px solid transparent;
  }
  .badge-sidebar {
    background: 0 0;
    border: 1px solid #08a4da;
    color: #08a4da !important;
    margin-left: 3px;
    margin-top: -2px;
  }
  .dropdown-menu > li {
    position: relative;
    margin-bottom: 1px;
  }
  .btn-primary:active:hover,
  .btn-primary.active:hover,
  .open > .dropdown-toggle.btn-primary:hover,
  .btn-primary:active:focus,
  .btn-primary.active:focus,
  .open > .dropdown-toggle.btn-primary:focus,
  .btn-primary:active.focus,
  .btn-primary.active.focus,
  .open > .dropdown-toggle.btn-primary.focus {
    color: #fff;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
    border: 1px solid transparent !important;
  }
  .nav .open > a, .nav .open > a:hover, .nav .open > a:focus {
    background-color: transparent;
    border-color: transparent;
    color: #333333;
  }
  .btn-primary:active, .btn-primary.active, .open > .dropdown-toggle.btn-primary {
    color: #fff;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
    border: 1px solid transparent !important;
  }
  .nav > li > a:hover, .nav > li > a:focus {
    text-decoration: none;
    background-color: #fff;
    color: #777 !important;
  }
  .sidebar-help-button {
    height: 35px;
    line-height: 35px;
    border-radius: 5px;
    background: #1a3d5d;
    display: inline-block;
    font-size: 13px;
    color: #fff !important;
    font-weight: 700;
    box-shadow: 0 5px 6px rgba(0,0,0,.05);
    position: relative;
    padding: 0 28px;
    margin-left: 35px;
    text-align: right;
    transition: all .3s;
    -webkit-transition: all .3s;
    transform: translateY(-55px);
    -webkit-transform: translateY(-55px);
  }

  @media (min-width: 769px){
    .nav > li {
      position: relative;
      display: block;
    }
  }



</style>
