<template>
	<modal name="resend-team-invite-modal" height="auto" width="440px">
<!--				<div>-->
<!--					<div class="modal-header" >-->
<!--						<img src="/icons/svg_icons/close-icon-round.svg" alt="" class="close" @click="closeModal">-->
<!--						<h4 class="modal-title" style="font-weight: bold">Resend team invite</h4>-->
<!--						<p class="mt-10">The invite would be sent to the email below again.</p>-->
<!--					</div>-->

<!--					<div class="modal-body">-->
<!--						<div class="form-group">-->
<!--							<div style="display: flex;">-->
<!--								<div style="width: 40%">-->
<!--									<label>First Name</label>-->
<!--									<input type="text" class="form-control"  placeholder="first_name">-->
<!--								</div>-->
<!--								<div style="width: 5%"></div>-->
<!--								<div  style="width: 40%">-->
<!--									<label>Last Name</label>-->
<!--									<input type="text" class="form-control"  placeholder="last_name">-->
<!--								</div>-->

<!--							</div>-->

<!--							<br>-->
<!--&lt;!&ndash;							<label>Email address</label>&ndash;&gt;-->
<!--&lt;!&ndash;							<input type="text" class="form-control" placeholder="email">&ndash;&gt;-->
<!--						</div>-->
<!--					</div>-->

<!--					<div class="modal-footer">-->
<!--						<a @click="" class="btn id-btn-primary"   :aria-disabled="isDisabled">-->
<!--							{{resend_btn_text}}-->
<!--							<span v-show="isLoading" >-->
<!--									<img src="/images/black_spinner.svg" height="20px" width="30px"/>-->
<!--							</span>-->
<!--						</a>-->
<!--					</div>-->

<!--				</div>-->

		<div>
			div.modal-header
		</div>
	</modal>

</template>

<script>
import ButtonSpinner from "@/components/general/ButtonSpinner";
import Switches from "vue-switches";

export default {
	name: "ResendInvitationModal",
	middleware:'auth',
	components: {ButtonSpinner, Switches},
	// props: [first_name, last_name, email],
	data() {
		return {
			isLoading: false,
			show_icon: true,
			resend_btn_text: 'Resend Invite',
		}
	},
	methods: {
		closeModal() {
			this.$modal.hide('resend-team-invite-modal');
		},
	}
}
</script>

<style scoped>
@import "../../../assets/css/modal/modal.css";

.modal-header {
	padding: 20px;
}

.modal-header h4 {
	padding: 10px 0;
	border-bottom: 1px solid #E7E7E7;
}

.modal-title {
	margin: 0;
	line-height: 1.5384616;
}

.close {
	font-size: 17px;
	text-shadow: none;
	opacity: 0.6;
	filter: alpha(opacity=60);
	line-height: 1;
	cursor: pointer;
	position: absolute;
	right: 20px;
	top: 30px;
}
.close:hover,
.close:focus {
	outline: 0;
	opacity: 1;
	color: black;
	filter: alpha(opacity=100);
}

textarea.form-control {
	height: auto;
}


.modal-body {
	/*padding: 20px 20px 40px 20px;*/
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

input {
	font: inherit;
}
strong {
	font-weight: 600;
}


.modal-footer .btn + .btn {
	margin-left: 5px;
	/* margin-bottom: 0; */
}

</style>
