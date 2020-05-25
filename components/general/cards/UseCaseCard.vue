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
  .use-case {
    font-size: 11px !important;
    margin-top: -25px;
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

  .u-small {
    letter-spacing: normal !important;
    text-align: left !important;
    padding: 10px 0 0 20px;
  }


</style>
