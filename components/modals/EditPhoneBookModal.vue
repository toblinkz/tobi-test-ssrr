<template>

  <!-- Modal -->
  <modal name="edit-phonebook-modal" height="auto"  :resizable="true" >
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" @click="close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Edit List</h4>
      </div>
      <form class="form-some-up form-block" role="form" @submit.prevent="updatePhoneBook" method="post">

        <div class="modal-body">

          <div class="form-group">
            <label>List name</label>
            <input type="text" class="form-control" required="" name="list_name" v-model="phone_book_name">
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="close">Close</button>
          <button type="submit" class="btn btn-primary">Update</button>
        </div>

      </form>
    </div>
  </modal>
</template>

<script>
    export default {
        name: "EditPhoneBookModal",
							middleware:'auth',
      props:{
        phone_book_name:{
          required: true
        },
        phone_book_id:{
          required: true
        }
      },
      methods: {
          close(){
            this.$modal.hide('edit-phonebook-modal');
          },
          async updatePhoneBook(){
            try{
              await this.$axios.$patch('sms/phone-book/' + this.phone_book_id, {
                phonebook_name: this.phone_book_name
              });
              this.$emit('updated');
              this.$modal.hide('edit-phonebook-modal');
              this.$toast.success("Phone-book updated successfully");
            }catch (e) {

            }

          },


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
