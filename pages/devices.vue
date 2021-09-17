<template>
  <div>
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
                        <div class="container-md-height m-t-20">
                          <div class="row ">
                            <center>
                              <!-- START PANEL -->
                              <div class="panel-transparent">
                                <p id="welcome" style="margin-top: 10px;margin-bottom: 15px"><i class="entypo-list-add"></i> Register your device ID!</p>
                                <p class="insight hidden-xs">Register your device to push out WhatsApp messages. <br>Approved device ID's are required to send messages on Termii!</p>

                                <div class="row">
                                  <center>
                                    <div class="col-sm-4 hidden-xs">
                                    </div>
                                    <div class="col-sm-4">
                                      <br>
                                      <a v-if="canRequestDevice" class="btn btn-primary" @click="showModal"><i class="fa fa-plus"></i> Make a new request</a>
                                    </div>
                                    <div class="col-sm-4 hidden-xs">
                                    </div>

                                  </center>
                                </div>
                              </div>
                            </center>
                          </div>
                          <!-- END PANEL -->
                        </div>
                      </div>
                    </div>
                  </div>
																		<TableVuePlaceHolder v-if="!show_shimmer">

																		</TableVuePlaceHolder>
                  <div  v-else>
                    <div class="p-15 ">
                      <div class="row">
                        <div>
                          <div class="panel">
                            <div class="panel-body p-none scrollme" style="overflow-x:auto;">
                              <table class="table table-responsive  table-hover">
                                <thead>
																																	<tr>
																																			<th style="width: 20%;" >Device ID</th>
																																			<th style="width: 20%;">Device Name</th>
																																			<th style="width: 20%;">Status</th>
																																			<th style="width: 20%;">Device Type</th>
																																			<th style="width: 20%;">Scan Device</th>
																																			<th style="width: 20%;"></th>
																																	</tr>
                                </thead>
                                <tbody>
                                <tr v-for="(row, index) in response_data.data" :key="row.id">
                                  <td data-label="SL" ><p>{{row.id}}</p></td>
                                  <td data-label="Sender ID"><p>{{row.name}}</p></td>
                                  <td data-label="Status"><p class="label"  :class="rowClassName(row,index)">{{row.device_status}}</p>
                                  <td ><p  class="label"  :class="rowClassType(row,index)">{{row.device_type}}</p></td>
                                  <td data-label="Status">
                                    <button :id="row.id" @click="getQRCode(row.id)"  style="background: #4caf50; border: 1px solid #4caf50; border-radius: 3px;" :class="barcodeDisabled(row)" v-show="showBarcodeIcon(row)"><i class="fa fa-barcode"   style="color: #fff;"></i></button>
                                    <p v-show="lockBarcode(row)"><i class="entypo-lock" style="color: red;"></i></p>
                                  </td>
                                  <td v-if="canViewDevice" data-label="view subscriptions">
                                    <nuxt-link class="btn btn-primary" :aria-disabled="isDisabled(row)" :to="{name: 'device-id-subscriptions', params:{name: row.name, id: row.id}}">manage device</nuxt-link>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
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
    <DeviceModal  @requested="requested"></DeviceModal>
			 <DeviceConnectedModal></DeviceConnectedModal>
			 <device-barcoded-modal @qrCodeModalClosed="setRefreshQrCodeFalse" :image_url="barcode_url"></device-barcoded-modal>
				<VerificationModal></VerificationModal>
			<InActiveSenderIdModal></InActiveSenderIdModal>
			<device-info-modal></device-info-modal>
			<UpdateCompanyNameModal></UpdateCompanyNameModal>
  </div>
</template>

<script>
import Sidebar from "../components/general/Sidebar";
import DashboardNavbar from "../components/general/navbar/DashboardNavbar";
import DeviceModal from "../components/modals/DeviceModal";
import TableVuePlaceHolder from "../components/general/TableVuePlaceHolder";
import VerificationModal from "~/components/modals/VerificationModal";
import InActiveSenderIdModal from "~/components/modals/InActiveSenderIdModal";
import DeviceConnectedModal from "../components/modals/DeviceConnectedModal";
import DeviceBarcodedModal from "../components/modals/DeviceBarcodeModal";
import DeviceInfoModal from "../components/modals/DeviceInfoModal";
import UpdateCompanyNameModal from "../components/index/modals/UpdateCompanyNameModal";

export default {
		     name: "devices",
		     middleware:['auth', 'permission'],
							components: {
								UpdateCompanyNameModal,
								DeviceInfoModal,
								DeviceBarcodedModal,
								DeviceConnectedModal,
								VerificationModal, InActiveSenderIdModal, TableVuePlaceHolder, DeviceModal, DashboardNavbar, Sidebar},
		     data(){
          return{
            response_data:[],
            name:'',
            messages_sent_today: {},
            isActive: false,
            active_status:'',
            device_status:'',
            device_id:"",
											 qrcode_device_id:'',
											 barcode_url: '',
											 refresh_qrcode: false,
										 	customer_permissions: localStorage.getItem('permissions'),
											 show_shimmer:false,

          }
      },
		    computed:{
							canRequestDevice(){
								return (this.customer_permissions.includes("request_device"));
							},
							canViewDevice()	{
								return (this.customer_permissions.includes("view_device"));
							}
						},
      methods: {

        async fetch(){

          try {
          	// get device ids
											this.response_data = await this.$axios.$get('devices');
											this.show_shimmer = true;
          }catch (e) {

          }
        },

        async getQRCode(device_id){
									this.qrcode_device_id = device_id;
									try{
        		this.disableQRCodeButton(device_id)

										const data  = await this.$device.getQRCode(device_id);

        		if (!data.data_type){
												this.$modal.show('device-info-modal');
										}

        		this.loadImageModal(data)

									this.enableQRCodeButton(device_id)

        	}
        	catch (e) {
										this.disableQRCodeButton(device_id)
										this.$modal.show('device-info-modal');
										this.enableQRCodeButton(device_id)
									}
        },

							async getQRCodeUrl(device_id){
						    try {
											const data  = await this.$device.getQRCode(device_id);
											this.barcode_url = data.data;
										}catch (e) {

										}

							},

							loadImageModal(data){
								switch (data.data_type) {
									case ('string'):{
										this.$modal.show('device-connected-modal');
										break;
									}
									case ('image_hash'):{
										this.barcode_url = data.data;
										this.$modal.show('device-barcode-modal');
										this.refresh_qrcode = true;
										this.getQRCodeUrlAtInterval();
										break;
									}
									default:{
										this.$modal.show('device-info-modal');
									}
								}
							},

							async getQRCodeUrlAtInterval(){

										setInterval(async () => {
											 if (this.refresh_qrcode){
													   await this.getQRCodeUrl(this.qrcode_device_id);
												}
										}, 30000);


							},
							setRefreshQrCodeFalse(){
							 this.refresh_qrcode = false;
							},

        showModal(){
        	if (JSON.parse(localStorage.getItem('user_data')).active_status_id.id ===  6){
										this.$modal.show('in-active-user-modal');
									}else {
										this.$modal.show('device-id-modal');
									}

        },
        requested(){
          this.fetch();
        },
        rowClassName(row){
        	switch (row.device_status) {
										case "ACTIVE": {
												this.isActive = true;
											 return 'label-success'
										}
										case "PENDING": {
											return 'label-warning'
										}
										default: {
											return 'label-danger'
										}
									}
        },
							rowClassType(row){
        	switch (row.device_type){
										case "Capped": {
												return 'capped-pill'
										}
										case "Template": {
											return 'template-pill'
										}

									}
							},
        showBarcodeIcon(row){
          return (row.device_status === 'ACTIVE');
        },
        lockBarcode(row){
          return (row.device_status === 'PENDING')
        },
        isDisabled(row){
          return(row.device_status === 'PENDING' )
        },
							barcodeDisabled(row){
        if (row.device_type === 'Template') return 'barcode-disabled'
							},
							disableQRCodeButton(device_id){
								$('#'+device_id).html('<span style="color: #fff"> Loading...</span>');
								$('#'+device_id).attr("disabled", true);
							},
							enableQRCodeButton(device_id){
								$('#'+device_id).html('<i class="fa fa-barcode" style="color: #fff;"></i>');
								$('#'+device_id).attr("disabled", false);
							}

      },
      mounted() {
							if(this.$store.state.view_verify_page === 'true'){
								this.$modal.show('verification-id-modal');
							}else {
								this.fetch();
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

    margin-bottom: 10px;
    color: inherit;
    background-color: #fff;
  }
  .btn-primary {
    color: #fff;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
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
  .scrollme {
    overflow-y: auto;
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
  .btn-primary:hover {
    color: #fff;
    background-color: #0c7cd5;
    border: 1px solid transparent !important;
  }
  .label {
    font-size: 11px;
    padding: 2px 10px;
    margin: 2px 0;
    border-radius: 20px;
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
    text-align: center;
    display: inline-block;
    text-transform: uppercase;
    border: 1px solid transparent;
    letter-spacing: 0.1px;
  }
  .label-warning {
			color: #fff;
    background-color: #FF5722;
  }
		.label-danger{
			background-color: red;
			color: #fff;
		}
  .label-success {
    border-color: #4CAF50;
    color: #fff;
    background-color: #4CAF50;
  }
		.capped-pill {
			border-color: #456990;
			color: #fff;
			background-color: #456990;
		}
		.template-pill {
			border-color:#2C0E37;
			color: #fff;
			background-color: #2C0E37;
		}

		.barcode-disabled{
			opacity: .5;
			pointer-events: none;

		}

</style>
