<template>
  <div>

  </div>

</template>

<script>
    import {PerfectScrollbar} from 'vue2-perfect-scrollbar'
    import Sidebar from "../components/general/Sidebar";
    import ServicePriceModal from "../components/modals/ServicePriceModal";
    import Dropdown2 from "../components/general/dropdown/Dropdown2";
    import DashboardNavbar from "../components/general/navbar/DashboardNavbar";
    import DeviceModal from "../components/modals/DeviceModal";
    import Paginator from "../components/general/Paginator";
    export default {
        name: "test",
      components: {Paginator, DeviceModal, DashboardNavbar, Dropdown2, ServicePriceModal, Sidebar, PerfectScrollbar},
      head(){
        return{
          script: [{src: '/js/customScrollbar.js'}],
          link: [{href:"vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"}]
        }
      },
    }
</script>

<style >
  /*@import "assets/css/general_style/divpages.css";8*/
  /*@import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";*/
  ::-webkit-scrollbar {
    width: 9px !important;
    height: 9px !important;
  }

</style>
