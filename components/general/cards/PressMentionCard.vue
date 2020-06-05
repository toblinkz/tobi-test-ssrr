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

</style>
