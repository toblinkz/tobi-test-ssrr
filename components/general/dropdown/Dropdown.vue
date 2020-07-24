<template>
  <li class="padd-x dropdown dropdown-user m-left" v-on:click="toggle">
    <slot name="dropdown_title"></slot>
    <ul class="dropdown-menu menu-t" v-show="isOpen">
      <slot name="dropdown_menu"></slot>
    </ul>
  </li>
</template>

<script>
    export default {
        name: "Dropdown",
      data(){
          return{
            isOpen: false
          }
      },
      methods: {
          toggle: function () {
              this.isOpen = !this.isOpen
          },
        close (e) {
            if (!this.$el.contains(e.target)){
              this.isOpen = false;
            }
        },

      },
      mounted () {
        document.addEventListener('click', this.close)
      },
      beforeDestroy () {
        document.removeEventListener('click',this.close)
      }


    }
</script>

<style scoped>
  @media (max-width: 768px) {
    .dropdown-menu, .navbar .input-group .dropdown-menu {
      width: 100%;
      border-width: 0 0 1px 0;
      border-radius: 0;
    }

    .nav > li > a:hover, .nav > li > a:focus {
      text-decoration: none;
      background-color: #f5f5f5;
      color: #777 !important;
    }
  }
  .menu-t {
    border-top: 2px solid #1990bb !important;
  }
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;

    z-index: 1000;
    float: left;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 13px;
    text-align: left;
    background-color: #fff;
    border: 1px solid #efefef;
    border-radius: 3px;
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background-clip: padding-box;
  }
  .dropdown-menu {
    border-width: 2px;
  }
  .dropdown-menu {
    min-width: 180px;
    /* padding: 5px 0; */
    color: #333333;
    /* -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); */
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0);
  }
  .dropdown-menu > li > a {
    padding: 15px 20px;
    font-size: 14px;
    font-weight: 100;
  }
  .dropdown-menu > li > a {
    display: block;
    padding: 3px 20px;
    clear: both;
    /* font-weight: normal; */
    line-height: 1.5384616;
    color: #777777;
    white-space: nowrap;
    outline: 0;
  }
  .dropdown-menu > li > a > i, .dropdown-menu > li > a > img {
    margin-right: 10px;
  }
  .dropdown-menu > li > a {
    padding: 15px 20px;
    font-size: 14px;
    font-weight: 100;
  }
  .dropdown-menu > li > a:hover {
    background: #c8e9e6;
    color: #000 !important;
  }
</style>
