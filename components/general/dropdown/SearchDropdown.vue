<template>

    <div id="SearchDropdown" class="dropdown" v-click-outside="hide" :style="{...dropdownStyle}">
      <div  @click="open  = !open" class="dropdown-selected" :style="{...dropdownSelectedStyle}">
        {{selectedItem}}
      </div>
      <div id="dropdownlist" v-show="open || inputValue" class="dropdown-select">
        <span class="dropdown-select-search">
          <input class="search-field" type="search"  v-model.trim="inputValue" >
        </span>
        <div  class="search-results" >
          <div  v-for="item in options" :key="item" v-show="itemVisible(item)" class="dropdown-item " @click="selectItem(item); open = false">
            {{item}}
          </div>
          <div v-show="noResult">
            <p>no result </p>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
  import ClickOutside from "vue-click-outside"

  export default {
        name: "SearchDropdown",
      data(){
          return{
            inputValue: "",
            selectedItem: this.options.length > 0 ? this.options[0] : null,
            noResult:false,
            open: false
          }
      },
      props:{
          options: {
            type: Array,
            required: true
          },
        dropdownSelectedStyle: {
            type: Object
        },
        dropdownStyle:{
            type: Object
        }
      },
      methods:{
          itemVisible(item){
                let currentName = item.toLowerCase();
                let currentInput = this.inputValue.toLowerCase();
            return currentName.includes(currentInput);
          },
        selectItem(item){
            this.selectedItem = item;
            this.inputValue = '';
            this.$emit('item-selected', item)
        },
        hide(){
            this.open = false;
        }
      },
      mounted() {
          $("#SearchDropdown").click(function () {
            let scrollTop = $(window).scrollTop();

            let topOffset = $("#SearchDropdown").offset().top;

            let relativeOffset = topOffset - scrollTop;

            let windowHeight = $(window).height();

            if (relativeOffset > windowHeight / 2){

              $("#dropdownlist").addClass("items-reverse");
            } else {

              $("#dropdownlist").removeClass("items-reverse");
            }
          });
      },
      directives: {
          ClickOutside
      }
    }
</script>

<style scoped>

  .dropdown-select-search:after {
    content: '\e98e';
    font-family: 'icomoon';
    position: absolute;
    top: 50%;
    left: 24px;
    color: inherit;
    display: block;
    font-size: 12px;
    margin-top: -6px;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    opacity: 0.6;
    filter: alpha(opacity=60);
  }


  .search-results {
    padding-bottom: 5px;
    max-height: 150px;
    overflow-y: auto;
    display: block;
  }
  .dropdown-select {
    background-color: #fff;
    color: #333333;
    border: 1px solid #d0d0d0;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,0.25);
    border-radius: 3px;
    display: block;
    position: absolute;
    width: 100%;
    z-index: 9999;
  }
  .dropdown-select-search {
    display: block;
    position: relative;
    padding: 12px;
  }
  .search-field {
    height: 36px;
    padding: 7px 12px;
    padding-left: 36px;
    border-radius: 3px;
    border: solid 2px #bbb;
    outline: 0;
    width: 100%;
  }
  .dropdown{
    position: relative;
    width: 100%;
    height: 40px;
    max-width: 100%;
    margin: 0 auto;
  }
  .dropdown-input, .dropdown-selected{
    width: 100%;
    padding: 10px 16px;
    border: 1px solid transparent;
    background-color: #ddd;
    line-height: 1.5em;
    outline: none;

  }
  .search-input{
    width: 100%;
    padding: 10px 16px;
    line-height: 1.5em;
    outline: none;
    border-radius: 8px;
  }

  .dropdown-input:focus, .dropdown-selected:hover{
    border: 1px solid rgba(98, 98, 98, 0.27);

  }
  .dropdown-input::placeholder{
    opacity: 0.7;
  }

  .dropdown-selected{
    margin-top: -3px;
    border-radius: 6px;
    color: #000000;
    padding-left: 8px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
  }
  .dropdown-selected:after {
    position: absolute;
    content: "";
    top: 50%;
    right: 10px;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-color: #000000 transparent transparent transparent;
  }

  .dropdown-item{
    display: flex;
    width: 100%;
    padding: 11px 16px;
    cursor: pointer;
  }
  .dropdown-item:hover{
    background-color: #c8e9e6;
  }
  .dropdown-item:focus{
    background-color: #f5f5f5;
  }

  .dropdown-item-flag{
    max-width: 24px;
    max-height: 18px;
    margin: auto 12px auto 0px;
  }
  .items-reverse{
    position: absolute;
    top: auto;
    bottom: 100%;
    left: 0;
    background-color: #fff;
    color: #333333;
    border: 1px solid #d0d0d0;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,0.25);
    border-radius: 3px;
    display: block;
    width: 100%;
    z-index: 9999;
  }

</style>
