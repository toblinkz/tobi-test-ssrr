<template>

    <!-- Modal -->
    <modal name="sender-id-modal" height="auto">
      <div  tabindex="-1" role="dialog" style="display: block; padding-left: 9px;">
        <div  role="document" >
          <div>
            <div class="modal-header" >
              <button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" >Request New ID</h4>
            </div>
            <form method="post" @submit.prevent="requestSenderId">

              <div class="modal-body">
                <div class="form-group">
                  <label>Sender ID For Sms</label>
                  <input type="text" class="form-control" required v-model="sender_id" placeholder="eg. Termii (Ensure your ID is not more than 11 characters)" name="sender_id"  :class="{'error' : hasSenderIdError}">
                  <span class=" error_field_message" v-if="error_message.sender_id">{{error_message.sender_id}}</span>
                  <br>
                  <label>Company</label>
                  <input type="text" class="form-control" v-model="company" required placeholder="eg. Termii" name="company" :class="{'error' : hasCompanyError}">
																	<span class=" error_field_message" v-if="error_message.company">{{error_message.company}}</span>
                  <br>
                  <label>Use Case</label>
                  <textarea type="text" class="form-control" v-model="usecase" required="" placeholder="eg. Hello dear is a sample of the message you will be sending with Termii" name="usecase" :class="{'error' : hasUseCaseError}"></textarea>
																 	<span class=" error_field_message" v-if="error_message.usecase">{{error_message.usecase}}</span>
                  <br><br>
                  <strong>NB:</strong> Sender ID registration are approved only on weekdays and takes 24 hours to activate across all telcos in your country. If you need to try out the sms feature during weekends without an approved ID, please <a class="blue-t text-bold" id="CHATID">click here to Contact Sales</a>
                </div>
              </div>
              <div class="modal-footer">
                <a type="button" class="btn btn-danger" @click="close"> Close </a>
                <button type="submit" class="btn id-btn-primary"   :disabled="isDisabled">
																	{{save_button_text}}
																	<span v-show="isLoading" >
															<img src="/images/black_spinner.svg" height="20px" width="30px"/>
													</span>
																</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </modal>

</template>

<script>
  import ButtonSpinner from "../general/ButtonSpinner";
  import {mapGetters} from "vuex";
  export default {
    name: "SenderIdModal",
			 middleware:'auth',
    components: {ButtonSpinner},
    data(){
      return{
        sender_id:"",
        company:"",
        usecase:"",
        error_message:[],
        error: "",
							 isLoading: false,
							 save_button_text: 'Save',
        hasSenderIdError: false,
							 hasCompanyError: false,
							 hasUseCaseError: false
      }
    },
    computed:{
      isDisabled:function () {
            return (this.hasSenderIdError || this.sender_id === '' || this.company === '' || this.usecase === '');
      },

    },
    watch: {
      sender_id(value){
        this.sender_id = value;
        this.validateSenderId(value);
      },
      company(value){
      	this.company = value;
      	this.clearCompanyError();
						},
					usecase(value){
      	this.usecase = value;
      	this.clearUseCaseError();
					}
    },
    methods: {
      close() {
        this.resetForm();
        this.$modal.hide('sender-id-modal');
      },
      async requestSenderId(){
      	 this.isLoading = true;
      	 this.save_button_text = '';
        try {
         await this.$axios.post('sms/sender-id', {
            sender_id: this.sender_id,
            country: JSON.parse(localStorage.getItem('user_data')).country,
            usecase: this.usecase,
            company: this.company
          }, );
          this.$emit('requested');
          this.resetForm();
          this.$modal.hide('sender-id-modal');
          this.$toast.success("Request sent successfully");
									this.isLoading = false;
									this.save_button_text = 'Save';
        } catch (e) {
									this.isLoading = false;
									this.save_button_text = 'Save';
									let errors = e.response.data.errors;
									for (let key in errors) {
										switch (key){
											case('name'):{
												errors[key].forEach(err => {
													this.error_message['sender_id'] = err;
													this.hasSenderIdError = true;

												});
												break;
											}
											case ('company'):{
												errors[key].forEach(err => {
													this.error_message['company'] = err;
													this.hasCompanyError = true;

												});
												break;
											}
											case ('usecase'):{
												errors[key].forEach(err => {
													this.error_message['usecase'] = err;
													this.hasUseCaseError = true;

												});
												break;
											}
										}

									}
								}
      },
      resetForm(){
        this.sender_id = "";
        this.company = "";
        this.usecase = "";
        this.error_message['sender_id'] = '';
        this.hasSenderIdError = false;
      },
      validateSenderId(value) {
        if (value.length < 3){
          this.error_message['sender_id'] = 'The sender id must be at least 3 characters.';
          this.hasSenderIdError = true;
        }else if (value.length > 11) {
									this.error_message['sender_id'] = 'The sender id may not be greater than 11 characters.';
									this.hasSenderIdError = true;
								}
        	else {
									this.error_message['sender_id'] = '';
									this.hasSenderIdError = false;

        }
      },
					clearCompanyError(){
      	if (this.hasCompanyError){
      		this.error_message['company'] = '';
      		this.hasCompanyError = false;
							}
					},
					clearUseCaseError(){
      	if (this.hasUseCaseError){
      		this.error_message['usecase'] = '';
      		this.hasUseCaseError = true;
							}
					}
    },
  }
</script>

<style scoped>


  textarea.form-control {
    height: auto;
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
  .error_field_message {
    font-size: 1.2rem;
    color: red;
    display: block;
    margin-top: 5px;
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
    outline: none;
  }
  .btn-danger {
    color: #fff;
    background-color: #F44336;
    border-color: #F44336;
  }
  input[type=text].error {
    border-color: red!important;
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
