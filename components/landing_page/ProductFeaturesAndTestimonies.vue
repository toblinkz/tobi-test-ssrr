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
                                 image_url="/images/logo/chat.png"
                                  text="Use sms, email, voice & IM channels to verify and communicate with customers"></SingleProductFeature>
                      <SingleProductFeature head_title="COST SAVING"
                                 image_url="/images/products/finance.png"
                                 text="Save cost by detecting restricted contacts and network changes before sending messages"></SingleProductFeature>

                    </div>
                    <div class="col-md-6">
                      <SingleProductFeature head_title="99.9% DELIVERY"
                                 image_url="/images/products/check_mark.png"
                                 text="Bypass network restrictions by delivering messages using uniquely generated IDs and numbers"></SingleProductFeature>
                      <SingleProductFeature head_title="QUICK INTEGRATION"
                                 image_url="/images/products/activity.png"
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
                  <img src="/images/logo/voguepay.png" class="wd-100">
                  <h4 class="testimonial-head"><span style="font-weight: 400 !Important;">Verification for</span> <span class="blue-t"> Financial Services</span></h4>
                  <p class="testimonial-text">Voguepay uses Termii's <strong>Token tools</strong> to verify and authenticate merchants financial transactions across Africa
                  </p>
                  <nuxt-link to="/products/token" class="blue-p mb-20 font-case">Explore ⇢</nuxt-link>
                  <!-- END PANEL -->
                </div>
              </div>
              <!-- Product 2 -->

              <!-- Product 1 -->
              <div class="col-md-4">
                <div class="col-md-12 card-u">
                  <!-- START PANEL -->
                  <img src="/images/logo/helium.png" class="wd-100">
                  <h4 class="testimonial-head"><span style="font-weight: 400 !Important;">Messaging for</span> <span class="blue-t"> Health Care</span></h4>
                  <p class="testimonial-text">Helium Health uses Termii's <strong>Messaging tools</strong> to help hospitals and clinics automate their processes as well as engage patients effectively
                  </p>
                  <nuxt-link to="/products/switch" class="blue-p mb-20 font-case">Explore ⇢</nuxt-link>
                  <!-- END PANEL -->
                </div>
              </div>
              <!-- Product 2 -->
              <div class="col-md-4">
                <div class="col-md-12 card-u">
                  <!-- START PANEL -->
                  <img src="/images/logo/ulesson.png" class="wd-100">
                  <h4 class="testimonial-head"><span style="font-weight: 400 !Important;">Insight for</span> <span class="blue-t"> Education</span></h4>

                  <p class="testimonial-text">Ulesson uses Termii's <strong>Insight tools</strong> to provide intuitive mobile learning experiences to students across Africa
                  </p>
                  <nuxt-link to="products/insight" class="blue-p mb-20 font-case">Explore ⇢</nuxt-link>
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
              <Button label=" View API documentation" url="/guideline"></Button>
            </div>
            <div class="col-md-6">
              <img alt="Image" id="zio" class="mt-50" style="width: 108%;margin-top: -45px !important;margin-left: -40px !important;margin-bottom: -500px !important;" src="/images/products/curl.svg">
            </div>
          </div>
        </section>
        <div class="container mb-50">
          <div class="row z-in mb-50">
            <div class="col-md-6 mt-100" id="zio">
              <img src="/images/logo/round_t.png" class="wide-380">
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
                <a  class="btn bg-blue mt-40" id="CHATID">Speak to an agent<i class="fa fa-angle-double-right padd-left"></i></a>
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

<style>


</style>
