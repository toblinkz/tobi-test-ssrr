<template>
  <div class="body navbar-top  container">
    <!--main nav-->
    <Navbar></Navbar>
    <!--/main nav-->
    <!--page container-->
    <div class="login-container page-container">
      <!--page content-->
      <div class="page-content">
        <MainContent></MainContent>
      </div>
      <!--/page content-->
      <Footer></Footer>
    </div>
    <!--/page container-->
  </div>
</template>

<script>
    import Navbar from "../components/general/navbar/PrimaryNavbar";
    import MainContent from "../components/landing_page/MainContent";
    import Social_list from "../components/landing_page/MediaPlatformsReviews";
    import Footer from "../components/general/TheFooter";
    export default {
        name: "landing_page",
      components: {Footer, Social_list, MainContent, Navbar}
    }
</script>

<style scoped>




  ::-webkit-scrollbar-thumb {
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    outline: 1px solid #fafafa !important;
  }
  ::-webkit-scrollbar {
    width: 9px !important;
    height: 9px !important;
  }
  ::-webkit-scrollbar-track {
    border-radius: 5px !important;
  }
  .page-container {
    margin: auto;
    padding-bottom: 10px;
  }


</style>
