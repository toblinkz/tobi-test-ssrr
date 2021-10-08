<template>
	<div class="flex-container">
		<div class="flex-item-left hidden-xs" style="background: linear-gradient(-48deg,#0DCBE5 -30%, #365899 60%) !important;" >
			<div class="mt-50">
				<p  style="font-size:18px; padding:0 15px; color: #FFFFFF">Set Up Your account </p>
				<p  style="font-size: 12px; padding: 0 15px; color: #FFFFFF" >Here's a quick guide to setting up your account</p>
				<div class="m-l-20 mt-50">
					<img src="/images/stepper/guide_three.svg" />
				</div>
			</div>
		</div>

		<div  class="flex-item-right" style="padding: 0 30px">
			<div>
				<div class="mt-50" style="background-color: #f5f5f5;border-color: #efefef; padding: 15px; border-radius: 5px">
					<p style="font-weight: 700;">Step 3 of 3: Virtual Account Setup (optional)</p>
				</div>
				<p class="mt-20">Generate a Virtual Account Number to easily fund your wallet with to keep sending your SMS.</p>

				<div class="mt-20" style="background-color:#EAF1FC ;border-color: #efefef; padding: 15px; border-radius: 5px; display: flex">
					<img class="m-r-5" src="/images/info_light.svg"><p style="font-size: 13px; margin-bottom: 0px">The new CBN regulations mandates that you input your BVN to generate a new account number. </p>
				</div>

				<div class="mt-30 form-group">
					<label>Date of Birth</label>
					<date-picker v-model="date_of_birth" value-type="YYYY-MM-DD " type="date" style="width: 90%" placeholder="Select your date of birth"  confirm></date-picker>

					<br>
					<label class="mt-20">Bank Verification Number</label>
					<input type="text" class="form-control" :class="{'error ' : hasBvnError}"  v-model="bvn"  placeholder="Enter your BVN" >
					<span class=" error_field_message" v-if="error_message.bvn">{{error_message.bvn}}</span>

					<br>
				</div>
				<div class="mt-30">
					<a class="bg-blue"  >
						{{button_text }}
						<span v-show="isLoading" >
						<img src="/images/black_spinner.svg" height="20px" width="30px"/>
				</span>
					</a>
				</div>
				<div class="mt-100">
					<span style="font-weight: 700; cursor: pointer; color: #365899;" class="text-left">Back</span>
					<span style="font-weight: 700; cursor: pointer; color: #365899;" class="pull-right" @click="skipAccountSetUp">Skip</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import 'vue2-datepicker/index.css';
import ButtonSpinner from "../../../general/ButtonSpinner";
export default {
	name: "VirtualAccountComponent",
	components: { DatePicker},
	data() {
		return{
			bvn: '',
			date_of_birth: null,
			isLoading: false,
			error_message:[],
			hasBvnError:false,
			button_text: 'Set up your account',
		}
	},
	watch: {
		bvn(value){
			this.validateBvn(value);
		},
	},
	computed: {
		isDisabled: function () {
			return ( this.hasBvnError || this.bvn === '' || this.date_of_birth === null );
		},
	},

	methods:{
		async submitForm(){
			this.isLoading = true;
			this.button_text = 'Creating';
			try {
				await this.$utility.generateNubanAccount(this.bvn, this.date_of_birth);
				this.$emit('showSuccessModal');
				this.isLoading = false;
				this.button_text = 'Create new account';
			}catch (e) {
				this.isLoading = false;
				this.button_text = 'Create new account';
				this.$toast.error(e.response.data.message);
			}
		},

		skipAccountSetUp(){
			this.$emit('showSuccessModal');
		},

		validateBvn(value){
			if(value.length < 11 || isNaN(value) || value.length > 11){
				this.error_message['bvn'] = 'BVN must contain 11 digits';
				this.hasBvnError = true;
			} else {
				this.error_message['bvn'] = '';
				this.hasBvnError = false;
			}
		},
	}
}
</script>

<style scoped src="@/assets/css/modal/signupwizard.css";>

</style>
