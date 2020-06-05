<template>
  <div class="col-md-4">
    <div class="col-md-12 card-u">
      <!-- START PANEL -->
      <img :src="image_url" class="wd-100">
      <h4 class="testimonial-head">{{testimonial_header}}</h4>
      <small class="u-small blue-t"><a :href="customer_url" targte="_blank">{{customer}}</a></small>
      <p class="testimonial-text">{{testimonial_text}}</p>
      <small class="mb-20 use-case">{{use_case}}</small>
      <!-- END PANEL -->
    </div>
  </div>
</template>

<script>
    export default {
        name: "UseCaseCard",
        props: {
          testimonial_header:String,
          image_url:String,
          use_case: String,
          testimonial_text: String,
          customer_url: String,
          customer: String,
      }
    }
</script>

<style scoped>



</style>
