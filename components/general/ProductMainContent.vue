<template>
  <div class="container">
    <div class="col-md-6 mt-150">
      <small>{{title}}</small>
      <slot></slot>
      <h4>{{text_body}}</h4>
      <Button label="Get Started" url="/register" class="mt-40"></Button>
      <p>Have a question? <a class="blue-t text-bold" id="CHATID">Contact Sales</a></p>
    </div>
    <div class="col-md-6 mt-100 hidden-xs background" id="zio">
      <img alt="Image" v-bind:style="{...styles}" :src="url">
    </div>
  </div>

</template>

<script>
    import Button from "./TermiiButton";
    export default {
        name: "ProductMainContent",
        props: {
          text_body: String,
          title: String,
          url: String,
          styles: Object
        },
      components: {Button}
    }
</script>

<style scoped>

  .background{
    background: url('/images/shape.png') no-repeat top ;
    background-size: 100% 86%;
  }

</style>
