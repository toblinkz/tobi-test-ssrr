<template>
  <div class="container-fluid body">
    <div id="msb" class="col-md-2 ">
      <Sidebar class="hidden-xs"></Sidebar>
    </div>
    <div class="col-md-10">
      <DashboardNavbar></DashboardNavbar>
      <!--Page header-->
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
                <div class="col-md-12">
                  <div class="jumbotron" data-pages="parallax">
                    <div class="container-fluid container-fixed-lg">
                      <div class="inner">
                        <!-- END BREADCRUMB -->
                        <div class=" mt-50 m-t-20">
                          <div class="row ">
                            <div class="col-lg-6 col-md-height col-md-7 col-top">
                              <!-- START PANEL -->
                              <div class="panel-transparent">
                                <h3 class="text-bold">
                                  Hi,Termii Webtech
                                </h3>
                                <p id="welcome" style="margin-top: 10px;margin-bottom: 0px"><i class="entypo-flag"></i> View Contacts!</p>
                                <p class="insight">View, edit, delete and manage your customers phone contacts added manually or uploaded from your excel file sheet
                                </p>
                                <div class="row" id="zio">
                                  <div class="col-sm-6">
                                    <nuxt-link to="/phone-book" class="btn btn-primary mt-20 mb-20"><i class="fa fa-angle-double-left"></i> Return to your phone book</nuxt-link>
                                  </div>
                                  <div class="col-sm-6">
                                    <br>
                                    <nuxt-link to="/sms/send-sms" class="btn btn-success"><i class="entypo-paper-plane"></i> Create bulk sms</nuxt-link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div class="col-lg-6 col-md-5 col-md-height col-middle hidden-xs">
                                <!-- START PANEL -->
                                <div class="full-height">
                                  <div class="panel-body text-center">
                                    <img src="/images/details.gif" class="wide">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 mt-100">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="panel">
                          <div class="panel-body">
                            <table class="table data-table table-hover">
                              <thead>
                              <tr>
                                <th >Name</th>
                                <th >Message</th>
                                <th >Phone Number</th>
                                <th >Action</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <td >Ayomide </td>
                                <td >-</td>
                                <td >2349085269802</td>
                                <td > <nuxt-link class="btn btn-success btn-xs" to="/edit-contact" ><i class="fa fa-edit"></i> Edit</nuxt-link>
                                  <a href="#" class="btn btn-danger btn-xs cdelete" id="1"><i class="fa fa-trash"></i> Delete</a></td>
                              </tr>
                              <tr>
                                <td >Oluwatatyo </td>
                                <td >-</td>
                                <td >2347051577499</td>
                                <td > <nuxt-link class="btn btn-success btn-xs" to="/edit-contact" ><i class="fa fa-edit"></i> Edit</nuxt-link>
                                  <a href="#" class="btn btn-danger btn-xs cdelete" id="2"><i class="fa fa-trash"></i> Delete</a></td>
                              </tr>
                              <tr>
                                <td >-  </td>
                                <td >-</td>
                                <td >2347089509657</td>
                                <td > <nuxt-link class="btn btn-success btn-xs" to="/edit-contact" ><i class="fa fa-edit"></i> Edit</nuxt-link>
                                  <a href="#" class="btn btn-danger btn-xs cdelete" id="101470"><i class="fa fa-trash"></i> Delete</a></td>
                              </tr>
                              <tr>
                                <td >Risi </td>
                                <td >reeseekat</td>
                                <td >80234567890</td>
                                <td > <nuxt-link class="btn btn-success btn-xs" to="/edit-contact" ><i class="fa fa-edit"></i> Edit</nuxt-link>
                                  <a href="#" class="btn btn-danger btn-xs cdelete" id="101471"><i class="fa fa-trash"></i> Delete</a></td>
                              </tr>
                              </tbody>
                            </table>
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
    export default {
        name: "_id",
      components: {DashboardNavbar, Sidebar}
    }
</script>

<style scoped>
  .wide {
    width: 200px !important;
  }
  .table {
    margin-bottom: 0;
  }.table > thead > tr > th {
     border-bottom: dotted #ddd !important;
     vertical-align: middle;
     padding: 12px 20px;
     line-height: 1.5384616;
   }
  .table-responsive {
    overflow-x: auto;
    min-height: 0.01%;
  }
  .table {
    width: 100%;
    max-width: 100%;
    /* margin-bottom: 20px; */
  }

  .table > tbody > tr > td{
    vertical-align: middle;
    padding: 12px 20px;
    line-height: 1.5384616;
  }
  th {
    font-weight: 500;
    text-align: left;
  }
  .table-hover > tbody > tr:hover {
    background-color: #f8f8f8;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    background-color: transparent;
  }

</style>
