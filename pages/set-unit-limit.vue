<template>
  <div class="container-fluid body">
      <div id="msb" class="col-md-2 hidden-xs">
        <Sidebar class="hidden-xs"></Sidebar>
      </div>
      <div class="col-md-10">
        <DashboardNavbar></DashboardNavbar>
        <!-- Page header -->
        <div class="page-header">
          <div class="page-header-content">
          </div>
        </div>
        <!-- /page header -->
        <!-- Page container -->
        <div class="page-container">
          <!-- Page content -->
          <div class="page-content">
            <!-- Main content -->
            <div class="content-wrapper">
              <!-- main inner content -->
              <main id="wrapper" class="wrapper">
                <section class="wrapper-bottom-sec mt-50">
                  <div class="jumbotron" data-pages="parallax">
                    <div class="container-fluid container-fixed-lg">
                      <div class="inner">
                        <!-- END BREADCRUMB -->
                        <div class="container-sm-height m-t-20">
                          <div class="row row-sm-height">
                            <center>
                              <!-- START PANEL -->
                              <div class="panel-transparent">
                                <p id="welcome" style="margin-top: 10px;margin-bottom: 15px"><i class="entypo-list-add"></i> Set Notification Limits Here</p>
                                <p class="insight hidden-xs">Receive Notifications when you hit your limit on SMS, WhatsApp and OTP Channels!<br></p>
                              </div>
                            </center>
                          </div>
                          <!-- END PANEL -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-offset-3 col-md-6">
                    <div class="p-15 ">
                      <div class="row">
                        <div class="panel">
                          <div class="panel-body">
                            <form role="form" method="post"  @submit.prevent="setSmsUnitLimit">
                              <div class="form-group">
                                <div class="form-group">
                                  <label>You'll get a notification when you reach the limit you set below</label>
                                  <input type="text" class="form-control"  placeholder="Set Limit Here" v-model="limit" :class="{'error': hasLimitError}">
                                  <span class=" error_field_message" v-if="error_message.limit">{{error_message.limit}}</span>
                                  <br>
                                </div>
                              </div>
                              <div class="form-group">
                                <button type="submit" class="btn btn-primary" :disabled="isDisabled"> Send </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <!-- Modal -->
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>

      </div>

  </div>
</template>

<script>
    import Sidebar from "../components/general/Sidebar";
    import DashboardNavbar from "../components/general/navbar/DashboardNavbar";
    import Swal from 'sweetalert2';
    export default {
        name: "set-unit-limit",
      middleware: 'auth',
      components: {DashboardNavbar, Sidebar},
      data(){
          return{
            limit: '',
            hasLimitError: false,
            error_message:[],
          }
      },
      watch:{
        limit(value){
          this.limit = value;
          this.validateLimit(value)
        }
      },
      computed:{
          isDisabled: function () {
            return(this.limit === '' || this.hasLimitError);
          }
      },
      methods:{
          validateLimit(value){
            if (isNaN(value)){
                this.error_message['limit'] = 'The unit limit must be a number.';
                this.hasLimitError = true;
            }else if(value < 0){
              this.error_message['limit'] = 'The unit limit must be at least 0.';
              this.hasLimitError = true;
            } else {
              this.error_message['limit'] = '';
              this.hasLimitError = false;
            }
          },
        async setSmsUnitLimit(){
            try{
              await this.$axios.$post('sms/set-unit-limit', {
                unit_limit: this.limit
              });
              await Swal.fire({
                icon: 'success',
                text: 'Limit Updated Successfully',
              })
            }catch (e) {

            }


        }
      }
    }
</script>

<style scoped>
  @media (min-width: 769px){
    .content-wrapper {
      display: table-cell;
      vertical-align: top;
    }
  }
  .content-wrapper {
    width: 100%;
  }
  @media screen and (min-width: 769px){
    .container .jumbotron, .container-fluid .jumbotron {
      padding-left: 60px;
      padding-right: 60px;
    }
  }
  @media (min-width: 769px){
    .page-container {
      width: 100%;
      display: table;
      table-layout: fixed;
    }
  }

  @media screen and (min-width: 769px){
    .jumbotron {
      padding-top: 48px;
      padding-bottom: 48px;
    }
  }
  .page-header:not(.page-header-filled) + .page-container {
    padding-top: 35px;
  }
  .page-container {
    position: relative;
    /* padding-bottom: 40px; */
  }

  .jumbotron {
    /* padding-top: 30px; */
    /* padding-bottom: 10px; */
    margin-bottom: 10px;
    color: inherit;
    background-color: #fff;
  }

  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
  #welcome {
    /* margin-bottom: 15px; */
    font-weight: 300;
    letter-spacing: normal;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    color: #2c2c2c;
    display: block;
    font-style: normal;
    /* -webkit-margin-before: 1em; */
  }
  .insight {
    font-size: 13.5px !important;
    letter-spacing: normal !important;
    font-weight: 400 !important;
    line-height: 20px !important;
    margin: 0px 0px 10px 0px;
    font-style: normal;
    white-space: normal;
    color: #333333;
    /* -webkit-margin-before: 1em; */
    /* -webkit-margin-after: 1em; */
    /* -webkit-margin-start: 0px; */
    /* -webkit-margin-end: 0px; */
    /* display: block; */
  }
  .p-15 {
    padding: 15px!important;
  }
  .form-group {
    margin-bottom: 20px;
    position: relative;
  }
  .form-group label {
    margin-bottom: 5px;
    display: block;
    font-weight: 600;
    line-height: 24px;
  }
  label {
    /* display: inline-block; */
    max-width: 100%;
    /* margin-bottom: 5px; */
    /* font-weight: bold; */
  }
  .form-control {
    display: block;
    width: 100%;
    height: 36px;
    padding: 7px 12px;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.5384616;
    color: #333333;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ddd;
    border-radius: 3px;
    -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }
  .form-control:focus {
    border-color: #ddd;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(221, 221, 221, 0.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(221, 221, 221, 0.6);
  }
  .form-control:focus {
    border-color: #4DB6AC;
    outline: 0;
    /* -webkit-box-shadow: none; */
    box-shadow: none;
  }
  @media (min-width: 769px){
    .page-content {
      display: table-row;
    }
  }



</style>
