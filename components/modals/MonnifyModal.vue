<template>
    <transition>
      <!-- Modal -->
      <modal name="monnify-modal" height="auto" role="dialog" >
        <div  role="document">
          <div>
            <div class="modal-header" >
              <button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">Monnify</h4>
            </div>

              <div class="modal-body">
                <div class="form-group" style="text-align: center">
                  <h2>{{amount}}</h2>
                  <strong>NB:</strong> Transfer this <strong>exact amount</strong> into this account number via your <strong>internet/Mobile Banking platform</strong>
                </div>
                <div class="alert toke" style="width: 100%">
                  <div style="float: right; cursor: pointer">
                    <img src="/images/copy.svg" v-clipboard:copy="account_number">
                  </div>
                  <div>
                    <p class="text-semibold"><i class="entypo-light-up" style="color: #bbb !important;"  ></i> Account: <strong>{{account_number}}</strong></p>
                    <p class="text-semibold"><i class="entypo-home" style="color: #bbb !important;"></i> Bank: {{bank_name}}</p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn id-btn-primary"  @click="close"> Done </button>
              </div>


          </div>
        </div>
      </modal>
    </transition>
</template>

<script>
  import VueClipboard from "vue-clipboard2";
    export default {
        name: "MonnifyModal",
      props:{
          amount:{
            required: true
          },
        bank_name:{
            required: true
        },
        account_number: {
            required: true
        }
      }
     ,
      methods: {
        close() {
          this.$modal.hide('monnify-modal');
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
    padding: 20px 20px  20px;
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
