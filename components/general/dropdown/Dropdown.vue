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
</style>
