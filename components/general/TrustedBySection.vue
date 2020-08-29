<template>
  <div class="grad-section z-in">
    <div class="container">
      <div class="col-md-5">
        <h2 class="mt-30"> Trusted by {{registered_business}}+ businesses.</h2>
        <h4 class="hidden-xs">Some of the best businesses across Africa use Termii to engage their customers daily.</h4>
        <nuxt-link to="/register" title="Get started" class="btn bg-trans mt-10 mb-50"> Get started <i class="fa fa-angle-double-right padd-left"></i></nuxt-link>
      </div>
      <div class="col-md-6 hidden-xs">
        <img alt="Image" class="mt-20 " style="width: 100%;margin-left: 3px;opacity: 0.5;margin-top: 28px !important; " src="/images/logo/log-p.png">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TrustedBySection",
      data() {
          return {
            registered_business:"",
          }
      },
      async fetch() {
          let registered_business_data = await this.$axios.$get('utility/total/registered-businesses',);
          this.registered_business = registered_business_data.data
      }
    }

</script>

<style scoped>

  .bg-trans {
    background-color: #fff;
    border-color: #fff;
    box-shadow: 0 0.75em 2em rgba(0,0,0,0.075);
    margin-bottom: 35px;
    border-radius: 4px;
    color: #07638c !important;
  }


  .grad-section {
    max-width: 100%;
    margin: 0px auto 55px;
    box-shadow: 0 0 25px 0 rgba(113,150,193,.2);
    border-radius: 5px;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    color: #fff !important;
  }


  h1, .h1, h2, .h2, h3, .h3 {
    margin-bottom: 30px;
    font-weight: 100;
  }
  h2, .h2 {
    font-size: 25px;
    letter-spacing: -0.015em;
  }



</style>
