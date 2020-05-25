<template>
  <div class="col-md-4 mb-20 ">
    <div class="col-md-12 card-u">
      <!-- START PANEL -->
      <img :src="url" class="wd-o">
      <!-- END PANEL -->
    </div>
    <h4 class="text-bold">{{team_member_name}}</h4>
    <small class="text-center">{{role}}</small>
  </div>
</template>

<script>
    export default {
        name: "TeamMembersCard",
        props: {
          url: String,
          team_member_name: String,
          role: String
        }
    }
</script>

<style scoped>
  .wd-o {
    width: 100% !important;
    border-radius: 5px;
  }
</style>
