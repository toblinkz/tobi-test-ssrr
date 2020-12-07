<template>
	<div>
		<div class="dropdown-container" v-if="base" @click="showDrop">
			<img :src="`${flag_start_url}/${country_code}${flag_end_url}`"  role="img" class="country-img">
			<p class="country-name">{{currency_code}}</p>
			<span class="arrow down"></span>
		</div>
		<div class="search-input" v-if="show" v-click-outside="hideDrop">
			<p class="input-search">
				<input type="search" aria-label="Search for a country"   v-model.trim="inputValue" placeholder="Select currency and country">
			</p>
			<span class="arrow up"></span>
			<div class="drop-list">
				<div class="drop-list-menu">

					<div class="fxgjOm">
						<button class="currency-button inactive-currency-button" :class="{'currency-button2': ngn_btn_active}" @click="setNigeriaRate">
							NGN
						</button>
						<button class="currency-button inactive-currency-button" :class="{'currency-button2': ghc_btn_active}" @click="setGhanaRate">
							GHS
						</button>
						<button class="currency-button inactive-currency-button" :class="{'currency-button2': kes_btn_active}" @click="setKenyaRate">
							KES
						</button>
						<button class="currency-button inactive-currency-button" :class="{'currency-button2': usd_btn_active}" @click="setDollarRate">
							USD
						</button>
					</div>
				</div>

				<div  class="countries-dropdown-container">
					<div v-for="row in filteredCountry" :key="row.code" class="dropdown-item" @click="selectedItem(row)"  >
						<img :src="`${flag_start_url}/${row.code}${flag_end_url}`"  role="img" class="dropdown-item-img">
						{{ row.name }}
					</div>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
import ClickOutside from "vue-click-outside";
export default {
	name: "PricingDropdown",
	data(){
		return{
			inputValue: "",
			show: false,
			base: true,
			countries: null,
			flag_start_url: 'https://www.countryflags.io/',
			flag_end_url: '/flat/64.png',
			country_code: 'NG',
			currency: '$',
			currency_code:'USD',
			selected: false,
			ngn_btn_active: false,
			ghc_btn_active: false,
			kes_btn_active: false,
			usd_btn_active: true,
		}
	},
	computed: {
		filteredCountry(){
			if (this.inputValue) {
				return this.countries.filter(item => {
					return item.name.toLowerCase().includes(this.inputValue.toLowerCase())
				})
			} else {
				return this.countries;
			}
		}
	},
	methods:{
		showDrop(){
			this.show = true;
			this.base = false;
		},
		hideDrop(){
			this.show = false;
			this.base = true;
			this.inputValue = '';
		},
	async	getCountries(){
			try{
				let response =  await this.$axios.$get('/utility/countries');
				this.countries = response.data;
			}catch (e) {

			}

		},
		selectedItem(row){
			this.inputValue = '';
			this.$emit('item-selected', row);
			this.show = false;
			this.base = true;
			this.country_code = row.code;
		},
		setDollarRate(){
			this.$emit('set-exchange-currency', 'USD');
			this.currency_code = 'USD';
			this.ngn_btn_active = false;
			this.usd_btn_active = true;
			this.ghc_btn_active = false;
			this.kes_btn_active = false;
		},
		setNigeriaRate(){
			this.$emit('set-exchange-currency', 'NGN');
			this.currency_code = 'NGN';
			this.ngn_btn_active = true;
			this.usd_btn_active = false;
			this.ghc_btn_active = false;
			this.kes_btn_active = false;
		},
		setGhanaRate(){
			this.$emit('set-exchange-currency', 'GHC');
			this.currency_code = 'GHC';
			this.ngn_btn_active = false;
			this.usd_btn_active = false;
			this.ghc_btn_active = true;
			this.kes_btn_active = false;
		},
		setKenyaRate(){
			this.$emit('set-exchange-currency', 'KSH');
			this.currency_code = 'KSH';
			this.ngn_btn_active = false;
			this.usd_btn_active = false;
			this.ghc_btn_active = false;
			this.kes_btn_active = true;
		}
	},
	directives: {
		ClickOutside
	},
	mounted() {
		this.getCountries();
	}
}
</script>

<style scoped>
.dropdown-container {
	display: inline-flex;
	-webkit-box-align: center;
	align-items: center;
	padding: 12px 16px;
	border: 1px solid #365899;
	border-radius: 4px;
}
.country-img{
	height: 18px;
	width: auto;
	object-fit: cover;
}
.country-name{
	margin: 0px 10px 0px 0px;
	color: #365899;
	font-size: 14px;
	font-weight: 600;
	text-align: center;
}

.country-name::before {
	content: "";
	display: inline;
	border-left: 1px solid #365899;
	height: 2rem;
	margin: 0px 16px;
}
.dropdown-container > span.arrow.down {
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-top: 5px solid #365899;
}
.dropdown-container > span.arrow.arrow {
	cursor: pointer;
	margin: 4px 0px 4px auto;
	display: inline-block;
	vertical-align: middle;
	width: 0px;
	height: 0px;
}
.search-input{
	display: inline-flex;
	-webkit-box-align: center;
	align-items: center;
	border: 1px solid #365899;
	border-radius: 4px;
	padding: 0px 12px 0px 0px;
}
.input-search {
	margin: 0px 36px 0px 0px;
	color: rgb(154, 168, 189);
	font-size: 14px;
	font-weight: normal;
	line-height: 20px;
	padding: 0px;
}
.input-search > input {
	border: none;
	width: 190px;
	padding: 12px 0px 12px 8px;
}
.search-input > span.arrow.up {
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-bottom: 5px solid rgb(0, 137, 255);
}
.search-input > span.arrow.arrow {
	cursor: pointer;
	margin: 4px 0px 4px auto;
	display: inline-block;
	vertical-align: middle;
	width: 0px;
	height: 0px;
}
.drop-list{
	position: absolute;
	max-width: 250px;
	min-width: 250px;
	top: 32%;
	z-index: 3;
	/*padding: 4px;*/
	border: 1px solid #365899;
	background: rgb(255, 255, 255);
}
.drop-list-menu{
	box-sizing: border-box;
	border-radius: 4px;
	/*padding: 4px 10px;*/
	border-bottom: 1px solid #365899;
	display: flex;
	-webkit-box-pack: justify;
	justify-content: space-between;
	-webkit-box-align: center;
	align-items: center;
}
.currency-button{
	display: inline-block;
	box-sizing: border-box;
	text-align: center;
	outline: none;
	text-decoration: none;
	cursor: pointer;
	border-radius: 4px;
	font-family: inherit;
	border: 0px !important;
	font-size: 14px;
	font-weight: 600;
	padding: 7px 12px;
	background-color: rgb(255, 255, 255);
	color: #365899;
	transition: background 0.2s ease 0s;
}
.currency-button2{
	padding: 7px 16px;
	color: #365899 !important;
	font-weight: bold !important;
	background: rgb(238, 244, 255) !important;
	border: 0px !important;
}
.fxgjOm {
	max-width: 250px;
	min-width: 250px;
	top: 100%;
	left: 0px;
	z-index: 3;
	padding: 4px;
	border: 1px solid #365899;
	background: rgb(255, 255, 255);
}
.inactive-currency-button {
	color: rgb(36, 55, 78) !important;
	font-weight: normal ;
	border: 0px !important;
}
.countries-dropdown-container {
	padding-bottom: 5px;
	max-height: 150px;
	overflow-y: auto;
	display: block;
}
.dropdown-item {
	display: flex;
	width: 100%;
	padding: 11px 16px;
	cursor: pointer;
}
.dropdown-item > img {
	margin-right: 16px;
}
.dropdown-item-img {
	height: 18px;
	width: auto;
	object-fit: cover;
}
ol, ul {
	padding: 0;
	list-style-position: outside;
	list-style-image: none;
}
</style>
