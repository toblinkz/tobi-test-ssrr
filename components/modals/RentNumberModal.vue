<template>
	<transition>
		<modal name="rent-number-modal"  role="dialog" height="auto">
			<div>

				<!-- Modal content-->
				<div>
					<div class="modal-header">
						<button type="button" class="close" @click="close">×</button>
						<h4 class="modal-title"><i class="entypo-basket"></i> <strong>Rent Number</strong></h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<div>
								<div class="panel-transparent">
									<p class="insight"><strong>Pricing</strong></p>
								</div>
							</div>

						</div>

						<div>
							<div >
								<div class="rent-body p-none">
									<table class="table table-hover toke">
										<tbody>
										<tr>
											<td><p><strong>Services</strong></p></td>
											<td><p><strong>Pricing</strong></p></td>
										</tr>
										</tbody>
										<tbody>
										<tr>
											<td><p>SMS</p></td>
											<td><p>$2/month</p></td>
										</tr>
										</tbody>
									</table>
								</div>
								<div class="mt-30">
									<p>Please confirm that you’re ok with the price. You will not be able to reverse this action after you’ve purchased the number</p>
								</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default" @click="close"> Close </button>
								<button class="btn id-btn-primary"> Proceed </button>
							</div>
						</div>

					</div>
				</div>
			</div>
		</modal>
	</transition>
</template>

<script>
import PricingDropdown from "@/components/general/dropdown/PricingDropdown";
export default {
	name: "RentNumberModal",
	components: {PricingDropdown},
	data(){
		return{

		}
	},
	methods: {
		close() {
			this.$modal.hide('rent-number-modal');
		},
	}
}
</script>

<style scoped>
.modal-open .modal {
	overflow-x: hidden;
	overflow-y: auto;
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
@media (min-width: 769px){
	.modal-dialog {
		width: 600px;
		margin: 30px auto;
	}
}
.modal-dialog {
	position: relative;
}
.modal-content {
	border: 0;
	border-radius: 0;
	margin-top: 100px;
}
.modal-content {
	/* border-radius: 3px; */
	-webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}
.modal-content {
	position: relative;
	background-color: #fff;
	border: 1px solid #999;
	border: 1px solid transparent;
	border-radius: 5px;
	-webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
	box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
	background-clip: padding-box;
	outline: 0;
}
.modal-header {
	position: relative;
	padding-bottom: 0;
}
.modal-header {
	padding: 20px;
	border-bottom: 1px solid transparent;
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
}
.close:hover, .close:focus {
	outline: 0;
	opacity: 1;
	filter: alpha(opacity=100);
}
.modal-body {
	padding: 5px 20px 60px 20px;
	position: relative;
}
.row {
	margin-left: 0px;
	margin-right: 0px;
}
#welcome {
	margin-bottom: 15px;
	font-weight: 300;
	letter-spacing: normal;
	font-size: 18px;
	-webkit-font-smoothing: antialiased;
	color: #2c2c2c;
	display: block;
	font-style: normal;
	-webkit-margin-before: 1em;
}
.insight {
	font-size: 13.5px !important;
	letter-spacing: normal !important;
	font-weight: 400 !important;
	line-height: 20px !important;
	margin: 0px 0px 10px 0px;
	font-style: normal;
	white-space: normal;
	color: #333333;
	-webkit-margin-before: 1em;
	-webkit-margin-after: 1em;
	-webkit-margin-start: 0px;
	-webkit-margin-end: 0px;
	display: block;
}
.wide {
	width: 200px !important;
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

.modal.in .modal-dialog {
	-webkit-transform: translate(0, 0);
	-ms-transform: translate(0, 0);
	-o-transform: translate(0, 0);
	transform: translate(0, 0);
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
</style>
