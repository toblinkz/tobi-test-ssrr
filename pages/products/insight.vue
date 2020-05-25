<template>
  <div class="body navbar-top  container">
    <!--main nav-->
    <TheNavbar></TheNavbar>
    <!--/main nav-->
    <!--page container-->
    <div class="page-container">
      <!--page content-->
      <div class="page-content">
        <ProductMainContent title="CUSTOMER ANALYTICS"
                      text_body="Get insights designed to help you understand customers' information and mobile network status"
                      url="https://termii.com/assets/images/products/ssl.svg"
                      :styles="styles">
          <template>
            <h1 class="mb-10 mt-50"><strong class="text-bold blue-t">Retrieve
              <span class="wrap"></span>
            </strong> detailed analytics.
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
     import TheNavbar from "../../components/general/navbar/PrimaryNavbar";
    import TheFooter from "../../components/general/TheFooter";
    import TrustedBySection from "../../components/general/TrustedBySection";
    import SingleProductFeature from "../../components/general/product_features/SingleProductFeature";
    export default {
      name: "insight",
      components: {
        SingleProductFeature,
        TrustedBySection,
        TheFooter,
        TheNavbar,  SingleProductFeatures, ProductFeatureHeader, ProductFeatures, ProductMainContent},
      data() {
        return {
          styles: {
            marginTop: '-95px',
            width: '80%',
            marginLeft: '100px',
            zIndex: '9999'
          }
        }
      },


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
