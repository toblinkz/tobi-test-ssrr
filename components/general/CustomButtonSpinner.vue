<template>
	<a>
		<button  @click="action"  class="btnl bg-blue m-t-10" :disabled="isDisabled">
			{{button_text}}
			<span v-show="isLoading">
        <img src="/images/spinner.svg" height="20px" width="30px"/>
      </span>
		</button>
	</a>
</template>

<script>
export default {
	name: "CustomButtonSpinner",
	props: {
		isDisabled: {
			type: Boolean,
			required: true
		},
		button_text: {
			type: String,
			required: true
		},
		isLoading: {
			type: Boolean
		},
		action: Function
	}
}
</script>

<style scoped>
.bg-blue {
	background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%);
	display: inline-block !important;
	color: #fff !important;
	border-radius: 4px;
	vertical-align: bottom !important;
	position: relative;
	border: transparent;
	box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
	transition: .35s;
	padding: 7px 15px 8px 15px !important;
	font-weight: 600 !important;
	font-size: 13px !important;
}

button:focus, button:active{
	outline: none;
}
button[disabled] {
	opacity: .5;
	pointer-events: none;
}

.btnl{
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	transition: color 0.1s linear 0s, background-color 0.1s linear 0s, opacity 0.2s linear 0s !important;
}

.btnl:hover {
	background-color: #fafafa;
	border: 1px solid rgba(98, 98, 98, 0.27);
}
</style>
