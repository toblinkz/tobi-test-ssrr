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
  head: {
    script: [
      { }
    ],
    link: [

     // {href: "https://termii.com/assets/pages/css/pages.css", rel: "stylesheet", type: "text/css"},
     // {href: "https://termii.com/assets/css/core.css", rel: "stylesheet", type: "text/css"},
      //{href: "https://termii.com/assets/css/components.css", rel: "stylesheet", type: "text/css"},
    //  {href: "https://termii.com/assets/css/colors.css", rel: "stylesheet", type: "text/css"},
    {href:"@icon/entypo/entypo.css", rel:"stylesheet", type:"text/css"},
      {href:"https://termii.com/css/entypo/css/entypo.css?v=9", rel:"stylesheet", type:"text/css"},
      {href:"https://fonts.googleapis.com/css?family=Karla:400,700", rel:"stylesheet", type:"text/css"},
      {href:"https://termii.com/assets/css/icons/icomoon/styles.css", rel:"stylesheet", type:"text/css"},
      {href:"https://termii.com/assets/css/icons/fontawesome/styles.min.css", rel:"stylesheet", type:"text/css"},

    ]
  },
}

</script>

<style>


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


</style>
