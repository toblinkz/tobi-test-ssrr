<template>
        <div >
          <!-- Main content -->
          <div class="content-wrapper">
            <div class="home-x">
              <div class="container">
                <div class="col-md-6 mt-150">
                  <a href="http://developer.termii.com/docs/messaging/"><small> <span class="white promo-1 hidden-xs">New</span>Introducing Switch ⇢</small></a>
                  <h1 class="mb-10 mt-50"><strong class="text-bold blue-t">Messaging
                    <span class="wrap"></span>
                  </strong> for Businesses.
                  </h1>
                  <h4>Termii helps businesses in Africa use messaging channels to verify and communicate with customers</h4>
                  <Button label="Get Started" class="mt-40"></Button>
                  <p>Have a question? <a class="blue-t text-bold" id="CHATID">Contact Sales</a></p>
                </div>
                <div class="col-md-6 mt-100 hidden-xs background" id="zio" >
                  <img alt="Image" style="margin-top: -125px;margin-bottom: -85px;margin-left: 10px;" src="https://termii.com/assets/images/logo/man-a.svg">
                </div>
              </div>
                <center class="hidden-xs">
                  <div class="hrr-5 hidden-xs"></div>
                </center>
                  <MediaPlatformsReviews></MediaPlatformsReviews>
                <center class="hidden-xs">
                  <div class="hrr-2 hidden-xs"></div>
                </center>
              <ProductFeaturesAndTestimonies></ProductFeaturesAndTestimonies>
          </div>

          </div>
        </div>
</template>

<script>
    import Button from "../general/TermiiButton";
    import Social_list from "./MediaPlatformsReviews";
    import ProductFeaturesAndTestimonies from "./ProductFeaturesAndTestimonies";
    import MediaPlatformsReviews from "./MediaPlatformsReviews";
    export default {
        name: "Main",
      components: {MediaPlatformsReviews, ProductFeaturesAndTestimonies, Button}
    }
</script>

<style scoped>

  .hrr-2 {
    border: 0;
    height: 15px;
    margin-top: 40px !important;
    margin-bottom: 50px !important;
    position: relative;
    background: radial-gradient(ellipse at bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0) 70%);
    width: 50% !important;
  }

  a:visited {
    text-decoration: none !important;
  }
  a {
    color: #333;
    outline: 0;
    cursor: pointer;
    background-color: transparent;
    text-decoration: none !important;
  }
  .white {
    color: #fff !important;
  }
  .promo-1 {
    background: #365899 !important;
    padding: 1px 6px 1px 6px !important;
    border-radius: 5px !important;
    margin-right: 13px !important;
    margin-left: 6px !important;
    font-size: 10px;
  }
  .mb-10 {
    margin-bottom: 10px !important;
  }
  .mb-10 {
    margin-bottom: 10px !important;
  }
  .mt-50 {
    margin-top: 50px !important;
  }
  .mt-150 {
    margin-top: 150px !important;
  }
  .mt-40 {
    margin-top: 40px;
  }
  h1 {
    font-size: 33px;
    line-height: 55px;
    font-weight: 100;
    letter-spacing: -0.015em;
    margin: 0.67em 0;
  }
  .text-bold {
    font-weight: 700;
  }
  .blue-t {
    color: inherit;
    background: -moz-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(-30%, #0DCBE5), color-stop(60%, #365899));
    background: -webkit-linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    background: -o-linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    background: -ms-linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0DCBE5', endColorstr='#365899',GradientType=0 );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    font-size: 15px;
    margin: 0 0 10px
  }
  .mt-100 {
    margin-top: 100px !important;
  }

  @media (max-width: 1400px) {
    body,
    #msb p {
      font-size: 15px;
      line-height: 20px;
    }
  }

  ul {
    margin-top: 0;
    margin-bottom: 10px;
  }
  .list-inline > li:last-child {
    padding-right: 0;

  }
  .list-inline > li {
    display: inline-block;
    padding-left: 0;
    font-size: 13px;
  }


  a:active, a:hover {
    outline: 0;
  }

  h4 {
    margin-top: 16px;
    margin-bottom: 15px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 100;
    letter-spacing: -0.015em;
  }
  .background{
    background: url('~assets/images/shape.png') no-repeat top ;

    background-size: 72% 62%;
  }
  img {
    vertical-align: middle;
    border: 0;
  }

  .home-x::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 1900px;
    height: 690px;
    background: #f6fafd;
    transform: skew(0,-10deg);
    width: 100%;
  }

</style>
