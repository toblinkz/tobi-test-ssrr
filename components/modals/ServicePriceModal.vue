<template>
  <transition>
  <div id="serviceprice" class="modal in body" role="dialog">
    <div class="modal-dialog" style="margin: 30px auto; ">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" @click="close">×</button>
        </div>
        <div class="modal-body">

          <div class="row">
            <div class="col-md-7">
              <!-- START PANEL -->
              <div class="panel-transparent">
                <p id="welcome" style="margin-top: 10px;margin-bottom: 0px"><i class="entypo-basket"></i> Our Service Prices!</p>
                <p class="insight">View our full list of service prices in countries across Africa and internationally
                </p>
              </div>
            </div>
            <div class="col-md-5">
              <!-- START PANEL -->
              <div class="full-height">
                <div class="text-center">
                  <img src="/images/payment.gif" class="wide" style="padding: 0 0 0px 20px;">
                </div>
              </div>
              <!-- END PANEL -->
            </div>
          </div>

          <div class="row">
            <!-- Ghana -->
            <div class="col-md-6">
              <div class="panel-body p-none">
                <table class="table table-hover toke">
                  <tbody>
                  <tr>
                    <td><p><strong>NIGERIA</strong></p></td>
                    <td><p>SMS</p></td>
                    <td><p>₦1.95</p></td>
                  </tr>
                  </tbody>
                  <tbody>
                  <tr>
                    <td><p><strong>GHANA</strong></p></td>
                    <td><p>SMS</p></td>
                    <td><p>GH¢0.04</p></td>
                  </tr>
                  </tbody>
                  <tbody>
                  <tr>
                    <td><p><strong>KENYA</strong></p></td>
                    <td><p>SMS</p></td>
                    <td><p>2.78 Kes</p></td>
                  </tr>
                  </tbody>
                  <tbody>
                  <tr>
                    <td><p><strong>ZAMBIA</strong></p></td>
                    <td><p>SMS</p></td>
                    <td><p>0.37 ZK</p></td>
                  </tr>
                  </tbody>
                  <tbody>
                  <tr>
                    <td><p><strong>GLOBAL</strong></p></td>
                    <td><p>SMS</p></td>
                    <td><p>$0.03</p></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="col-md-4">
              <div class="panel-body p-none">
                <table class="table table-hover toke">
                  <tbody>
                  <tr>
                    <td><p>Token</p></td>
                    <td><p>₦0.5</p></td>
                  </tr>
                  </tbody>
                  <tbody>
                  <tr>
                    <td><p>Token</p></td>
                    <td><p>GH¢0.00734</p></td>
                  </tr>
                  </tbody>
                  <tbody>
                  <tr>
                    <td><p>Token</p></td>
                    <td><p>0.1366 Kes</p></td>
                  </tr>
                  </tbody>
                  <tbody>
                  <tr>
                    <td><p>Token</p></td>
                    <td><p>0.023 ZK</p></td>
                  </tr>
                  </tbody>
                  <tbody>
                  <tr>
                    <td><p>Token</p></td>
                    <td><p>$0.0013</p></td>
                  </tr>
                  </tbody>
                </table>

              </div>

            </div>

            <!-- End Ghana -->
          </div>
          <p class="panel-body"><b>NB</b>: All messages sent to DND numbers in Nigeria and our Number API <br/> are charged at ₦3.9 per message. Also, Priority promotional routes are charge at ₦2.92 in Nigeria</p>
        </div>
      </div>

    </div>
  </div>
  </transition>
  <!-- End Modal 2-->
</template>

<script>
    export default {
        name: "ServicePriceModal",
      methods: {
          close() {
            this.$emit('close');
          },
        mounted () {
          document.addEventListener('click', this.close)
        },
        beforeDestroy () {
          document.removeEventListener('click',this.close)
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
    padding: 12px 20px;
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
