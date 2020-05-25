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
  .subscription-plans {
    text-align: center;
  }
  .panel {
    box-shadow: 0 10px 45px 0 rgba(0,0,0,.1);
    background-color: #fff;
    border: transparent;
  }
  .panel-plan {
    display: inline-block;
  }
  .panel-body {
    position: relative;
    padding: 20px;
  }
  .pad-w {
    padding-left: 50px !important;
    padding-right: 50px !important;
  }
  pad-0 {
    padding-top: 0px !important;
  }
  .nav {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
  }

</style>
