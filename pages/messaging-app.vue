<template>
  <div class="body navbar-top  container">
    <!--main nav-->
    <TheNavbar></TheNavbar>
    <!--/main nav-->
    <!--page container-->
    <div class="login-container page-container">
      <!--page content-->
      <div class="page-content">
        <ProductMainContent title="CROSS-CHANNEL MESSAGING"
                      text_body="Guarantee delivery of messages by automatically routing them to alternative channels using a robust rules engine."
                      url="/images/products/ph.svg"
                      :styles="styles">
          <template>
            <h1 class="mb-10 mt-50"><strong class="text-bold blue-t">Send
              <span class="wrap"></span>
            </strong> messages effectively.
            </h1>
          </template>
        </ProductMainContent>
        <center class="hidden-xs">
          <div class="hrr-5 hidden-xs"></div>
        </center>
        <ProductFeatures>
          <template v-slot:product_feature_header>
            <ProductFeatureHeader first_line="POWERFUL MESSAGING PLATFORM" second_line="Built For Customer Retention"></ProductFeatureHeader>
         </template>
          <template v-slot:left_product_features>
            <SingleProductFeature head_title="SCHEDULE NOTIFICATIONS"
                       image_url="/images/products/calendar-2.png"
                       text="Send timed SMS, email, voice and whatsapp notifications to your customers"></SingleProductFeature>
            <SingleProductFeature head_title="DELIVERY ROUTING"
                       image_url="/images/products/chat.png"
                       text="Automatically route failed messages to alternative channels with 99.9% delivery rate"></SingleProductFeature>
          </template>
          <template v-slot:right_product_features>
            <SingleProductFeature head_title="PERSONALIZE MESSAGES"
                       image_url="/images/products/mail-@.png"
                       text="Improve retention by personalizing contents of messages sent to customers"></SingleProductFeature>
            <SingleProductFeature head_title="API DELIVERY"
                       image_url="/images/products/app.png"
                       text="Integrate Termii seamlessly to third-party CRM software, Website, or Mobile Apps"></SingleProductFeature>
          </template>
        </ProductFeatures>
      </div>
      <TrustedBySection></TrustedBySection>
    </div>
    <!--/page container-->
    <!--Footer-->
    <TheFooter></TheFooter>

  </div>

</template>

<script>
    import Navbar from "../components/general/navbar/PrimaryNavbar";
    import ProductMainContent from "../components/general/ProductMainContent";
    import ProductFeatures from "../components/general/product_features/ProductFeatures";
    import ProductFeatureHeader from "../components/general/product_features/ProductFeatureHeader";
    import SingleProductFeatures from "../components/general/product_features/SingleProductFeature";
    import GradSection from "../components/general/TrustedBySection";
    import Footer from "../components/general/TheFooter";
    import TrustedBySection from "../components/general/TrustedBySection";
    import TheFooter from "../components/general/TheFooter";
    import TheNavbar from "../components/general/navbar/PrimaryNavbar";
    import SingleProductFeature from "../components/general/product_features/SingleProductFeature";
    export default {
        name: "switch_page",
      components: {
        SingleProductFeature,
        TheNavbar,
        TheFooter,
        TrustedBySection,
          SingleProductFeatures, ProductFeatureHeader, ProductFeatures, ProductMainContent},
      data() {
        return {
          styles: {
            marginTop: '-85px',
            width: '85%',
            marginLeft: '40px',
            marginBottom: '-50px'
          }
        }
      },
					head() {
						return {
							title: 'Termii - Switch',
							meta: [
								// hid is used as unique identifier. Do not use `vmid` for it as it will not work
								{
									hid: 'description',
									name: 'description',
									content: 'My custom description'
								}
							]
						}
					},
      mounted () {
        this.$nextTick(() => {
          this.$nuxt.$loading.start()

          setTimeout(() => this.$nuxt.$loading.finish(), 500)
        })
      }

    }
</script>

<style >
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    outline: 1px solid #fafafa !important;
  }
  ::-webkit-scrollbar {
    width: 9px !important;
    height: 9px !important;
  }
  ::-webkit-scrollbar-track {
    border-radius: 5px !important;
  }


</style>
