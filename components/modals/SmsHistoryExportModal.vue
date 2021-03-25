<template>
    <modal name="export-modal" height="auto">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" @click="close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="myModalLabel">Export</h4>
						</div>
						<form  @submit.prevent="getExportUrl" class="form-some-up form-block" role="form" method="post">
							<div class="modal-body">
								<div class="col-md-6">
									<div class="form-group ">
										<label>Select type</label>
										<select  class="form-control" @change="onChange($event)">
											<option >All</option>
											<option >To</option>
											<option >From</option>
										</select>
										<div v-show="showPhoneNumber">
											<label> Phone number</label>
											<input type="tel" class="form-control" v-model="phone_number">
										</div>
										<div v-show="showSenderId">
											<label>Sender ID</label>
											<input type="text" class="form-control" v-model="sender_id">
										</div>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Number of records</label>
										<input type="text" class="form-control"  v-model="no_of_records" :class="{'error' : hasRecordsError}">
										<span class=" error_field_message" v-if="error_message.records">{{error_message.records}}</span>
										<label>Date Range</label>
										<date-picker v-model="date_time" value-type="YYYY-MM-DD HH:mm:ss" type="datetime" range style="width: 100%" placeholder="Select date range"  confirm></date-picker>
									</div>
								</div>
								</div>
							<div class="modal-footer">

								<button type="submit" class="btn btn-primary" :disabled="isDisabled">
									Go
									<span v-show="isLoading">
										<img src="/images/spinner.svg" height="20px" width="80px"/>
									</span>
								</button>
								<button type="button" class="btn btn-default" @click="close">Close</button>
								<a  v-show="exportUrlReady" :href="exportUrl"  class="btn btn-primary" download>Download</a>

							</div>

						</form>

				</modal>
</template>

<script>
	import DatePicker from "vue2-datepicker";
    export default {
        name: "ExportModal",
							components:{DatePicker},
								data(){
        	return{
										date_time: null,
										showPhoneNumber: false,
										isLoading: false,
										showSenderId: false,
										type:'All',
										exportUrl:'',
										phone_number:'',
										sender_id:'',
										no_of_records: 100,
										hasRecordsError: false,
										exportUrlReady: false,
										error_message: []
									}
								},
					watch:{
						no_of_records(value){
							this.validateRecordInput(value);
						}
					},
					computed:{
						isDisabled:function () {
							return(this.no_of_records === '' || this.date_time == null || this.hasRecordsError);
						}

					},
					methods: {
        	close(){
        		this.$modal.hide('export-modal');
										this.no_of_records = '';
										this.date_time = null;
										this.hasRecordsError = false;
										this.exportUrlReady = false;
									},
						onChange(event){

							switch (event.target.value) {
        			case('All'):{
												this.showPhoneNumber = false;
												this.showSenderId = false;
												this.type = 'All';
												break;
											}
									 case('To'): {
												this.showPhoneNumber = true;
												this.showSenderId = false;
												this.type = 'To';
												break;
									}
									case('From'):{
										this.showPhoneNumber = false;
										this.showSenderId = true;
										this.type = 'From';
										break;
									}
							}

						},
						validateRecordInput(value){
							if (value > 5000){
								this.hasRecordsError = true;
								this.error_message['records'] = 'You can only download a maximum of 5,000 records per selection';
							}else if (value < 100) {
								this.hasRecordsError = true;
								this.error_message['records'] = 'The number of records must be at least 100.';
							}else if (isNaN(value)){
								this.hasRecordsError = true;
								this.error_message['records'] = 'Value must be a digit';
							}else{
								this.hasRecordsError = false;
								this.error_message['records'] = ''
							}
						},
						async getExportUrl(){
							try {
								this.exportUrlReady = false;

								this.isLoading = true;

								let data = await this.$axios.$post('sms/export', {
									type : this.type,
									date_from: this.date_time[0],
									date_to: this.date_time[1],
									number_of_records: this.no_of_records,
									sender_id: this.sender_id,
									phone_number: this.phone_number
								});

								this.isLoading = false;

								this.exportUrlReady = true;

								this.exportUrl = encodeURI(data.data.file_url);
							}
								catch (e){
									this.isLoading = false;
								}
						},
					}
    }
</script>

<style scoped >
@import "../../assets/css/modal/modal.css";
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
	.modal-header {
		padding: 20px;
		border-bottom: 1px solid transparent;
	}
	.modal-header {
		position: relative;
		padding-bottom: 0;
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
	.modal-title {
		margin: 0;
		line-height: 1.5384616;
	}
	button.close {
		padding: 0;
		cursor: pointer;
		background: transparent;
		border: 0;
		-webkit-appearance: none;
	}
	.form-control:focus {
		border-color: #4DB6AC;
		outline: none;
	}
	.close {
		font-size: 17px;
		text-shadow: none;
		opacity: 0.6;
		filter: alpha(opacity=60);
		line-height: 1;
	}
	.close:hover, .close:focus {
		outline: 0;
		opacity: 1;
		color: black;
		filter: alpha(opacity=100);
	}
	.modal-body {
		padding: 20px 20px 60px 20px;
		position: relative;
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
	label {
		max-width: 100%;
	}
	.flex-container {
		display: flex;
		flex-direction: column;
		background: #FFFFFF ;
	}
	.row-form{
		margin-bottom: 20px;

		position: relative;
		padding: 0 1rem 0 0;
		flex-basis: 50%;
		max-width: 50%;
	}
	.form-control{
		font-size: 13px;
		border-radius: 5px;
		border: 1px solid rgba(204, 204, 204, 0.34);
		font-weight: 500;
		box-shadow: none;
		display: block;
		width: 100%;
		height: 36px;
		padding: 7px 12px;
		line-height: 1.5384616;
		color: #333333;
		background-color: #fff;
		background-image: none;
		transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	}
	.form-control:hover {
		border-color: #aaa;
	}
	.form-control:focus {
		border-color: #4DB6AC;
	}
	input {
		font: inherit;
	}
	strong {
		font-weight: 600;
	}
	.modal-footer {
		padding-top: 0;
		padding: 20px;
		text-align: right;
		border-top: 1px solid transparent;
	}
	.btn-default {
		color: #333;
		background-color: #fcfcfc;
		border-color: #ddd;
	}
	.modal-footer .btn + .btn {
		margin-left: 5px;
		/* margin-bottom: 0; */
	}
	.btn-primary:hover {
		color: #fff;
		/* background-color: #0c7cd5; */
		border: 1px solid transparent !important;
	}
</style>
