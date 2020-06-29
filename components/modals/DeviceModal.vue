<template>
<transition>
  <!-- Modal -->
  <div class="modal body fade" id="request-new-device" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header" >
          <button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Request New ID</h4>
        </div>
        <form class="form-some-up" role="form" method="post" action=http://sandbox.termii.com/device>

          <div class="modal-body">
            <div class="form-group">
              <label>ID (For WhatsApp)</label>
              <input type="text" class="form-control" required="" placeholder="eg. Termii (Ensure your ID is not more than 9 characters)" name="name">
              <br><br>
              <strong>NB:</strong> Only logistics, financial, health and agric technology companies are allowed to use these IDs. If you need to test the WhatsApp API without an approved ID, please make use of your test API keys and  our default ID - <strong>"TID"</strong>
            </div>
          </div>
          <div class="modal-footer">
            <input type="hidden" name="_token" value="DTPkUCHYfTRR9r4nMpdDrXUCVo3qGMfoOHr9u00f">
            <button type="button" class="btn btn-default" data-dismiss="modal"> Close </button>
            <button type="submit" class="btn btn-primary"> Save </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
    export default {
        name: "DeviceModal",
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
  .modal {
    /* display: none; */
    /* overflow: hidden; */
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
    /* width: auto; */
    /* margin: 10px; */
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
