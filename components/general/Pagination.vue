<template>
  <paginate
    v-model="page"
    :click-handler="onPageChange"
    :page-count="total_page"
    :container-class="'pagination'"
    :page-class="'page-item'"
    :page-link-class="'page-link-class'"
    :prev-link-class="'prev-link-class'"
    :next-link-class="'next-link-class'"
    :active-class="'active-class'"
    :disabled-class="'disabled-class'"
    :prev-text="'<<'"
    :next-text="'>>'">
  </paginate>
</template>

<script>
  import Paginate from "vuejs-paginate"
    export default {
        name: "Pagination",
      components: {Paginate},
      props: {
            onPageChange:{
              required:true
            },
        total_page:{
              required: true
          },
        page:{
              required:true
        }


      }

    }
</script>

<style >
  .pagination {
    display: flex;
    list-style: none;
    border-radius: .25rem;

  }
  .page-item {
    color: black;
    padding-left: 5px;
    padding-right: 5px;

  }

  .prev-link-class{
    font-weight: bold;
  }
  .prev-link-class:focus{
    outline: none;
  }
  .next-link-class:focus{
    outline: none;
  }
  .next-link-class{
    font-weight: bold;

  }
    .disabled-class{
      opacity: .5;
      pointer-events: none;
    }
  .pagination-item {
    display: inline-block;

  }
  .page-link-class {
    color: black;
  }
  .page-link-class:focus {
    color: #ffffff;
    outline: none;
  }

  .active-class {
    background-color: #2D74AC;
    color: #ffffff;
    border-radius: 10px;
  }

</style>
