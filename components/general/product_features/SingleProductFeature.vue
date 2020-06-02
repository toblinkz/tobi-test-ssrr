<template>
  <small>
    <div class="row">
        <div class="col-md-2" id="zio">
          <img class="mt-50 wd-55" :src="image_url">
        </div>
        <div class="col-md-10">
          <h4 class="mt-50 blue-p">{{head_title}}</h4>
          <p>{{text}}</p>
        </div>
    </div>
  </small>
</template>

<script>
    export default {
      name: "SingleProductFeature",
      props: {
        text: String,
        image_url: String,
        head_title: String
      }
    }
</script>

<style scoped>

  .row {
    margin-left: 0px;
    margin-right: 0px;
  }


</style>
