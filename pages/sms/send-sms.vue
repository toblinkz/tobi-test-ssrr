<template>
  <div class="container-fluid body">
    <div id="msb" class="col-md-2">
      <Sidebar></Sidebar>
    </div>
    <div class="col-md-10">
      <DashboardNavbar></DashboardNavbar>
        <!--Page header-->
       <div class="page-header">
         <div class="page-header-content">
           <div class="page-title mt-100">
             <ul class="breadcrumb breadcrumb-caret position-right">
               <li><nuxt-link to="/dashboard">Home</nuxt-link></li>
               <li><nuxt-link to="/sms/send-sms">Group sms</nuxt-link></li>
             </ul>
             <h2>
               <span class="text-semibold"><i class="entypo-paper-plane"></i> Group sms</span>
             </h2>
           </div>

           <ul class="nav nav-pills campaign-steps hidden-xs" style="margin-bottom: -20px;">
             <li>
               <nuxt-link to="/message/select-type">
                 <i class="icon-users4"></i> Select type
               </nuxt-link>
             </li>
             <li class="active">
               <nuxt-link to="/sms/send-sms">
                 <i class="entypo-paper-plane"></i> Send message
               </nuxt-link>
             </li>
           </ul>
           <!-- Page container -->
           <div class="page-container">
             <!-- Page content -->
             <div class="page-content">
               <!-- Main content -->
               <div class="content-wrapper">
                 <!-- main inner content -->
                 <main id="wrapper" class="wrapper">
                   <section class="wrapper-bottom-sec">
                     <div class="container-fluid container-fixed-lg">
                       <div class="inner">
                         <div class="row mb-30">
                           <div class="mt-40">
                             <div class="col-md-6">
                               <form role="form" method="post">
                                 <div class="form-group mt-30">
                                   <label>Select Channel </label>
                                   <small style="color: red !important;font-size: 11px;">(WhatsApp available only to premium users)</small>

                                   <select class="selectpicker form-control" name="sms_gateway" data-live-search="true">
                                     <option value="16">Sms (Africa)</option>
                                     <option value="117">SMS (Nigeria-DND)</option>
                                     <option value="120">SMS (GHANA)</option>
                                     <option value="121">SMS (General)</option>
                                   </select>
                                 </div>
                                 <div class="form-group">
                                   <label>Recipients</label>
                                   <select class="selectpicker form-control" name="country_code" data-live-search="true">
                                     <option  value="" >Exist on phone number</option>
                                     <option value="93"  >Afghanistan (93)</option>
                                     <option value="355"  >Albania (355)</option>
                                     <option value="213"  >Algeria (213)</option>
                                     <option value="376"  >Andorra (376)</option>
                                   </select>
                                 </div>
                                 <div class="form-group">
                                   <small style="color: red !important;font-size: 11px;">(Ensure you have added contacts to your phonebook)</small>
                                   <select class="selectpicker form-control" name="country_code" data-live-search="true">
                                     <option value="36">Phone Book</option>
                                     <option value="38">Termii - Directors</option>
                                     <option value="82">Termii-2</option>
                                     <option value="376">Termii (All customers)</option>
                                     <option value="422">TestR</option>
                                     <option value="423">test_list_2</option>
                                   </select>
                                 </div>
                                 <div class="form-group">
                                   <div class="coder-checkbox">
                                     <input type="checkbox" name="send_later"  class="send_later" v-on:click="toggleScheduleTime">
                                     <span class="co-check-ui"></span>
                                     <label>Send Later</label>
                                   </div>
                                 </div>
                                 <div class="form-group" v-show="send_later">
                                   <label>Schedule Time</label>
                                   <date-picker v-model="date_time" type="datetime"></date-picker>
                                 </div>
                               </form>
                             </div>
                             <div class="col-md-6">
                               <div class="form-group mt-30">
                                 <label class="hidden-xs">Sender ID / Device ID</label>
                                 <small style="color: red !important;font-size: 11px;" class="hidden-xs">(Can't find your ID below, <a href="http://sandbox.termii.com/sms/sender-id-management">register yours here</a> - Process takes less than 24 hours)</small>
                                 <select class="selectpicker form-control sender_id" name="sender_id" data-live-search="true">
                                   <option value="Termii">Termii</option>
                                   <option value="Eestate">Eestate</option>
                                   <option value="EGFM REG">EGFM REG</option>
                                   <option value="OTPAlert">OTPAlert</option>
                                   <option value="N-Alert">N-Alert</option>
                                   <option value="talert">talert</option>
                                 </select>
                               </div>
                               <div class="form-group">
                                 <label>Message</label>
                                 <select class="selectpicker form-control message_type" name="message_type">
                                   <option value="plain">Plain</option>
                                   <option value="unicode">Unicode</option>
                                   <option value="arabic">Arabic</option>
                                   <option value="voice">Voice</option>
                                   <option value="mms">MMS</option>
                                 </select>
                               </div>
                               <div class="form-group">
                                 <textarea class="form-control" name="message" rows="5" id="message"></textarea>
                                 <span id="remaining">160 characters remaining</span> |
                                 <span id="messages">1 message(s)</span>
                               </div>
                             </div>
                             <div class="col-md-12">
                               <button type="submit" class="btn bx-line btn-success btn-sm"><i class="fa fa-send"></i> Send </button>
                               <nuxt-link to="/sms/history" class="btn bx-line btn-primary"><i class="fa fa-angle-double-right"></i> Next - View report</nuxt-link>
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
    </div>
  </div>
</template>

<script>
    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import DatePicker from "vue2-datepicker"
    import 'vue2-datepicker/index.css';
    export default {
        name: "send-sms",
      components: {DashboardNavbar, Sidebar, DatePicker},
      data(){
          return{
            send_later: false,
            date_time:"null",
          }
      },
      methods: {
          toggleScheduleTime(){
            this.send_later = !this.send_later
          }
      }
    }
</script>

<style scoped>


  .page-header {
    margin: 0;
    padding: 0;
    border-bottom-width: 0;
  }
  .page-header-content {
    margin: auto;
    max-width: 1280px;
    position: relative;
    background-color: inherit;
    padding: 0 20px;
  }
  .page-title {
    padding: 15px 0 0px 0;
    display: block;
    position: relative;
  }
  .breadcrumb {
    padding: 8px 0;
    /* margin-bottom: 20px; */
    list-style: none;
    background-color: transparent;
    /* border-radius: 3px; */
  }
  .page-title .breadcrumb.position-right {
    margin-left: 0;
  }
  .page-title .breadcrumb:first-child {
    padding-top: 0;
    padding-bottom: 3px;
  }
  .page-title .breadcrumb {
    margin-bottom: 10px;
    float: none;
    display: block;
  }
  .breadcrumb > li {
    font-weight: 600;
    position: relative;
    display: inline-block;
  }
  .page-title .breadcrumb > li > a, .page-title .breadcrumb > li + li:before {
    color: #333;
  }
  .page-title .breadcrumb > li + li:before {
    color: #333;
  }
  .breadcrumb-caret > li + li:before {
    content: '\203A\00a0';
  }
  .breadcrumb > li + li:before {
    padding: 0 5px;
  }
  .page-title h2{
    margin: 0;
  }
  @media (min-width: 769px){
    .nav-pills {
      font-size: 0;
    }
  }
  ul.campaign-steps {
    text-align: left;
    border-bottom: dashed 2px #aaa;
    margin-top: 30px;
    width: 83%;
  }
  .campaign-steps > li {
    margin-right: 50px;
    font-weight: 600;
  }
  @media (min-width: 769px){
    .nav-pills > li {
      display: inline-block;
      font-size: 13px;
    }
  }
  .nav-pills > li {
    float: none;
  }
  .campaign-steps > li > a {
    padding-right: 0;
    padding-left: 0;
  }
  .nav-pills > li > a {
    color: #333333;
    border-radius: 3px;
  }
  .nav > li > a {
    position: relative;
    display: block;
    padding: 7px 15px;
  }
  .campaign-steps a {
    font-size: 16px;
  }
  ul.campaign-steps li.active::after {
    display: block;
    content: "\ee31";
    font-family: 'icomoon';
    position: absolute;
    top: 15px;
    left: -35px;
    font-size: 10px;
    color: #333;
  }
  ul.campaign-steps > li.active > a{
    border-bottom: solid 2px #365899;
    border-radius: 5px 5px 0 0;
    font-weight: 600;
    background: #365899;
    padding: 10px 15px;
    margin-bottom: -2px;
    color: #fff;
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
  textarea.form-control {
    font-weight: normal;
    height: auto;
  }
  .form-control:focus {
    border-color: #4DB6AC;
    box-shadow: none;
    outline: 0;
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
  .bx-line {
    border: transparent !important;
  }
  .btn:hover, .btn:focus, .btn.focus {
    -webkit-box-shadow: 0 0 0 100px rgba(0, 0, 0, 0.05) inset;
    box-shadow: 0 0 0 100px rgba(0, 0, 0, 0.05) inset;
  }

</style>
