<template>
  <div class="body navbar-fixed-top navbar navbar-inverse" style="z-index: 800;background-color: #ffffff;">
    <div class="navbar-header">
      <a class="navbar-brand visible-xs-block" href="/">
        <img src="/images/logo.png" alt="">
      </a>
      <ul  class="nav navbar-nav pull-right visible-xs-block" >
        <li>
          <a class="mobile-menu-button" data-toggle="collapse" ><i  class="icon-menu7" style="color: #000;" @click="toggleMenu"></i></a></li>
      </ul>
    </div>
    <div class="navbar-header hidden-xs" style="margin-left: 250px; margin-top: 18px">
      <div id="google_translate_element"></div>
      <script type="text/javascript">
        function googleTranslateElementInit() {
          new google.translate.TranslateElement({
            pageLanguage: 'en',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
          }, 'google_translate_element');
        }
      </script>

      <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    </div>
      <div class="navbar-collapse collapse " id="navbar-mobile">

        <ul class="nav navbar-nav navbar-right mt-5">
          <li class="icon-new hidden-xs" style="color: #fff !important;">
            <div data-toggle="popover" title="Change log" style="float: left;top: -2px;font-size: 20px;border-width: 0 1px;position: relative;height: 40px;line-height: 42px;cursor: pointer;color: #2c2c2c !important;">
              <i class="entypo-bell"></i></div>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">

          <li class="m-left hidden-xs">
            <nuxt-link to="/message/select-type" type="button" class="btn stretch-a" style="height: 30px !important;margin-top: 8px !important;padding-bottom: 26px;
    color: #fff !important;padding-top: 7px !important;background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);font-weight: 100 !important;">
              <i class="entypo-paper-plane" style="font-size: 14px;"></i> Compose message
            </nuxt-link>
          </li>
          <Dropdown id="mobile-menu" class="hide-menu">
            <template v-slot:dropdown_title>
              <a class="dropdown-toggle stretch-a" data-toggle="dropdown" style="color: #2c2c2c !important;">
                <img preview-for="image"  src="/images/team/10.png" alt=""><span style="margin-left: 5px;"> Quick Menu</span>
                <i class="caret"></i>
              </a>
            </template>
            <template v-slot:dropdown_menu>
              <li><nuxt-link to="/billing/fund"><i class="entypo-credit-card"></i> Top Up</nuxt-link></li>
              <li>
                <nuxt-link to="/message/select-type">
                  <i class="entypo-paper-plane"></i><span> Message</span>
                </nuxt-link>
              </li>

              <li>
                <nuxt-link to="/sms/history">
                  <i class="entypo-chart-line"></i><span> Reports</span>
                </nuxt-link>
              </li>

              <li>
                <nuxt-link to="/account/profile"><i class="entypo-vcard"></i> Account</nuxt-link>
              </li>

              <li><a @click="logout"><i class="icon-switch2" ></i> logout</a></li>
            </template>
          </Dropdown>
        </ul>
      </div>
    </div>
</template>

<script>
  import Dropdown from "../dropdown/Dropdown";
  export default {
    name: "DashboardNavbar",
    components: {Dropdown},
    data(){
      return{
        isOpen:'false',
        email:""
      }
    },
    methods: {
      toggle: function () {
        this.isOpen = !this.isOpen
      },
      toggleMenu(){
        $("#mobile-menu").toggleClass("hide-menu");
      },
      async logout(){
        await this.$auth.logout();
      }
    },

  }
</script>


<style scoped src="~/assets/css/general_style/dashboardNavbar.css">

</style>
