<template>
  <!-- Modal -->
  <modal name="pay-invoice-modal" height="auto" role="dialog" >
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Pay Invoice</h4>
      </div>
      <div class="modal-body">

        <form class="form-some-up" role="form" @submit.prevent="pay" method="post">

          <div class="form-group">
            <label>Select Payment Method</label>
            <select  @change="onChange($event)" class="selectpicker form-control" name="gateway">
              <option v-for="item in payment_method.data" :value="item.settings">{{item.name}}</option>
            </select>
          </div>

          <div class="text-right">
            <input type="hidden" value="35" name="cmd">
            <button type="button" @click="close" class="btn btn-warning btn-sm" >Close</button>
            <button type="submit" class="btn btn-success btn-sm">Pay</button>
          </div>
        </form>

      </div>
    </div>
  </modal>
</template>

<script>
    export default {
        name: "PayInvoiceComponent",
      props:{
        invoice_id:{
          required: true
        }
      },
      data(){
          return{
            payment_method:'',
            payment_gateway:''
          }
      },
      methods:{
          async getPaymentMethod(){
            let response_data = await this.$axios.$get('billing/payment-method');
            this.payment_method = response_data;
            this.payment_gateway = response_data.data[0].settings;
          },
        async pay(){
            try {
              let response_data = await  this.$axios.$post('billing/invoices/'+ this.invoice_id + '/pay', {
                gateway: this.payment_gateway,
                invoice_id: this.invoice_id,
              });
              window.location.href = response_data.data.url;
            }catch (e) {

            }

        },
        close(){
          this.$modal.hide('pay-invoice-modal');
        },
        onChange(event){
          this.payment_gateway = event.target.value;
        },
      },
      mounted() {
          this.getPaymentMethod();
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
    width: 80%;
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
