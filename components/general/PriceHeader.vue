<template>
    <div>
      <center>
        <h1 class="mb-10">Flexible <strong class="text-bold blue-t">pricing.</strong></h1>
        <h4>Start with our per-billing plan! <br>No credit card required. You can request for a custom plan!</h4>
        <p class="btn bg-blue"><a  id="CHATID" style="color: #fff">Need a customized plan? <span class="btn-tx blue-p hidden-xs">Contact us ⇢</span></a></p>
      </center>
    </div>
</template>

<script>
    export default {
        name: "PriceHeader"
    }
</script>

<style >
  .bg-blue {
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
    color: #fff !important;
    margin-bottom: 35px;
    border-radius: 4px;
    padding-top: 7px;
    padding-bottom: 8px;
    padding-left: 26px !important;
    padding-right: 26px !important;
  }
  .btn-tx {
    background: #fff !important;
    padding: 4px 14px 4px 15px !important;
    border-radius: 5px !important;
    margin-right: -20px !important;
    margin-left: 16px !important;
  }
  .big-p {
    font-size: 1.8em;
    letter-spacing: -0.05em;
    vertical-align: middle;
    color: #1990bb;
    margin: 15px 0px -5px;
  }

</style>
