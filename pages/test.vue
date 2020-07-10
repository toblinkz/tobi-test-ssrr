<template>

</template>

<script>
  import DateRangePicker from 'vue2-daterange-picker'
  import CustomSelect from "../components/general/dropdown/CustomSelect";
    export default {
        name: "test",
      components: {CustomSelect, DateRangePicker},
      data(){
          return{
            dateRange: {
              startDate: '2019-12-26',
              endDate: '2019-12-28',
            },
          }
      }

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
