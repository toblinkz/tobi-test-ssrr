<template>
  <transition>
    <div class="modal body" role="dialog" @click="close">
      <div class="modal-dialogs">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="close">×</button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <!-- START PANEL -->
                <div class="panel-transparent">
                  <p id="welcome" style="margin-top: 10px;margin-bottom: 0px"><i class="entypo-basket"></i> Your Wallet!</p>
                  <p class="insight">Add money into your wallet using card or bank transfers to unlock your account for sending out messages
                  </p>
                  <div class="row">
                    <div class="col-sm-8">
                      <br>
                      <nuxt-link to="/billing/fund" class="btn btn-primary"><i class="entypo-credit-card"></i> Top-up Wallet</nuxt-link>
                    </div>
                    <div class="col-sm-4 hidden-xs">
                      <br>
                      <nuxt-link to="/billing/transactions/history" class="btn btn-success"><i class="entypo-flow-tree"></i> History</nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-5">
                <!-- START PANEL -->
                <div class="full-height">
                  <div class="panel-body text-center">
                    <img src="/images/payment.gif" class="wide" style="padding: 0 0 0px 20px;">
                  </div>
                </div>
                <!-- END PANEL -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
        name: "YourWalletModal",
      methods: {
          close() {
            this.$emit('close');
          }
      }
    }
</script>

<style scoped>
  .modal-open .modal {
    overflow-x: hidden;
    overflow-y: auto;
  }
  .modal {
    /* display: none; */
    /* overflow: hidden; */
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
    .modal-dialogs {
      width: 600px;
      margin: 30px auto;
    }
  }
  .modal-dialogs {
    position: relative;
  }
  .modal-content {
    border: 0;
    border-radius: 0;
    margin-top: 100px;
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
  .panel-body {
    position: relative;
    padding: 20px;
  }
  @media (min-width: 769px){
    .page-container {
      width: 100%;
      display: table;
      table-layout: fixed;
    }
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
  .wide {
    width: 200px !important;
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
</style>
