<template>
  <div class="container-fluid body">
    <div id="msb" class="col-md-2">
      <Sidebar class="hidden-xs"></Sidebar>
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
               <span class="text-semibold"><i class="entypo-paper-plane"></i>Group sms</span>
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
                         <div class="row mb-30">
                           <div class="mt-40">
																												<form role="form" @submit.prevent="sendGroupSms" method="post">
                             <div class="col-md-6">
                                 <div class="form-group mt-30">
                                   <label>Select Channel </label>
                                   <small style="color: red !important;font-size: 11px;">(WhatsApp available only to premium users)</small>
                                  <v-select :options="sms_channels"  append-to-body :calculate-position="withPopper" placeholder="Select sms channel" :reduce="channel => channel.id" label="name" v-model="selected_sms_channel">
																																			<template #option="{ name }">
																																				<p >{{ name }} </p>
																																			</template>
																																		</v-select>
                                 </div>
                                 <div class="form-group">
                                   <label>Recipients</label>
                                   <v-select :options="countries" :reduce="code => code.d_code" v-model="selected_country_code"  append-to-body :calculate-position="withPopper" placeholder="Select country code" label="name">
																																				<template #option="{ name, d_code }">
																																					<p >{{ name }} {{`(${d_code})`}}</p>
																																				</template>
																																			</v-select>
                                 </div>
                                 <div class="form-group">
                                   <small style="color: red !important;font-size: 11px;">(Ensure you have added contacts to your phonebook)</small>
                                   <v-select  :options="phone_books" append-to-body :calculate-position="withPopper" :reduce="phonebook => phonebook.id"   label="phonebook_name" placeholder="Phone Book" v-model="selected_phone_book">
																																				<template #option="{ phonebook_name }">
																																					<p >{{ phonebook_name }} </p>
																																				</template>
																																			</v-select>
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
                                   <date-picker v-model="date_time" value-type="YYYY/MM/DD HH:MM:SS" type="datetime" confirm style="width: 100%" placeholder="Select date"></date-picker>
                                 </div>
                             </div>
                             <div class="col-md-6">
                               <div class="form-group mt-30">
                                 <label class="hidden-xs">Sender ID / Device ID</label>
                                 <small style="color: red !important;font-size: 11px;" class="hidden-xs">(Can't find your ID below, <nuxt-link to="sms/sender-id-management">register yours here</nuxt-link> - Process takes less than 24 hours)</small>
                                <v-select :options="active_sender_id" append-to-body :calculate-position="withPopper" placeholder="Select sender ID" :reduce="sender => sender.sender_id" label="sender_id" v-model="selected_sender_id">
																																	<template #option="{ sender_id }">
																																		<p >{{sender_id }} </p>
																																	</template>
																																</v-select>
                               </div>
                               <div class="form-group">
                                 <label>Campaign Type</label>
																																<v-select :options="campaign_type"  append-to-body :calculate-position="withPopper" v-model="selected_campaign_type" :reduce="type => type.id" label="name" placeholder="Select Campaign type">
																																	<template #option="{ name }">
																																		<p >{{ name }} </p>
																																	</template>
																																</v-select>
                               </div>
                               <div class="form-group">
                                 <textarea class="form-control" name="message" rows="5" v-model="message"></textarea>
                                 <span id="remaining">{{max_characters}} characters remaining</span> |
                                 <span id="messages">{{no_of_messages}} message(s)</span>
                               </div>
                             </div>
                             <div class="col-md-12">
                               <button type="submit" class="btn bx-line btn-success btn-sm" :disabled="isDisabled"><i class="fa fa-send" ></i> Send </button>
                               <nuxt-link to="/sms/campaign-reports" class="btn bx-line btn-primary"><i class="fa fa-angle-double-right"></i> Next - View report</nuxt-link>
                             </div>
																												</form>
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
    import DatePicker from "vue2-datepicker";
    import 'vue2-datepicker/index.css';
    import SearchDropdown from "../../components/general/dropdown/SearchDropdown";
    import CustomSelect from "../../components/general/dropdown/CustomSelect";
				import vSelect from 'vue-select';
				import 'vue-select/dist/vue-select.css';
				import {createPopper} from "@popperjs/core";
				import Swal from 'sweetalert2';
				import Fuse from "fuse.js";
				import {mapGetters} from "vuex";

    export default {
        name: "group-sms",
					middleware: 'auth',
      components: {CustomSelect, SearchDropdown, DashboardNavbar, Sidebar, DatePicker, vSelect},
      data(){
          return{

											selected_phone_book:'',
            send_later: false,
            date_time: null,
            sms_channels: [],
            countries: [],
									 		placement: 'top',
											 message:'',
            active_sender_id: [],
										 	campaign_type: [{id: 0, name: 'Regular'}, {id: 1, name:'Personalized'}],
										 	selected_campaign_type: '',
											selected_country_code:'',
											selected_sender_id:'',
											selected_sms_channel:'',
											schedule_sms_status:"regular",
											max_characters: 160,
											no_of_messages: 1,
            phone_books:[],
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
						message(value){
							let maxChar = 160;
							let max = 156;
							let totalChar = value.length;
							if (totalChar <= maxChar){
								this.max_characters = maxChar - totalChar;
								this.no_of_messages = 1;
							} else {
								totalChar = totalChar - maxChar;
								this.no_of_messages = Math.ceil(totalChar / max);
								this.max_characters = this.no_of_messages * max - totalChar;
								this.no_of_messages = this.no_of_messages + 1;
							}
						}
					},
					computed:{
						...mapGetters(['getPhoneBookId', 'getBulkSmsId']),
						isDisabled: function () {
							return (this.selected_sms_channel === '' || this.selected_sender_id === ''  || this.selected_phone_book === '' ||
														this.selected_country_code === '' || this.message === '' || this.selected_campaign_type === '')

						}
					},
      methods: {
        async fetch() {
          try {
          	//get sms channel
            let response_data = await this.$axios.$get('sms/channels');
            this.sms_channels = response_data.data;

            //get active sender id
											let response = await this.$axios.$get('sms/sender-id?filter=active');
											this.active_sender_id = response.data;

											//get phonebooks
											let phonebook_data = await this.$axios.$get('sms/phone-book?filter=unpaginated');
											this.phone_books = phonebook_data.data;

											//get country code
											let country_data = await this.$axios.$get('utility/countries');
											this.countries = country_data.data;

          }catch (e) {

          }
        },
							async getPhoneBook(){
        	let data = await this.$axios.$get('sms/phone-book/detail/' + this.getBulkSmsId);
									this.phone_books.push(data.data);
									this.selected_phone_book = data.data.id;
							},
							toggleScheduleTime(){
									this.send_later = !this.send_later
									if (this.schedule_sms_status === 'regular'){
										this.schedule_sms_status = 'scheduled'
									}else {this.schedule_sms_status = 'regular'}
							},
							async sendGroupSms() {
        	try {
									let data =	await this.$axios.$post('sms/group/send', {
											sender_id: this.selected_sender_id,
											message: this.message,
											channel: this.selected_sms_channel,
											country_code: this.selected_country_code.substring(1),
											contact_list_id: this.selected_phone_book,
											campaign_type: this.selected_campaign_type,
											schedule_time: this.date_time,
											schedule_sms_status: this.schedule_sms_status,
										});
										await Swal.fire({
											icon: 'success',
											title: `${data.message}`,
											showConfirmButton: true,
										})
									}catch (e) {
												this.$toast.error("Something went wrong. Try again!");
									}

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
        this.getPhoneBook();


      }
    }
</script>

<style scoped>
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
  .nav > li {
    position: relative;
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
    /*padding: 7px 15px;*/
  }

  .nav {
    margin-bottom: 0;
    padding-left: 0;
    /* list-style: none; */
  }
  .campaign-steps a {
    font-size: 16px;
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
