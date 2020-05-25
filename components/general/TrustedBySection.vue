<template>
  <div class="grad-section z-in">
    <div class="container">
      <div class="col-md-5">
        <h2 class="mt-30">Trusted by 2,031+ businesses.</h2>
        <h4 class="hidden-xs">Some of the best businesses across Africa use Termii to engage their customers daily.</h4>
        <a href="https://termii.com/register" title="Get started" class="btn bg-trans mt-10 mb-50"> Get started <i class="fa fa-angle-double-right padd-left"></i></a>
      </div>
      <div class="col-md-6 hidden-xs">
        <img alt="Image" class="mt-20 " style="width: 115%;margin-left: 3px;opacity: 0.5;margin-top: 28px !important; " src="https://termii.com/assets/images/logo/log-p.png">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TrustedBySection"
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

  a,a:visited {
    text-decoration: none !important;
  }
  .btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    white-space: nowrap;
    padding: 7px 12px;
    font-size: 13px;
    line-height: 1.5384616;
    border-radius: 5px !important;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .z-in {
    z-index: 2 !important;
    position: relative !important;
  }
  .grad-section {
    max-width: 90%;
    margin: 0px auto 55px;
    box-shadow: 0 0 25px 0 rgba(113,150,193,.2);
    border-radius: 5px;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    color: #fff !important;
  }
    .mt-30 {
    margin-top: 30px;
  }
  .mt-20 {
    margin-top: 20px;
  }
  h1, .h1, h2, .h2, h3, .h3 {
    margin-bottom: 30px;
    font-weight: 100;
  }
  h2, .h2 {
    font-size: 25px;
    letter-spacing: -0.015em;
  }

  h4, .h4 {
    font-size: 16px;
    line-height: 24px;
    font-weight: 100;
    margin-top: 16px;
    margin-bottom: 15px;
    letter-spacing: -0.015em;
  }

</style>
