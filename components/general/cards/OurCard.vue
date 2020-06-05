<template>

    <div class="col-md-4">
      <div class="subscription-plans">
        <div class="panel panel-plan box-active">
          <div class="panel-body  pad-0" v-bind:style="{...styles}">
            <ul class="nav">
              <slot name="title"></slot>
              <slot name="text_body"></slot>
            </ul>
          </div>

        </div>
      </div>
    </div>

</template>

<script>
    export default {
        name: "OurCard",
        props:{
          styles: Object
        }
    }
</script>

<style scoped>



  .nav {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
  }

</style>
