<template>
  <div class="col-md-4">
    <div class="col-md-12 card-u">
      <!-- START PANEL -->
      <center>
        <img :src="url" :class="styling">
      </center>
      <!-- END PANEL -->
    </div>
  </div>
</template>

<script>
    export default {
        name: "GlobalPartnersCard",
      props: {
          url: String,
          styling:String,
      }
    }
</script>

<style scoped>


</style>
