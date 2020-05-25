<template>
  <div class="hidden-xs" style="text-align: center;">
    <small>{{first_line}}
      <h2 class="text-center margin-minus-5">{{second_line}} </h2>
    </small>
  </div>
</template>

<script>
    export default {
        name: "ProductFeatureHeader",
        props: {
          first_line: String,
          second_line: String
        }
    }
</script>

<style scoped>

  small {
    font-size: 97%;
  }
  .margin-minus-5 {
    margin-top: 5px !important;
  }
   h2 {
    margin-bottom: 30px;
    font-weight: 100;
     font-size: 25px;
  }


</style>
