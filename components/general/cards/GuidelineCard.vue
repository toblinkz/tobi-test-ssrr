<template>
  <div class="col-md-3 card" id="">
    <center>
      <img :src="image_url"  style="width: 70px;">
      <h5 class="mb-10 blue-t"><strong>{{card_title}}</strong></h5>
      <p class="mt-10 mb-20">{{card_text}}
      </p>
      <a :href="start_url" class="btn-con"><i class="fa fa-angle-double-right"></i> Start</a>
    </center>
  </div>
</template>

<script>
    export default {
        name: "GuidelineCard",
        props: {
          image_url: String,
          card_title: String,
          card_text: String,
          start_url: String
        }
    }
</script>

<style >


</style>
