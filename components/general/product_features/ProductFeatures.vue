<template>
    <div class="container">
      <div class="row z-in mb-100">
        <div class="col-md-12">
          <div class="mt-50 panel-flat ">
            <slot name="product_feature_header"></slot>
            <small>
              <div class="row">
                <div class="col-md-6">
                  <slot name="left_product_features"></slot>
                </div>
                <div class="col-md-6">
                 <slot name="right_product_features"></slot>
                </div>
              </div>
            </small>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
    import SingleProductFeatures from "./SingleProductFeature";
    import ProductFeatureHeader from "./ProductFeatureHeader";
    import GradSection from "../TrustedBySection";
    export default {
        name: "timeline_content",
      components: {GradSection, ProductFeatureHeader, SingleProductFeatures}
    }
</script>

<style scoped>

</style>
