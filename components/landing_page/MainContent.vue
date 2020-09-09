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
                  <h4>Termii helps businesses in Africa use messaging channels to verify and authenticate customers</h4>
                  <Button label="Get Started" url="/register" class="mt-40"></Button>
                  <p>Have a question? <a class="blue-t text-bold" id="CHATID">Contact Sales</a></p>
                </div>
                <div class="col-md-6 mt-100 hidden-xs backgroundMain" id="zio" >
                  <img alt="Image" style="margin-top: -125px;margin-bottom: -85px;margin-left: 10px;" src="/images/logo/man-a.svg">
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

<style >


  .backgroundMain{
    background: url('/images/shape.png') no-repeat top ;

    background-size: 72% 62%;
  }
  a {
    cursor: pointer;
  }

</style>
