<template>
  <div class="container-fluid body">
    <div id="msb" class="col-md-2 ">
      <Sidebar></Sidebar>
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
              <section class="wrapper-bottom-sec mt-100">
                  <div class="inner">
                    <div class="row ">
                      <div class="col-lg-5 col-md-6 col-top">
                        <!-- START PANEL -->
                        <div class="panel-transparent">
                          <div class="row">
                            <!-- START PANEL -->
                            <div class="full-height">
                              <div class="panel-body text-center">
                                <img src="/images/details.gif" class="wide">
                              </div>
                            </div>
                            <!-- END PANEL -->
                            <div class="panel-transparent text-center">
                              <p id="welcome" style="margin-top: 10px;margin-bottom: 0px"><i class="entypo-user-add"></i> Add New Contact!</p>
                              <p class="insight">Add a new contact by inputting their full details<br> and ensure you select the right country code</p>
                              <div class="row" id="zio">
                                <nuxt-link to="/phone-book" class="btn btn-primary mt-20"><i class="entypo-left-open"></i> Return to phone book</nuxt-link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6 col-md-5 col-md-height col-middle">
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="page-title mt-50">
                              <ul class="breadcrumb breadcrumb-caret position-right">
                                <li><nuxt-link to="/phone-book">Phone book</nuxt-link></li>
                                <li>Add New Contact</li>
                              </ul>
                            </div>
                            <div class="panel">
                              <div class="panel-body">
                                <form class="" role="form" method="post" >
                                  <div class="form-group">
                                    <label>Country Code</label>
                                    <select class="selectpicker form-control" name="country_code" data-live-search="true">
                                      <option  selected  >Exist on phone number</option>
                                      <option value="93"  >Afghanistan (93)</option>
                                      <option value="355"  >Albania (355)</option>
                                      <option value="213"  >Algeria (213)</option>
                                      <option value="376"  >Andorra (376)</option>
                                    </select>
                                  </div>
                                  <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Phone number" required name="number" value="">
                                  </div>
                                  <div class="form-group">
                                    <input type="text" class="form-control" placeholder="First name" name="first_name" value="">
                                  </div>
                                  <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Last name" name="last_name" value="">
                                  </div>
                                  <div class="form-group">
                                    <input type="email" class="form-control" placeholder="Email address" name="email" value="">
                                  </div>
                                  <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Company" name="company" value="">
                                  </div>
                                  <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Username" name="username" value="">
                                  </div>
                                  <button type="submit" class="btn btn-success btn-sm pull-right"><i class="fa fa-plus"></i> Add </button>
                                </form>
                              </div>
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
    import Sidebar from "../components/general/Sidebar";
    import DashboardNavbar from "../components/general/navbar/DashboardNavbar";
    export default {
        name: "add-contact",
      components: {DashboardNavbar, Sidebar}
    }
</script>

<style scoped>


  .form-group {
    margin-bottom: 20px;
    position: relative;
  }
  .wide {
    width: 200px !important;
  }
  .form-control {
    display: block;
    width: 100%;
    height: 36px;
    padding: 7px 12px;
    /* font-size: 13px; */
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
  .page-title .breadcrumb {
    margin-bottom: 10px;
  }
  .page-title .breadcrumb.position-right {
    margin-left: 0;
  }
  .page-title {
    padding: 15px 0 0px 0;
  }
  .breadcrumb {
    padding: 8px 0;
    list-style: none;
    background-color: transparent;
    border-radius: 3px;
  }
  .breadcrumb > li {
    font-weight: 600;
    position: relative;
    display: inline-block;
  }
  .breadcrumb-caret > li + li:before {
    content: '\203A\00a0';
    padding: 0 5px;
  }
  .form-group label {
    margin-bottom: 5px;
    display: block;
    font-weight: 600;
    line-height: 24px;
  }
  input[type="text"], input[type="password"], input[type="search"], input[type="email"]{
    -webkit-appearance: none;
    border: 1px solid rgba(0, 0, 0, 0.07);
  }
  .form-control:hover {
    border-color: #aaa;
  }
  .form-control:focus {
    border-color: #4DB6AC;
    outline: 0;
    box-shadow: none;
  }
  .form-control::-webkit-input-placeholder {
    color: #999;
    font-size: small;
  }
  .btn-success {
    color: #fff;
    background: linear-gradient(-48deg, #70ddad -30%, #226a4a 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
  }
</style>
