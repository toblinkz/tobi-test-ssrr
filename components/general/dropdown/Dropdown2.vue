<template>
  <div class="custom-select" >
    <select @change="changeForm($event)">
      <option>{{label}}</option>
      <option v-for="option in options" :key="option.id">{{option}}</option>
    </select>
  </div>
</template>

<script>
    export default {
        name: "Dropdown2",
      props: {
        options:{
          type: Array
        },
        label: String
      },
      head(){
          return{
            script:[{src: "/js/custom_select.js"}]
          }
      },
      methods: {
          changeForm(){
            this.$emit('changeForm')
          }
      }
    }

</script>

<style >
  /*the container must be positioned relative:*/
  .custom-select {
    position: relative;
    font-size: 14px;
    width: 100%;
    font-family: "Karla", sans-serif;
    background-color: #fff;
    border: 1px solid transparent !important;
    border-color: #ddd !important;
    border-radius: 5px !important;
  }

  .custom-select select {
    display: none; /*hide original SELECT element:*/
  }

  .select-selected {
    /*background-color: #FFFFFF;*/
  }

  /*style the arrow inside the select element:*/
  .select-selected:after {
    position: absolute;
    content: "";
    top: 40%;
    right: 10px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-color: #333 transparent transparent transparent;
  }

  /*point the arrow upwards when the select box is open (active):*/
  .select-selected.select-arrow-active:after {
    border-color: transparent transparent #333 transparent;
    top: 20%;
  }



  /*style the items (options), including the selected item:*/
  .select-items div {
    color: #333333;;
    padding: 15px 20px;
    border: 1px solid transparent;
    cursor: pointer;
    user-select: none;
  }

  .select-selected {
    padding: 7px 12px;
  }

  /*style items (options):*/
  .select-items {
    position: absolute;
    background-color: #FFFFFF;
    border: 1px solid #efefef;
    margin: 2px 0 0;
    border-radius: 3px;
    cursor: pointer;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 99;
  }

  /*hide the items when the select box is closed:*/
  .select-hide {
    display: none;
  }

  .select-items div:hover {
    background: #c8e9e6;
  }

</style>
