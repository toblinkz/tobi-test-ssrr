<template>
  <transition>
  <modal name="service-pricing-modal"  role="dialog" height="auto">
    <div>

      <!-- Modal content-->
      <div>
        <div class="modal-header">
          <button type="button" class="close" @click="close">×</button>
        </div>
        <div class="modal-body">

          <div class="row">
											<div  style="display:flex; justify-content: center">
												<p id="welcome" style="margin-top: 10px;margin-bottom: 0px"><i class="entypo-basket"></i> Our Service Prices!</p>
											</div>
            <div style="display:flex; justify-content: center">
              <!-- START PANEL -->
              <div class="panel-transparent">
                <p class="insight">View our full list of service prices in countries<br> <span style="display:flex; justify-content: center">across Africa and internationally</span>
                </p>
              </div>
            </div>

          </div>

          <div class="row">
											<div style="display:flex; justify-content: center">
												<PricingDropdown @item-selected="setCountry($event)"  @set-exchange-currency="setExchangeRateConversion($event)"></PricingDropdown>
											</div>

											<div style="display:flex; justify-content: center">
              <div class="panel-body p-none">
                <table class="table table-hover toke">
                  <tbody>
                  <tr>
																			<td><p><strong>Services</strong></p></td>
																			<td><p><strong>Pricing</strong></p></td>

                  </tr>
                  </tbody>
                  <tbody>
                  <tr v-for="row in services" :key="row.id">
                    <td><p>{{ row.service }}</p></td>
                    <td><p>starting @ {{ currency }}{{ (row.pricing / exchange_rate).toFixed(4)}}</p></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
												<div class="m-t-15" style="display:flex; justify-content: center">
													<a class="bg-blue" @click="close">Continue to TopUp</a>
												</div>
            </div>

          </div>
        </div>
      </div>
  </modal>
  </transition>
</template>

<script>
    import PricingDropdown from "@/components/general/dropdown/PricingDropdown";
				export default {
        name: "ServicePriceModal",
				  	components: {PricingDropdown},
							data(){
        	return{
        		currency: "$",
										pricing:"",
										services:[],
										usd_exchange_rate: '',
										usd_currency: '',
										ghc_exchange_rate:'',
										ghc_currency:'',
										kes_exchange_rate:'',
										kes_currency:'',
										ngn_exchange_rate:'',
										ngn_currency:'',
										exchange_rate: 365,
										exchange_rates:[]
									}
							},
				  	methods: {
          close() {
											this.$modal.hide('service-pricing-modal');
          },
							async	setCountry(country){
          	try {
												let response =await this.$axios.$get('/utility/pricing?country=' + country.name);
												this.services = response.data;
											}catch (e) {

											}

								},
								async getExchange(){
          	try {
												let response = 	await this.$axios.$get('/utility/exchange/rate');
												this.exchange_rates = response.data;
												this.setExchangeRate();
											}catch (e){

											}

								},
								setExchangeRate() {
									this.exchange_rates.forEach((exchange_rate)=>{
										switch (exchange_rate.country_id) {
											case (147):{
												this.ngn_exchange_rate =  exchange_rate.naira_exchange_rate;
												this.ngn_currency = exchange_rate.currency;
												break;
											}
											case (76):{
												this.ghc_exchange_rate =  exchange_rate.naira_exchange_rate;
												this.ghc_currency = exchange_rate.currency;
												break;
											}
											case (103):{
												this.kes_exchange_rate =  exchange_rate.naira_exchange_rate;
												this.kes_currency = exchange_rate.currency;
												break;
											}
											case (221):{
												this.usd_exchange_rate =  exchange_rate.naira_exchange_rate;
												this.usd_currency = exchange_rate.currency;
												break;
											}
										}
									});
							},

								setExchangeRateConversion(currency){
									switch (currency) {
										case ('NGN'):{
											this.setNigeriaRate();
											break;
										}
										case ('GHC'):{
											this.setGhanaRate();
											break;
										}
										case ('KSH'):{
											this.setKenyaRate();
											break;
										}
										case ('USD'):{
											this.setDollarRate();
											break;
										}
									}
								},
								setKenyaRate(){
									this.exchange_rate = this.kes_exchange_rate;
									this.currency = this.kes_currency;

								},
								setGhanaRate(){
									this.exchange_rate = this.ghc_exchange_rate;
									this.currency = this.ghc_currency;
								},
								setDollarRate(){
									this.exchange_rate = this.usd_exchange_rate;
									this.currency = this.usd_currency;
								},
								setNigeriaRate(){
									this.exchange_rate = this.ngn_exchange_rate;
									this.currency = this.ngn_currency;
								},
			},

					async mounted() {
        	try {
										let response = await this.$axios.$get('/utility/pricing?country=Nigeria');
										this.services = response.data;
										await this.getExchange();
									}catch (e) {

									}

					}
				}
</script>

<style scoped>
  .modal-open .modal {
    overflow-x: hidden;
    overflow-y: auto;
  }
		.vm--container{
			display: block;
			overflow-y: auto;
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 1050;
			-webkit-overflow-scrolling: touch;
			outline: 0;
			background-color: rgba(0, 0, 0, 0.5);
		}
  @media (min-width: 769px){
    .modal-dialog {
      width: 600px;
      margin: 30px auto;
    }
  }
  .modal-dialog {
    position: relative;
  }
  .modal-content {
    border: 0;
    border-radius: 0;
    margin-top: 100px;
  }
  .modal-content {
    /* border-radius: 3px; */
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }
  .modal-content {
    position: relative;
    background-color: #fff;
    border: 1px solid #999;
    border: 1px solid transparent;
    border-radius: 5px;
    -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    background-clip: padding-box;
    outline: 0;
  }
  .modal-header {
    position: relative;
    padding-bottom: 0;
  }
  .modal-header {
    padding: 20px;
    border-bottom: 1px solid transparent;
  }
  .modal-header .close[type=button] {
    background: rgba(255,255,255,0.3);
    width: 25px;
    height: 25px;
    display: block;
    border-radius: 20px;
    color: #000;
    font-weight: bold;
    margin-top: -3px;
    margin-right: -10px;
  }
  .modal-header .close {
    position: absolute;
    right: 20px;
    top: 50%;
    /* margin-top: 0; */
  }
  button.close {
    padding: 0;
    cursor: pointer;
    background: transparent;
    border: 0;
    -webkit-appearance: none;
  }
  .close {
    font-size: 17px;
    text-shadow: none;
    opacity: 0.6;
    filter: alpha(opacity=60);
  }
  .close:hover, .close:focus {
    outline: 0;
    opacity: 1;
    filter: alpha(opacity=100);
  }
  .modal-body {
    padding: 20px 20px 60px 20px;
    position: relative;
  }
  .row {
    margin-left: 0px;
    margin-right: 0px;
  }
  #welcome {
    margin-bottom: 15px;
    font-weight: 300;
    letter-spacing: normal;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    color: #2c2c2c;
    display: block;
    font-style: normal;
    -webkit-margin-before: 1em;
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
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    display: block;
  }
  .wide {
    width: 200px !important;
  }
  .panel-body {
    position: relative;
    padding: 20px;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  .table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 0;
  }
  .table > tbody > tr > td, .table > tfoot > tr > td {
    vertical-align: middle;
    padding: 12px 50px;
    line-height: 1.5384616;
    border-top: 2px solid #ddd;
  }
  .table >tbody:first-child >tr>td{
    border-top: 0;
  }

  .modal.in .modal-dialog {
    -webkit-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    -o-transform: translate(0, 0);
    transform: translate(0, 0);
  }


</style>
