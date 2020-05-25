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
  small{
    font-size: 97%;
    color: #333 !important;
  }
  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
  img {
    vertical-align: middle;
    border: 0;
  }
  .wd-55 {
    width: 55px !important;
  }
  .mt-50 {
    margin-top: 50px !important;
  }

  h4, .h4 {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .blue-p {
    color: #1991bd !important;
    font-weight: 600 !important;
  }
  p {
    margin: 0 0 10px;
    font-size: 15px;
  }

</style>
