<template>
  <div id="page-wrap">

    <table width="100%">
      <tr>
        <td style="border: 0;  text-align: left" width="62%">
          <span style="font-size: 18px; color: #2f4f4f"><strong>Invoice # {{invoice_no}}</strong></span>
        </td>
        <td style="border: 0;  text-align: right" width="62%">
          <div id="logo">
            <img src="http://sandbox.termii.com/assets/images/logo.png" data-src-retina="http://sandbox.termii.com/assets/images/logo.png" width="120px"
                 height="auto"><br>
            150, Ikorodu Road, <br>Adebowale House, Onipanu.<br>Lagos, Nigeria
          </div>
        </td>
      </tr>

    </table>

    <div style="clear:both"></div>

    <div id="customer">

      <table id="meta">
        <tr>
          <td rowspan="5" style="border: 1px solid white; border-right: 1px solid black; text-align: left" width="62%">
            <br>
            Lagos, Nigeria
            <br>
            tech@termii.com
          </td>
          <td class="meta-head">Invoice #</td>
          <td>{{invoice_no}}</td>
        </tr>
        <tr>

          <td class="meta-head">Status</td>
          <td>{{invoice_status}}</td>
        </tr>
        <tr>

          <td class="meta-head">Invoice Date</td>
          <td>{{invoice_date}}</td>
        </tr>
        <tr>

          <td class="meta-head">Due Date</td>
          <td>{{invoice_due_date}}</td>
        </tr>

        <tr>

          <td class="meta-head">Amount Due</td>
          <td>
            <div class="due">₦10000</div>
          </td>
        </tr>

      </table>

    </div>

    <table id="items">

      <tr>
        <th width="65%">Item</th>
        <th align="right">Price</th>
        <th align="right">Quantity</th>
        <th align="right">Total</th>

      </tr>


      <tr class="item-row">
        <td class="description">Premium Email (125,000 Units)</td>
        <td align="right">₦10000</td>
        <td align="right">1</td>
        <td align="right">₦10000</td>
      </tr>



      <tr>
        <td class="blank"></td>
        <td colspan="2" class="total-line balance">Grand Total</td>
        <td class="total-value balance">
          <div class="due">₦10000</div>
        </td>
      </tr>

    </table>



  </div>

</template>

<script>
    export default {
        name: "_id",
					middleware: 'auth',
      data(){
          return{
            id: this.$route.params.id,
            invoice_status:'',
            invoice_due_date:'',
            invoice_paid_date:'',
            invoice_no:'',
            invoice_date:'',
            item:'',
            price:'',
            quantity:'',
            subtotal:'',
            discount:'',
            tax:'',
            total:'',
          }
      },
      methods: {
        async getBillingInvoiceById(){
          let response_data = await this.$axios.$get('/billing/invoices/' + this.id);
          let data = response_data.data[0];
          // let inv_item = response_data.inv-item[0];


          this.invoice_no = data.id;
          this.invoice_due_date = data.duedate;
          this.invoice_paid_date = data.datepaid;
          this.invoice_status = data.status;
          this.invoice_date = data.created;
          // this.item = inv_item.item;
          // this.price = inv_item.price;
          // this.quantity = inv_item.qty;
          // this.tax = inv_item.tax;
          // this.discount = inv_item.discount;
          // this.total = inv_item.total;
        },
      },
      mounted() {
          this.getBillingInvoiceById();
      }
    }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  body {
    font: 14px/1.4 Helvetica, Arial, sans-serif;
  }

  #page-wrap {
    width: 800px;
    margin: 0 auto;
  }

  textarea {
    border: 0;
    font: 14px Helvetica, Arial, sans-serif;
    overflow: hidden;
    resize: none;
  }

  table {
    border-collapse: collapse;
  }

  table td, table th {
    border: 1px solid black;
    padding: 5px;
  }

  #header {
    height: 15px;
    width: 100%;
    margin: 20px 0;
    background: #222;
    text-align: center;
    color: white;
    font: bold 15px Helvetica, Sans-Serif;
    text-transform: uppercase;
    letter-spacing: 20px;
    padding: 8px 0px;
  }

  #address {
    width: 250px;
    height: 150px;
    float: left;
  }

  #customer {
    overflow: hidden;
  }

  #logo {
    text-align: right;
    float: right;
    position: relative;
    margin-top: 25px;
    border: 1px solid #fff;
    max-width: 540px;
    overflow: hidden;
  }

  #customer-title {
    font-size: 20px;
    font-weight: bold;
    float: left;
  }

  #meta {
    margin-top: 1px;
    width: 100%;
    float: right;
  }

  #meta td {
    text-align: right;
  }

  #meta td.meta-head {
    text-align: left;
    background: #eee;
  }

  #meta td textarea {
    width: 100%;
    height: 20px;
    text-align: right;
  }

  #items {
    clear: both;
    width: 100%;
    margin: 30px 0 0 0;
    border: 1px solid black;
  }

  #items th {
    background: #eee;
  }

  #items textarea {
    width: 80px;
    height: 50px;
  }

  #items tr.item-row td {
    vertical-align: top;
  }

  #items td.description {
    width: 300px;
  }

  #items td.item-name {
    width: 175px;
  }

  #items td.description textarea, #items td.item-name textarea {
    width: 100%;
  }

  #items td.total-line {
    border-right: 0;
    text-align: right;
  }

  #items td.total-value {
    border-left: 0;
    padding: 10px;
  }

  #items td.total-value textarea {
    height: 20px;
    background: none;
  }

  #items td.balance {
    background: #eee;
  }

  #items td.blank {
    border: 0;
  }

  #terms {
    text-align: center;
    margin: 20px 0 0 0;
  }

  #terms h5 {
    text-transform: uppercase;
    font: 13px Helvetica, Sans-Serif;
    letter-spacing: 10px;
    border-bottom: 1px solid black;
    padding: 0 0 8px 0;
    margin: 0 0 8px 0;
  }

  #terms textarea {
    width: 100%;
    text-align: center;
  }

  .delete-wpr {
    position: relative;
  }

  .delete {
    display: block;
    color: #000;
    text-decoration: none;
    position: absolute;
    background: #EEEEEE;
    font-weight: bold;
    padding: 0px 3px;
    border: 1px solid;
    top: -6px;
    left: -22px;
    font-family: Verdana;
    font-size: 12px;
  }
  .text-center{
    text-align: center;
  }
  .text-success{
    color:#30ddbc ;
  }
</style>
