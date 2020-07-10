<template>
  <div class="container-fluid body">
    <div id="msb" class="col-md-2">
      <Sidebar></Sidebar>
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
              <section class="wrapper-bottom-sec">
                <div class="jumbotron" data-pages="parallax">
                  <div class="container-fluid container-fixed-lg">
                    <div class="inner">
                      <div class="mt-20 ">
                        <div class="row ">
                          <center>
                            <!-- START PANEL -->
                            <div class="panel-transparent">
                              <p id="welcome" style="margin-top: 10px;"><i class="fa fa-upload"></i> Import Phone Contacts!</p>
                              <p class="insight">Upload your customer contacts by using our sample <br>csv file format or manually adding their contacts
                              </p>
                              <div class="row">
                                <br>
                                <a href="http://sandbox.termii.com/sms/download-contact-sample-file" class="btn btn-primary"><i class="fa fa-download"></i> Please use this sample file</a>
                              </div>
                            </div>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="p-t-none p-b-none">
                      <div class="col-lg-3">
                      </div>
                      <div class="col-lg-6">
                        <div class="panel">
                          <div class="panel-body">
                            <div class="send-sms-file-wrapper">
                              <form class="" role="form" method="post">
                                <div class="form-group">
                                  <label>Import Numbers</label>
                                  <small style="color: red !important;font-size: 13px;">Download Our <a href="http://sandbox.termii.com/sms/download-contact-sample-file">Sample File</a> Before uploading your contacts and please do not remove the first row</small><br>
                                  <div class="form-group input-group input-group-file" style="margin-top: 20px !important;">
                                        <span class="input-group-btn">
                                            <span class="btn btn-primary btn-file">
                                                Browse <input type="file" class="form-control" name="import_numbers" >
                                            </span>
                                        </span>
                                  </div>
                                  <div class="form-group">
                                    <label>Country Code</label>
                                    <CustomSelect :options="countries" ></CustomSelect>

                                  </div>
                                  <div class="form-group">
                                    <label>Phone Book</label>
                                    <small style="color: red !important;font-size: 13px;">Haven't created a phone book yet? <a href="http://sandbox.termii.com/phone-book" target="_target">Click here</a></small><br>
                                    <CustomSelect :options="phone_book"></CustomSelect>
                                  </div>

                                  <button type="submit" id="" class="btn btn-success btn-sm pull-right"><i class="fa fa-plus"></i> Add </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
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
    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import CustomSelect from "../../components/general/dropdown/CustomSelect";
    export default {
        name: "import-contacts",
      components: {CustomSelect, DashboardNavbar, Sidebar},
      data(){
          return{
            countries: ['Nigeria', 'Ghana', 'Kenya', 'Uganda'],
            phone_book: ['Health', 'Termii', 'Termii1']
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
  @media (min-width: 769px){
    .page-content {
      display: table-row;
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
  .form-group {
    margin-bottom: 20px;
    position: relative;
  }
  .input-group {
    /* position: relative; */
    display: table;
    border-collapse: separate;
  }
  .input-group-btn {
    position: relative;
    font-size: 0;
    white-space: nowrap;
    width: 1%;
    display: table-cell;
  }
  .btn-file {
    position: relative;
    overflow: hidden;
  }
  .input-group .form-control:last-child{
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
  .input-group .form-control:first-child{
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
  .btn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    text-align: right;
    background: none repeat scroll 0 0 transparent;
    cursor: inherit;
    display: block;
    opacity: 0;
    filter: alpha(opacity=0);
  }
  .form-group label {
    margin-bottom: 5px;
    display: block;
    font-weight: 600;
    line-height: 24px;
  }
  a {
    color: #3068a4;
  }
  a.btn {
    color: #fff;
  }
  .btn-success {
    color: #fff;
    background: linear-gradient(-48deg, #70ddad -30%, #226a4a 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
  }

</style>
