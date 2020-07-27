<template>
  <transition>
    <div class=" modal body" role="dialog" @click="close">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" @click="close">×</button>
              </div>

              <div class="modal-body">
                <div class="panel-body">
                  <div class="col-lg-6">
                    <table class="table">
                      <tbody>
                      <tr>
                        <td class="text-right"> MessageId: </td>
                        <td>2830989168283342637</td>
                      </tr>
                      <tr>
                        <td class="text-right">Created At:</td>
                        <td>2020-06-25 01:05:47</td>
                      </tr>
                      <tr>
                        <td class="text-right">From:</td>
                        <td>OTPAlert</td>
                      </tr>
                      <tr>
                        <td class="text-right">To:</td>
                        <td>2347051577499</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-lg-6">
                    <table class="table ">
                      <tbody>
                      <tr>
                        <td class="text-right"> Channel: </td>
                        <td>Number API</td>
                      </tr>
                      <tr>
                        <td class="text-right">Segments:</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td class="text-right">Status:</td>
                        <td>Message Sent</td>
                      </tr>
                      <tr>
                        <td class="text-right">message:</td>
                        <td>Welcome to Termii</td>
                      </tr>
                      </tbody>
                    </table>
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
        name: "SmsHistoryModal",
      methods: {
          close(){
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
    .modal-dialog {
      width: 75%;
      margin-left: 20%;
      margin-right: 5%;
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
    padding: 12px 20px;
    line-height: 1.5384616;

  }

</style>
