<template>
  <div class="col-md-4">
    <div class="col-md-12 card-u">
      <!-- START PANEL -->
      <slot></slot>
      <p class="testimonial-text">{{card_text}}
      </p>
      <a target="_blank" :href="explore_url" class="blue-p mb-20 font-case">Explore ⇢</a>
      <!-- END PANEL -->
    </div>
  </div>
</template>

<script>
    export default {
        name: "PressMentionCard",
        props:{
          card_text:String,
          explore_url: String
        }
    }
</script>

<style >
  .font-case {
    font-size: 14px !important;
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

</style>
