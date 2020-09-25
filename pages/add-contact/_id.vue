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
                                <form @submit.prevent="addContact" method="post" >
                                  <div class="form-group">
                                    <label>Country Code</label>
                                    <SearchDropdown :options="countries" :dropdown-selected-style="dropdownSelectedBackground" @item-selected="show($event)"></SearchDropdown>
                                  </div>
                                  <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Phone number" required v-model="phone_number">
                                  </div>
                                  <div class="form-group">
                                    <input type="text" class="form-control" placeholder="First name" v-model="first_name">
                                  </div>
                                  <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Last name" v-model="last_name">
                                  </div>
                                  <div class="form-group">
                                    <input type="email" class="form-control" placeholder="Email address" v-model="email_address">
                                  </div>
                                  <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Company" v-model="company">
                                  </div>
                                  <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Username" v-model="username">
                                  </div>
                                  <button type="submit" class="btn btn-success btn-sm pull-right" :disabled="isDisabled"><i class="fa fa-plus"></i> Add </button>
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
    import Sidebar from "../../components/general/Sidebar";
    import DashboardNavbar from "../../components/general/navbar/DashboardNavbar";
    import SearchDropdown from "../../components/general/dropdown/SearchDropdown";
				import {mapGetters} from "vuex";
    export default {
        name: "add-contact",
					   middleware: 'auth',
      components: {SearchDropdown, DashboardNavbar, Sidebar},
      data(){
          return{
            selected_country_code:'',
            phone_number:'',
            first_name:"",
            last_name:"",
            email_address:'',
            company:"",
            username:"",
            countries: ['Exist on phone number'],
            dropdownSelectedBackground:{
              background: 'white',
              border: '1px solid rgba(98, 98, 98, 0.27)',
              fontWeight: '100',
            },
          }
      },
					computed:{
        	isDisabled:function () {
												return(this.selected_country_code === '' || this.phone_number === '');
									},
						...mapGetters(['getBulkSmsId'])
					},
      methods:{
        async getCountries(){
          try {
            let response_data = await this.$axios.$get('utility/countries');
            for (let i = 1; i < response_data.data.length; i++){
              this.countries.push(response_data.data[i].name + ` (${response_data.data[i].d_code.slice(1)})`);
            }
          }catch (e) {

          }
        },
        async addContact(){
          try{
            await this.$axios.$post('sms/phone-book/contact/add', {

                phone_number: this.phone_number,
                user_name: this.username,
                company: this.company ,
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email_address,
                id: this.$route.params.id,
                country_code: this.selected_country_code

            });
            await this.$router.push({path: '/view-contact/'+ this.getBulkSmsId});
											this.$toast.success('Contact added successfully');
          }catch (e) {
											let errors = e.response.data.errors;
											for(let key in errors){
												errors[key].forEach(err => {
													this.$toast.error(err);
												});
											}
											this.$toast.error(e.response.data.error);
          }
        },
        show(country_code){
          this.selected_country_code =  country_code.substring(country_code.indexOf('(') + 1, country_code.indexOf(')') );
        }
      },
      mounted() {
          this.getCountries();
							   this.$store.commit('setBulkSmsId', this.$route.params.id);

      }
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
  .page-title .breadcrumb > li > a, .page-title .breadcrumb > li + li:before {
    color: #333;
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
