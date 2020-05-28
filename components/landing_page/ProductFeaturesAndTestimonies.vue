<template>
    <div>
      <section class="testimonials-1">
        <div class="container">
          <div class="row z-in mb-100">
            <div class="col-md-12">
              <div class="mt-50 panel-flat timeline-content">
                <ProductFeatureHeader first_line="WE ARE EMPOWERING BUSINESSES ACROSS AFRICA" second_line="With Simple & Easy Tools for Messaging"></ProductFeatureHeader>
                <small>
                  <div class="row">
                    <div class="col-md-6">
                      <SingleProductFeature head_title="CROSS-SECTION"
                                 image_url="https://termii.com/assets/images/products/chat.png"
                                  text="Use sms, email, voice & IM channels to verify and communicate with customers"></SingleProductFeature>
                      <SingleProductFeature head_title="COST SAVING"
                                 image_url="https://termii.com/assets/images/products/finance.png"
                                 text="Save cost by detecting restricted contacts and network changes before sending messages"></SingleProductFeature>

                    </div>
                    <div class="col-md-6">
                      <SingleProductFeature head_title="99.9% DELIVERY"
                                 image_url="https://termii.com/assets/images/products/check-mark.png"
                                 text="Bypass network restrictions by delivering messages using uniquely generated IDs and numbers"></SingleProductFeature>
                      <SingleProductFeature head_title="QUICK INTEGRATION"
                                 image_url="https://termii.com/assets/images/products/activity.png"
                                 text="Integrate messaging APIs to your application in less than 60 minutes using pre-installed configurations"></SingleProductFeature>

                    </div>

                  </div>
                </small>
              </div>

            </div>
          </div>
          <small>
            <center>
              <div class="hrr-2"></div>
            </center>
            <div class="hidden-xs" style="text-align: center;">
              <small>THE COMPANIES YOU <i class="fa fa-heart blue-t"></i> AND TRUST</small>
              <h2 class="text-center margin-minus-5">Build Awesome Products with Termii</h2>
            </div>
            <div class="row mt-70 mb-50 z-99">
              <div class="col-md-4">
                <div class="col-md-12 card-u">
                  <!-- START PANEL -->
                  <img src="https://termii.com/assets/images/logo/voguepay.png" class="wd-100">
                  <h4 class="testimonial-head"><span style="font-weight: 400 !Important;">Verification for</span> <span class="blue-t"> Financial Services</span></h4>
                  <p class="testimonial-text">Voguepay uses Termii's <strong>Token tools</strong> to verify and authenticate merchants financial transactions across Africa
                  </p>
                  <a href="https://termii.com/verify-app" class="blue-p mb-20 font-case">Explore ⇢</a>
                  <!-- END PANEL -->
                </div>
              </div>
              <!-- Product 2 -->

              <!-- Product 1 -->
              <div class="col-md-4">
                <div class="col-md-12 card-u">
                  <!-- START PANEL -->
                  <img src="https://termii.com/assets/images/logo/helium.png" class="wd-100">
                  <h4 class="testimonial-head"><span style="font-weight: 400 !Important;">Messaging for</span> <span class="blue-t"> Health Care</span></h4>
                  <p class="testimonial-text">Helium Health uses Termii's <strong>Messaging tools</strong> to help hospitals and clinics automate their processes as well as engage patients effectively
                  </p>
                  <a href="https://termii.com/messaging-app" class="blue-p mb-20 font-case">Explore ⇢</a>
                  <!-- END PANEL -->
                </div>
              </div>
              <!-- Product 2 -->
              <div class="col-md-4">
                <div class="col-md-12 card-u">
                  <!-- START PANEL -->
                  <img src="https://termii.com/assets/images/logo/ulesson-p.png" class="wd-100">
                  <h4 class="testimonial-head"><span style="font-weight: 400 !Important;">Insight for</span> <span class="blue-t"> Education</span></h4>

                  <p class="testimonial-text">Ulesson uses Termii's <strong>Insight tools</strong> to provide intuitive mobile learning experiences to students across Africa
                  </p>
                  <a href="https://termii.com/analytics-app" class="blue-p mb-20 font-case">Explore ⇢</a>
                  <!-- END PANEL -->
                </div>
              </div>
            </div>
          </small>
        </div>
      </section>
      <small>
        <section class="testimonial-1 mb-100 mt-50 z-in">
          <div class="container">
            <div class="col-md-6 text-right">
              <small class="mt-50">BUILT FOR AFRICAN BUSINESSES</small>
              <h1>
                <strong class="text-bold font-40 blue-t text-center">Over {{messages_processed}}+</strong>
              </h1>
              <h2 class="margin-minus transformed">Messages processed so far...</h2>
              <h4 class="margin-0">
                We don’t believe in complex codes or long implementation
                <br>
                processes, so we simplified our APIs to reflect that.
              </h4>
              <br>
              <Button label=" View API documentation"></Button>
            </div>
            <div class="col-md-6">
              <img alt="Image" id="zio" class="mt-50" style="width: 108%;margin-top: -45px !important;margin-left: -40px !important;margin-bottom: -500px !important;" src="https://termii.com/assets/images/products/curl-3.svg?v=1">
            </div>
          </div>
        </section>
        <div class="container mb-50">
          <div class="row z-in mb-50">
            <div class="col-md-6 mt-100" id="zio">
              <img src="https://termii.com/assets/images/logo/round-t.png" class="wide-380">
            </div>
            <div class="col-md-6 mt-100">
              <h2>
                Cross-Network
                <strong class="blue-t text-center "> Delivery</strong>
              </h2>
              <p>
                We deliver messages across different networks in Africa, but have special arrangement for global network delivery!
              </p>
              <div>
                <Button label=" Speak to an agent" class="mt-40"></Button>
              </div>
            </div>
          </div>
        </div>
        <TrustedBySection></TrustedBySection>
      </small>
    </div>
</template>


<script>
    import ProductFeatureHeader from "../general/product_features/ProductFeatureHeader";
    import SingleProductFeatures from "../general/product_features/SingleProductFeature";
    import Button from "../general/TermiiButton";
    import GradSection from "../general/TrustedBySection";
    import SingleProductFeature from "../general/product_features/SingleProductFeature";
    import TrustedBySection from "../general/TrustedBySection";
    export default {
        name: "testimony_section",
      components: {
        TrustedBySection,
        SingleProductFeature, GradSection, Button, SingleProductFeatures, ProductFeatureHeader
        },
      data () {
          return{
            messages_processed:""
          }
      },
      async fetch() {
          let registered_business_data = await this.$axios.$get('http://sandbox.termii.com/v1/utility/total/messages-processed',);
        this.messages_processed = registered_business_data.data
      }
    }
</script>

<style scoped>

  .mt-40 {
    margin-top: 40px;
  }
  .font-40 {
    font-size: 40px !important;
  }
  .text-center {
    text-align: center;
  }
  .margin-minus {
    margin-top: -37px;
  }
  .text-right {
    text-align: right;
  }
  .margin-minus-5 {
    margin-top: 5px !important;
  }
  .wide-380 {
    width: 380px !important;
    margin-top: -20px;
    margin-bottom: -40px;
    margin-left: 140px;
  }
  .hrr-2 {
    border: 0;
    height: 15px;
    margin-top: 50px !important;
    margin-bottom: 50px !important;
    position: relative;
    background: radial-gradient(ellipse at bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0) 70%);
    width: 50% !important;
  }
  .mt-50 {
    margin-top: 50px !important;
  }
  .mt-70 {
    margin-top: 70px !important;
  }
  .timeline-content {
    margin-bottom: 20px;
  }
  .margin-0 {
    margin-top: 0px !important;
  }
  .z-in {
    z-index: 2 !important;
    position: relative !important;
  }
  .mb-100 {
    margin-bottom: 100px !important;
  }
  .mb-20 {
    margin-bottom: 20px !important;
  }
  .mb-30 {
    margin-bottom: 30px !important;
  }
  .font-case {
    font-size: 14px !important;
    font-weight: 600 !important;
    line-height: 20px !important;
    margin: 0px 0px 10px 0px;
    font-style: normal;
    white-space: normal;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    display: block;
    text-align: left;
    padding: 20px;
    letter-spacing: normal !important;
  }
  h4, .h4 {
    font-size: 16px;
    line-height: 24px;
    font-weight: 100;
    margin-bottom: 15px;
  }
  .z-99 {
    z-index: 99 !important;
  }
  .mb-50 {
    margin-bottom: 50px !important;
  }
  .mt-100 {
    margin-top: 100px !important;
  }
  p {
    font-size: 15px;
  }

  .transformed {
    text-transform: uppercase;
    display: inline-block;
    letter-spacing: 0.02em;
    font-size: 15px;
    font-weight: 600;
    padding: 0;
    line-height: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-text-stroke: 0px grey;
    filter: alpha(opacity=40);
    -webkit-transition: opacity 0.3s ease;
    transition: opacity 0.3s ease;
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
  #zio {
    -webkit-animation: bounce 3s infinite ease-in-out;
    -o-animation: bounce 3s infinite ease-in-out;
    -ms-animation: bounce 3s infinite ease-in-out;
    -moz-animation: bounce 3s infinite ease-in-out;
    animation: bounce 3s infinite ease-in-out;
  }
  @keyframes bounce {
    0% { transform: translateY(-5px)  }
    50% { transform: translateY(10px) }
    100% { transform: translateY(-5px) }
  }

</style>
