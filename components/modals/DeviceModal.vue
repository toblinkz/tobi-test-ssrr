<template>
<transition>
  <!-- Modal -->
  <modal name="device-id-modal" height="auto" role="dialog" >
    <div  role="document">
      <div>
        <div class="modal-header" >
          <button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Request New ID</h4>
        </div>
        <form @submit.prevent="requestDeviceId" method="post" >

          <div class="modal-body">
            <div class="form-group">
              <label>ID (For WhatsApp)</label>
              <input type="text" class="form-control" v-model="device_id" placeholder="eg. Termii (Ensure your ID is not more than 9 characters)"  :class="{'error' : hasDeviceIdError}">
              <span class=" error_field_message" v-if="error_message.device_id">{{error_message.device_id}}</span>
              <br><br>
              <strong>NB:</strong> Only logistics, financial, health and agric technology companies are allowed to use these IDs. If you need to test the WhatsApp API without an approved ID, please make use of your test API keys and  our default ID - <strong>"TID"</strong>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="close"> Close </button>
            <button type="submit" class="btn id-btn-primary" :disabled="isDisabled"> Save </button>
          </div>

        </form>
      </div>
    </div>
  </modal>
</transition>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "DeviceModal",
							middleware: 'auth',
      data(){
          return{
            device_id:"",
            error_message:[],
            hasDeviceIdError: false
          }
      },
      computed: {
        isDisabled: function (){
          return (this.device_id === '');
        },
        ...mapGetters(['loggedInUser',])
      },
      watch:{
          device_id(value){
            this.device_id = value;
            this.validateDeviceId(value)
          }
      },
      methods: {
        close() {
          this.resetForm();
          this.$modal.hide('device-id-modal');
        },
        async requestDeviceId(){
          try {
            await this.$axios.post('devices', {
              name: this.device_id
            }, )
            this.$emit('requested');
            this.resetForm();
            this.$modal.hide('device-id-modal');
            this.$toast.success("Request sent successfully");
          } catch (e) {
											let errors = e.response.data.errors;
											for (let key in errors) {
												errors[key].forEach(err => {
													this.error_message['device_id'] = err;
													this.hasDeviceIdError = true;
												});

											}

          }
        },
        resetForm(){
          this.device_id = "";
          this.error_message['device_id'] = '';
          this.hasDeviceIdError = false;
        },
        validateDeviceId(value){
          if (value.length < 3 ){
            this.error_message['device_id'] = 'The device id must be at least 3 characters.';
            this.hasDeviceIdError = true;
          } else if (value.length > 11) {
												this.error_message['device_id'] = 'The device id may not be greater than 11 characters.';
												this.hasSenderIdError = true;
										}else {
            this.error_message['device_id'] = '';
            this.hasDeviceIdError = false;
          }

        }
      }
    }
</script>

<style scoped>

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
  .error_field_message {
    font-size: 1.2rem;
    color: red;
    display: block;
    margin-top: 5px;
  }
  input[type=text].error {
    border-color: red!important;
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
