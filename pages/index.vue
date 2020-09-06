<template>
  <div class="body navbar-top  container">
    <!--main nav-->
    <TheNavbar></TheNavbar>
    <!--/main nav-->
    <!--page container-->
    <div class="login-container page-container">
      <!--page content-->
      <div class="page-content">
        <MainContent></MainContent>
      </div>
      <!--/page content-->
      <TheFooter></TheFooter>
    </div>
    <!--/page container-->
  </div>

</template>

<script>

import MainContent from "../components/landing_page/MainContent";
import TheNavbar from "../components/general/navbar/PrimaryNavbar";
import TheFooter from "../components/general/TheFooter";
export default {
  components: {
    TheFooter,
    TheNavbar,
    MainContent},
	data(){
  	return{ title: 'Termii - Messaging for Businesses'}
	},
	head() {
		return {
			title: this.title,
			meta: [
				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{
					hid: 'description',
					name: 'description',
					content: 'My custom description'
				}
			]
		}
	},
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }

}

</script>

<style>



</style>
