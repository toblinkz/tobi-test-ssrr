<template>
  <nuxt-link no-prefetch :to="url" title="Edit"
     class="btn bg-blue mt-40"> {{label}}
    <i class="fa fa-angle-double-right padd-left"></i></nuxt-link>
</template>

<script>
    export default {
        name: "TermiiButton",
      props: {
          label: String,
          url: String
      }
    }
</script>

<style scoped>
    a {
    color: #1E88E5;
    text-decoration: none;
    font-family: Karla;
  }
  a:hover{
    box-shadow: none;
  }

</style>
