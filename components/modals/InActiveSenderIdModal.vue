<template>
			<modal name="in-active-user-modal" height="auto">
							<div>
								<div class="modal-header" >
									<button type="button" class="close"  @click="close"  ><span aria-hidden="true">&times;</span></button>
									<h4 class="modal-title" id="myModalLabel">Request New ID</h4>
								</div>
								<div class="modal-body">
									<p>To activate account kindly Contact your  <a id="CHATID"> Account Manager</a></p>
								</div>
							</div>
			</modal>
</template>

<script>
export default {
		name: "InActiveSenderIdModal",
		methods: {
			close(){
				this.$modal.hide('in-active-user-modal');
			}
		}
}
</script>

<style scoped>
.modal-body {
	padding: 20px 20px 60px 20px;
	position: relative;
	display: flex;
	place-content: center;
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
.modal-header .close {
	position: absolute;
	right: 20px;
	top: 50%;
	/* margin-top: 0; */
}
</style>
