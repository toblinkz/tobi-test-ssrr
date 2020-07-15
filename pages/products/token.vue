<template>
  <div class="body navbar-top  container">
    <!--main nav-->
    <PrimaryNavbar></PrimaryNavbar>
    <!--/main nav-->
    <!--page container-->
    <div class="login-container page-container">
      <!--page content-->
      <div class="page-content">
        <ProductMainContent title="OTP VERIFICATION"
                      text_body="Generate one-time passwords to verify customer identity and transactions across multiple messaging channels"
                      url="/images/products/ms1.svg"
                      :styles="styles">
          <template>
            <h1 class="mb-10 mt-50"><strong class="text-bold blue-t">Verify Customers
              <span class="wrap"></span>
            </strong> transactions.
            </h1>
          </template>
        </ProductMainContent>
        <center class="hidden-xs">
          <div class="hrr-5 hidden-xs"></div>
        </center>
        <ProductFeatures>
          <template v-slot:product_feature_header>
            <ProductFeatureHeader first_line="POWERFUL TOKEN PLATFORM" second_line="Built For Security and Scale"></ProductFeatureHeader>
          </template>
          <template v-slot:left_product_features>
            <SingleProductFeature head_title="SMS TOKEN"
                       image_url="https://termii.com/assets/images/products/chat.png"
                       text="Authenticate customer transaction on your Application by enabling one-time sms tokens"></SingleProductFeature>
            <SingleProductFeature head_title="VOICE TOKEN"
                       image_url="https://termii.com/assets/images/products/call-center.png"
                       text="Prevent bots and spammers from accessing your platform by enabling voice tokens"></SingleProductFeature>
          </template>
          <template v-slot:right_product_features>
            <SingleProductFeature head_title="EMAIL TOKEN"
                       image_url="https://termii.com/assets/images/products/mail-@.png"
                       text="Verify customer transactions across borders by sending verified email tokens"></SingleProductFeature>
            <SingleProductFeature head_title="WHATSAPP TOKEN"
                       image_url="https://termii.com/assets/images/products/speech.png"
                       text="Generate tokens for every transaction across one of the world's most secure platform"></SingleProductFeature>
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

    import ProductMainContent from "../../components/general/ProductMainContent";
    import ProductFeatures from "../../components/general/product_features/ProductFeatures";
    import ProductFeatureHeader from "../../components/general/product_features/ProductFeatureHeader";
    import SingleProductFeatures from "../../components/general/product_features/SingleProductFeature";
    import TrustedBySection from "../../components/general/TrustedBySection";
    import TheFooter from "../../components/general/TheFooter";
    import SingleProductFeature from "../../components/general/product_features/SingleProductFeature";
    import PrimaryNavbar from "../../components/general/navbar/PrimaryNavbar";
    export default {
        name: "token",
      components: {
        PrimaryNavbar,
        SingleProductFeature,
        TheFooter,
        TrustedBySection,
        SingleProductFeatures, ProductFeatureHeader, ProductFeatures, ProductMainContent},
      data() {
        return {
          styles: {
            marginTop: '-145px',
            width: '100%',
            marginLeft: '90px',
            marginBottom:'-110px',
            float:'right'
          }
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

<style>
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
