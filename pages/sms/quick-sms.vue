<template>
  <div class="container-fluid body">
    <div id="msb" class="col-md-2">
      <Sidebar class="hidden-xs"></Sidebar>
    </div>
    <div class="col-md-10">
      <DashboardNavbar></DashboardNavbar>
      <!-- Page header -->
      <div class="page-header">
        <div class="page-header-content">
          <div class="page-title mt-100">
            <ul class="breadcrumb breadcrumb-caret position-right">
              <li><nuxt-link to="/dashboard">Home</nuxt-link></li>
              <li><nuxt-link to="/sms/quick-sms">Direct sms</nuxt-link></li>
            </ul>
            <h2>
              <span class="text-semibold"><i class="entypo-paper-plane"></i> Direct sms</span>
            </h2>
          </div>

          <ul class="nav nav-pills campaign-steps hidden-xs" style="margin-bottom: -20px;">
            <li>
              <nuxt-link to="/message/select-type">
                <i class="icon-users4"></i> Select type
              </nuxt-link>
            </li>
            <li class="active">
              <nuxt-link to="/sms/quick-sms">
                <i class="entypo-paper-plane"></i> Send message
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
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
                        <div class="row mb-20">
                          <div class="mt-20">
                            <div class="col-md-6">
                              <form role="form" method="post">
                                <div class="form-group ">
                                  <label>Select Channel </label>
                                  <small style="color: red !important;font-size: 11px;">(WhatsApp available only to premium users)</small>
                                  <v-select :options="sms_channels" placeholder="Select sms channel" label="name" v-model="selected_sms_channel">
																																			<template #option="{ name }">
																																				<p >{{ name }} </p>
																																			</template>
																																		</v-select>
                                </div>
                                <div class="form-group">
                                  <label>Recipients</label>
                                  <v-select :options="countries" :filter="fuseSearch" placeholder="Select country code" label="name" append-to-body :calculate-position="withPopper"  v-model="selected_country_code">
																																			<template #option="{ name, d_code }">
																																				<p >{{ name }} {{`(${d_code.substring(1)})`}}</p>
																																			</template>
																																			<template #selected-option="{ name, d_code }">
																																				<div style="display: flex; align-items: baseline;">
																																					{{name}} <strong>{{ `(${d_code.substring(1)})` }}</strong>

																																				</div>
																																			</template>
																																		</v-select>
                                </div>
                                <div class="form-group">
                                  <textarea class="form-control" rows="5" name="recipients" v-model="phone_numbers"  placeholder="Separate the numbers using a comma eg. 081094472,08109447343" id="recipients"></textarea>
                                  <span class="pull-right">Total Number Of Recipients: <span class="number_of_recipients bold m-r-5">{{total_no_of_recipients}}</span></span>
                                </div>
                              </form>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group ">
                                <label class="hidden-xs">Sender ID / Device ID</label>
                                <small style="color: red !important;font-size: 11px;" class="hidden-xs">(Can't find your ID below, <nuxt-link to="/sms/sender-id-management">register yours here</nuxt-link> - Process takes less than 24 hours)</small>
                                <v-select :options="active_sender_id" placeholder="Select sender ID" label="sender_id" append-to-body :calculate-position="withPopper" v-model="selected_sender_id">
																																	<template #option="{ sender_id }">
																																		<p >{{sender_id }} </p>
																																	</template>
																																</v-select>
                              </div>
                              <div class="form-group">
                                <label>Message</label>
                               <v-select :options="message_type" v-model="selected_message_type" label="name">
																																<template #option="{ name }">
																																	<p >{{ name }} </p>
																																</template>
																															</v-select>
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
</template>

<script>
    import vSelect from 'vue-select';
    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import 'vue-select/dist/vue-select.css';
				import { createPopper } from '@popperjs/core';
    import SearchDropdown from "../../components/general/dropdown/SearchDropdown";
    import CustomSelect from "../../components/general/dropdown/CustomSelect";
				import Fuse from 'fuse.js';
    export default {
        name: "quick-sms",
      components: {CustomSelect, SearchDropdown, DashboardNavbar, Sidebar, vSelect},
      middleware: 'auth',
      data(){
          return{
            sms_channels: [],
            countries: [],
												phone_numbers:'',
            active_sender_id: [],
            message_type: [{name: 'Plain'}, {name:'Voice'}, {name:'MMS'}, {name:'Unicode'}, {name:'Arabic'},],
												selected_message_type:'Plain',
												selected_country_code:'',
												selected_sender_id:'',
											placement: 'top',
											total_no_of_recipients: 0,
											selected_sms_channel:'',
            dropdownSelectedBackground:{
              background: 'white',
              border: '1px solid rgba(98, 98, 98, 0.27)',
              fontWeight: '100',
            },
            dropdownStyle:{
             borderRadius: '5px',
            }
          }
      },
					watch:{
       phone_numbers(value){
       		if (value === ','){
       			this.total_no_of_recipients += 1;
									}
							}
					},
      methods: {
          async fetch() {
            // get sms channels
              let response_data = await this.$axios.$get('sms/channels');
              this.sms_channels = response_data.data

											//get active sender id
											let data = await this.$axios.$get('sms/sender-id?filter=active');
											this.active_sender_id = data.data;

											//get countries
											let response = await this.$axios.$get('utility/countries');
														this.countries = response.data
          },
							withPopper (dropdownList, component, {width}) {
								dropdownList.style.width = width;
								const popper = createPopper(component.$refs.toggle, dropdownList, {
									placement: this.placement,
									modifiers: [
										{
											name: 'offset', options: {
												offset: [0, -1]
											}
										},
										{
											name: 'toggleClass',
											enabled: true,
											phase: 'write',
											fn ({state}) {
												component.$el.classList.toggle('drop-up', state.placement === 'top')
											},
										}]
								});
								return () => popper.destroy();

							},
							fuseSearch(options, search) {
								const fuse = new Fuse(options, {
									keys: ["name", "d_code", ],
									shouldSort: true
								});
								return search.length
									? fuse.search(search).map(({ item }) => item)
									: fuse.list;
							}

      },
      mounted() {
         this.fetch();
      }
    }
</script>

<style >
	.v-select.drop-up.vs--open .vs__dropdown-toggle {
		border-radius: 0 0 4px 4px;
		border-top-color: transparent;
		border-bottom-color: rgba(60, 60, 60, 0.26);
	}

	[data-popper-placement='top'] {
		border-radius: 4px 4px 0 0;
		border-top-style: solid;
		border-bottom-style: solid;
		border-bottom-color: rgba(60, 60, 60, 0.26);
		box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.15)
	}
  .bg{
    background: red;
  }
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
  .nav > li {
    position: relative;
    display: block;
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
  .nav {
    margin-bottom: 0;
    padding-left: 0;
    /* list-style: none; */
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
  .campaign-steps > li > a {
    padding-right: 0;
    padding-left: 0;
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
