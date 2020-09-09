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
                      url="/images/products/ssl.svg"
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
            <ProductFeatureHeader first_line="POWERFUL ANALYTICS PLATFORM" second_line="Built For Improved User Experience"></ProductFeatureHeader>
          </template>
          <template v-slot:left_product_features>
            <SingleProductFeature head_title="NETWORK INSIGHT"
                       image_url="/images/products/server.png"
                       text="Automatically detect your customer's accurate mobile network based on our unique search API "></SingleProductFeature>
            <SingleProductFeature head_title=" ENGAGEMENT INSIGHTS"
                       image_url="/images/products/networking.png"
                       text="Retrieve insights about your customers and their interaction with your messages"></SingleProductFeature>
          </template>
          <template v-slot:right_product_features>
											<SingleProductFeature head_title=" NUMBER INSIGHT"
																																	image_url="/images/products/target.png"
																																	text="Find out the status of your customers and know if they have activated the Do-Not-Disturb Service"></SingleProductFeature>
            <SingleProductFeature head_title="EXPORT ENGAGEMENT INSIGHT"
                       image_url="/images/products/download.png"
                       text="Export customer's campaign engagement data to Excel or PDF based on key timelines"></SingleProductFeature>
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

    import ProductMainContent from "../components/general/ProductMainContent";
    import ProductFeatures from "../components/general/product_features/ProductFeatures";
    import ProductFeatureHeader from "../components/general/product_features/ProductFeatureHeader";
    import SingleProductFeatures from "../components/general/product_features/SingleProductFeature";
     import TheNavbar from "../components/general/navbar/PrimaryNavbar";
    import TheFooter from "../components/general/TheFooter";
    import TrustedBySection from "../components/general/TrustedBySection";
    import SingleProductFeature from "../components/general/product_features/SingleProductFeature";
    export default {
      name: "analytics-app",
      components: {
        SingleProductFeature,
        TrustedBySection,
        TheFooter,
        TheNavbar,  SingleProductFeatures, ProductFeatureHeader, ProductFeatures, ProductMainContent},
      data() {
        return {
          styles: {
            marginTop: '-70px',
            width: '80%',
            marginLeft: '50px',
            zIndex: '9999'
          }
        }
      },
					head() {
						return {
							title: 'Termii - Insight',
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
