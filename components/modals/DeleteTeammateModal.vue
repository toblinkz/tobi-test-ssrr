<template>
	<modal name="delete-teammate-modal" height="auto" width="500" >
		<div  style="display: block;
    padding-left: 9px;">
			<div>
				<div>
					<div class="modal-header" >
						<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div  class="success-card-position main-card" >
						<center>
							<div class="mt-20 mb-10">
								<img src="/images/info.svg" width="150px" height="150px" />
							</div>
						</center>
						<div style="text-align: center;">
							<p class="m-t-5"><b>{{teammate_email}}</b> will no longer be able to<br> access your dashboard.</p>
							<div class="mb-20" >
								<a  @click="close"  class="btn btn-danger mt-20 m-r-20">
									Cancel
								</a>
								<a  @click="deleteTeamMember"  class="btn btn-primary mt-20">
									{{ button_text }}
									<span v-show="isLoading">
														<img src="/images/spinner.svg" height="20px" width="30px"/>
												</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</modal>
</template>

<script>
export default {
	name: "DeleteTeammateModal",
	data(){
		 return{
		 	button_text: "Yes, Remove",
				isLoading: false
			}
	},
	props: {
   teammate_id:{
   	 required:true
			},
		 teammate_email:{
   	 required: true
			}
	},
	methods: {
		close() {
			this.$modal.hide('delete-teammate-modal');
		},
		async deleteTeamMember(){
			this.button_text = "";
			this.isLoading = true;
			  try {
						let data = await this.$axios.$delete(`team/${this.teammate_id}`);
						this.$toast.success(data.message);
						await this.$emit('get-teammates');
						await this.close()
						this.button_text = "Yes, Remove";
						this.isLoading = false;
					} catch (e) {
						this.$toast.error(e.response.data.message);
						this.button_text = "Yes, Remove";
						console.log(e.response)
						this.isLoading = false;

					}
		}
	}
}
</script>

<style scoped >
@import "../../assets/css/modal/modal.css";
textarea.form-control {
	height: auto;
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
.error_field_message {
	font-size: 1.2rem;
	color: red;
	display: block;
	margin-top: 5px;
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
	outline: none;
}
.btn-danger {
	color: #fff;
	background-color: #F44336;
	border-color: #F44336;
}
input[type=text].error {
	border-color: red!important;
}
input {
	font: inherit;
}
strong {
	font-weight: 600;
}
.modal-footer {
	padding: 20px;
	text-align: right;
	border-top: 1px solid transparent;
}
.rent-body {
	position: relative;
	/*padding: 20px;*/
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
.table {
	width: 100%;
	max-width: 100%;
	margin-bottom: 0;
}
.table > tbody > tr > td, .table > tfoot > tr > td {
	vertical-align: middle;
	padding: 12px 50px;
	line-height: 1.5384616;
	border-top: 2px solid #ddd;
}
.table >tbody:first-child >tr>td{
	border-top: 0;
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
