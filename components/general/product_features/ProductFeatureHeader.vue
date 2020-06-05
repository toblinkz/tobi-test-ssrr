<template>
  <div class="hidden-xs" style="text-align: center;">
    <small>{{first_line}}
      <h2 class="text-center margin-minus-5">{{second_line}} </h2>
    </small>
  </div>
</template>

<script>
    export default {
        name: "ProductFeatureHeader",
        props: {
          first_line: String,
          second_line: String
        }
    }
</script>

<style scoped>


</style>
