<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button
        type="button"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
      >First</button>
    </li>
    <li class="pagination-item">
      <button
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
      >Previous</button>
    </li>
    <!--range of numbers-->
    <li
      v-for="page in pages"
      :key="page.name"
    >
      <button
        type="button"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{active: isPageActive(page.name)}"
      >
        {{ page.name }}
      </button>
    </li>
    <!---end-->
    <li class="pagination-item">
      <button
        type="button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
      >Next</button>
    </li>
    <li class="pagination-item">
      <button
        type="button"
        @click="onClickLastPage"
        :disabled="isInLastPage"
      >Last</button>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "Paginator",
      props: {
         maxVisibleButtons: {
           type: Number,
           required: false,
           default: 3
         },
        totalPages: {
           type: Number,
            required: true
        },
        total: {
           type: Number,
          required: true
        },
        currentPage: {
           type: Number,
          required: true
        }
      },
      computed: {

          //when on the first page
          startPage() {
            if(this.currentPage === 1){
              return 1;
            }
            //when on the last page
            if (this.currentPage === this.totalPages) {

              return this.totalPages - this.maxVisibleButtons;
            }
            return this.currentPage - 1;

          },
        pages(){
            const range = [];

            for (let i = this.startPage; i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages); i+=1){
                  range.push({
                    name: i,
                    isDisabled: i === this.currentPage
                  });
            }
            return range;
        },

        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        }

      },
      methods: {
          onClickFirstPage() {
            this.$emit('pageChanged', 1);
          },
        onClickPreviousPage(){
            this.$emit('pageChanged', this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit('pageChanged', page);
        },
        onClickNextPage(){
            this.$emit('pageChanged', this.currentPage + 1);
        },
        onClickLastPage(){
            this.$emit('pageChanged', this.totalPages);
        },
        isPageActive(page) {
            return this.currentPage === page;
        }
      }

    }
</script>

<style >
  .pagination {
    list-style-type: none;
  }

  .pagination-item {
    display: inline-block;
  }

  .active {
    background-color: #4AAE9B;
    color: #ffffff;
  }

</style>
