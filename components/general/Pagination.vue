<template>
<div style="text-align: center">
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
		:prev-text="'Prev'"
		:next-text="'Next'">
	</paginate>
</div>



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
		list-style: none;
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin: 20px 0;
		border-radius: 4px;
	}
  .page-item {
			display: inline;

  }

  .prev-link-class{
			position: relative;
			float: left;
			padding: 6px 12px;
			margin-left: -1px;
			line-height: 1.42857143;
			color: #337ab7;
			text-decoration: none;
			background-color: #fff;
			border: 1px solid #ddd;
			margin-left: 0;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
  }

  .next-link-class{
			position: relative;
			float: left;
			padding: 6px 12px;
			margin-left: -1px;
			line-height: 1.42857143;
			color: #337ab7;
			text-decoration: none;
			background-color: #fff;
			border: 1px solid #ddd;
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;

  }


  .page-link-class {
			position: relative;
			float: left;
			padding: 6px 15px;
			color: #337ab7;
			margin-left: -1px;
			line-height: 1.42857143;
			text-decoration: none;
			border: 1px solid #ddd;
  }
	.page-link-class.active {
		color: #fff !important;
	}


	.disabled-class {
		opacity: .5;
		pointer-events: none;
		cursor: not-allowed;
	}

  .active-class .page-link-class {
			z-index: 2;
			color: #fff !important;
			cursor: default;
			background-color: #337ab7;
			border-color: #337ab7;
  }
	a:active {
		color: #fff!important;
		text-decoration: none;
	}

</style>
