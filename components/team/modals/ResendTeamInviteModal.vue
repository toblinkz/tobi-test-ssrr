<template>
	<modal name="resend-team-invite-modal" height="auto" width="440px">
<!--				<div>-->
<!--					<div class="resend-modal-footer">-->
<!--						<a @click="" class="btn id-btn-primary"   :aria-disabled="isDisabled">-->
<!--							{{resend_btn_text}}-->
<!--							<span v-show="isLoading" >-->
<!--									<img src="/images/black_spinner.svg" height="20px" width="30px"/>-->
<!--							</span>-->
<!--						</a>-->
<!--					</div>-->
<!--				</div>-->

		<div class="resend-modal-container">
			<div class="resend-modal-header">
				<h4 class="resend-modal-title">Resend team invite</h4>
				<img src="/icons/svg_icons/close-icon-round.svg" alt="" class="close-icon" @click="closeModal">
			</div>

			<div class="resend-modal-body">
				<p style="margin-bottom: 20px">The invite would be sent to the email below again</p>
				<div class="form-group">
					<div style="display: flex;">
						<div style="width: 45%">
							<label>First Name</label>
							<div class="form-control">{{ firstName }}</div>
						</div>

						<div style="width: 5%"></div>

						<div  style="width: 50%">
							<label>Last Name</label>
							<div class="form-control">{{lastName}}</div>
						</div>
					</div>
					<br>
					<div>
						<label>Email address</label>
						<div class="form-control">{{email}}</div>
					</div>
				</div>
			</div>

			<div class="resend-note">
				<span style="font-weight: bold">Please note:</span>  All previous permissions assigned to this
				teammate are still active; to assign new permissions
				please remove the account then add again.
			</div>

			<div class="resend-modal-footer">
				<div class="btn bg-blue" @click="resendInvite">Resend invite</div>
			</div>
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
	props: {
		firstName:{ required: true},
		lastName:{ required: true },
		email: { required: true },
	},
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
		async resendInvite() {
			console.log(`sending invite to`, this.email)
		}
	}
}
</script>

<style scoped>
@import "../../../assets/css/modal/modal.css";

.resend-modal-header {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20px 30px;
	border-bottom: 1px solid #E7E7E7;
}

.resend-modal-header h4 {
	padding: 0;
	font-weight: bold;
}

.resend-modal-title {
	margin: 0;
	line-height: 1.5384616;
}

.close-icon {
	opacity: 0.6;
	filter: alpha(opacity=60);
	line-height: 1;
	cursor: pointer;
}
.close-icon:hover,
.close-icon:focus {
	outline: 0;
	opacity: 1;
	color: black;
	filter: alpha(opacity=100);
}

.resend-modal-body {
	padding: 20px 30px;
	position: relative;
}
.form-group {
	margin-bottom: 10px;
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
	color: #D9D9D9;
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
	color: #D9D9D9;
	background-color: #fff;
	background-image: none;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.form-control:hover {
	border-color: #D9D9D9;
}
.form-control:focus {
	border-color: #4DB6AC;
	outline: none;
}

.resend-note {
	margin: 0 auto;
	width: 374px;
	height: 100px;
	background: #FFF8E1;
	border-radius: 0 0 6px 6px;
	text-align: justify;
	font-size: 13px;
	line-height: 20px;
	color: #000000;
	padding: 20px 25px;
	margin-bottom: 30px;
}

.resend-modal-footer {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 40px 0;
}

.resend-modal-footer .btn {
	margin: 0 auto;
}

</style>
