<template>
  <div class="col-md-3 card" id="">
    <center>
      <img :src="image_url"  style="width: 70px;">
      <h5 class="mb-10 blue-t"><strong>{{card_title}}</strong></h5>
      <p class="mt-10 mb-20">{{card_text}}
      </p>
      <a :href="start_url" class="btn-con"><i class="fa fa-angle-double-right"></i> Start</a>
    </center>
  </div>
</template>

<script>
    export default {
        name: "GuidelineCard",
        props: {
          image_url: String,
          card_title: String,
          card_text: String,
          start_url: String
        }
    }
</script>

<style >
  .card {
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
    background: #FFF;
    position: relative !important;
    border-radius: 4px;
    border-bottom-right-radius: 2px !important;
    border-bottom-left-radius: 2px !important;
    margin-bottom: 20px !important;
    border: 1px solid #e6e6e6 !important;
    box-shadow: 0 3px 12px -2px rgba(0,0,0,0.08) !important;
    margin: 10px !important;
    border: 1px solid #efefef !important;
    padding: 30px 25px 25px !important;
    text-align: center !important;
  }
  .btn-con {
    font-family: "Karla",sans-serif;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.01em;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-font-feature-settings: "kern" 1;
    -moz-font-feature-settings: "kern" 1;
    margin-bottom: 0;
    border: 1px solid #f0f0f0;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 5px;
    min-width: 120px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    background-image: none !important;
    color: #626262;
    background-color: #ffffff;
    text-shadow: none;
    line-height: 21px;
    padding-left: 17px;
    padding-right: 17px;
    padding: 7px 12px;
    position: relative;
    transition: color 0.1s linear 0s, background-color 0.1s linear 0s, opacity 0.2s linear 0s !important;
  }


</style>
