<template>
  <div class="custom-select" :style="{...dropdownStyle}" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :style="{...dropdownSelected}" :class="{open: open}" @click="open = !open">{{ selected }} </div>
    <div id="list" class="items " :class="{selectHide: !open}">
      <div
        :key="i"
        @click="selected=option.name; open=false; $emit('item-selected', option.id); "
        class="item"
        v-for="(option, i) of options"
      >{{ option.name }}</div>
    </div>
  </div>
</template>

<script>

    export default {
        name: "CustomSelect",
      props: {
        options: {
          type: Array,
          required: true
        },
        tabindex: {
          type: Number,
          required: false,
          default: 0
        },
        dropdownStyle:{
          type: Object
        },
        dropdownSelected:{
          type: Object
        }
      },
      data(){
          return {
            selected: this.options.length > 0 ? this.options[0] : null,
            open: false
          }
      },
      mounted() {


        $(".custom-select").click(function() {

          let scrollTop = $(window).scrollTop();

          let topOffset = $(".custom-select").offset().top;

          let relativeOffset = topOffset - scrollTop;

          let windowHeight = $(window).height();

          if (relativeOffset > windowHeight / 2){

            $("#list").addClass("items-reverse");
          } else {

            $("#list").removeClass("items-reverse");
          }
        });
      },
    }
</script>

<style scoped>
  .custom-select {
    position: relative;
    width: 100%;
    text-align: left;
    outline: none;
    height: 40px;
    line-height: 47px;
    border: 1px solid transparent !important;
    border-color: #ddd !important;
  }

  .selected {
    margin-top: -3px;
    border-radius: 6px;
    color: #000000;
    padding-left: 8px;
    cursor: pointer;
    user-select: none;

  }

  .selected.open {

    border-radius: 6px 6px 0 0;
  }

  .selected:after {
    position: absolute;
    content: "";
    top: 50%;
    right: 10px;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-color: #000000 transparent transparent transparent;
  }

  .reverse {
    top:auto;
    bottom:100%;
  }

  .items {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    float: left;
    max-height:200px;
    overflow-y:auto;
    width: 100%;
    list-style: none;
    background-color: #fff;
    border: 1px solid #efefef;
    border-radius: 3px;
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background-clip: padding-box;
  }
  .items-reverse{
    position: absolute;
    top: auto;
    bottom: 100%;
    left: 0;
    background-color: #fff;
    color: #333333;
    border: 1px solid #d0d0d0;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,0.25);
    border-radius: 3px;
    display: block;
    width: 100%;
    z-index: 9999;
  }

  .item {
    color: #000000;
    padding: 3px 20px;
    margin: 2px 0 0;
    font-size: 13px;
    text-align: left;
    cursor: pointer;
    user-select: none;
  }

  .item:hover {
    background-color: #c8e9e6;
  }

  .selectHide {
    display: none;
  }
  .caret {
    font-style: normal;
    font-weight: normal;
    display: inline-block;
    vertical-align: middle;
    width: auto;
    height: auto;
    text-align: center;
    right: 36px;
  }
</style>
