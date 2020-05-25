<template>
  <a :href="url" title="Edit"
     class="btn bg-blue mt-40"> {{label}}<i class="fa fa-angle-double-right padd-left"></i></a>
</template>

<script>
    export default {
        name: "TermiiButton",
      props: {
          label: String,
          url: String,
      }
    }
</script>

<style scoped>


  .padd-left {
    padding-left: 15px !important;
  }

  .bg-blue {
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
    color: #fff !important;
    margin-bottom: 35px;
    border-radius: 4px;
    padding-top: 7px;
    padding-bottom: 8px;
    padding-left: 26px !important;
    padding-right: 26px !important;
  }
  .btn {
    display: inline-block;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    white-space: nowrap;
    padding: 7px 12px;
    font-size: 14px;
    line-height: 1.5384616;
    border-radius: 5px !important;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  a {
    color: #1E88E5;
    text-decoration: none;
    font-family: Karla;
  }
  a:hover{
    box-shadow: none;
  }

</style>
