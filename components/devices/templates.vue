<template>
	<section class="wrapper-bottom-sec">
		<div class="col-md-12">
			<div class="p-30">
				<div class="row">
					<div class="">
						<h3 class="panel-title">Templates</h3>
						<div class="panel" style="overflow-x:auto;">
							<div class="panel-body ">
								<button  class="btn btn-primary btn-sm mb-30" @click="openSendTemplateModal"><i class="fa fa-plus m-r-5"></i>Request Template</button>
								<table class="table data-table table-hover mt-20">
									<thead>
									<tr>
										<th style="width: 20%;text-align: center">ID#</th>
										<th style="width: 35%;text-align: center">Template</th>
										<th style="width: 10%; text-align: center">Status</th>
										<th style="width: 35%; text-align: center">Rejected Reason</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="row in template_data.data" :key="row.id">
										<td data-label="SL" >{{row.uuid}}</td>
										<td style="width: 20%;text-align: center"><p>{{row.template || 'None'}}</p></td>
										<td style="width: 20%;text-align: center" ><p class="label" :class="setStatusClass(row)">{{row.status}}</p></td>
										<td style="width: 20%;text-align: center" ><p>{{row.rejected_reason || '-'}}</p></td>
									</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Pagination
				:page="template_data.current_page"
				:total_page="template_data.last_page"
				v-if="showPagination"
				:on-page-change="onPageChange">
			</Pagination>
			<SendTemplateSampleModal @sent-template-sample="sentTemplateSample" :device_id="device_id"></SendTemplateSampleModal>
		</div>
	</section>
</template>
<script>
import Pagination from "../general/Pagination";
import SendTemplateSampleModal from "../modals/SendTemplateSampleModal";
export default {
	name: "DeviceTemplate",
	components: {SendTemplateSampleModal, Pagination},
	data(){
		 return{
				page: 1,
				total_page: '',
				showPagination: true,
			}
	},
	props: {
		template_data: {
			required: true
		},
		device_id:{
			required: true
		}
	},
	methods:{
		 onPageChange(page){
     this.$emit('page', page);
			},
		 openSendTemplateModal(){
		 	this.$modal.show('send-template-sample-modal')
		},
		sentTemplateSample(){
		 	this.$emit('update-templates-table');
		},
		setStatusClass(row){
			switch (row.status){
				case('approved'):{
					return 'label-approved'
				}
				case ('pending'):{
					return 'label-pending'
				}
				case('rejected'):{
					return 'label-rejected'
				}
			}
		}
	},
}
</script>

<style scoped>

.page-header-content {
	margin: auto;
	max-width: 1280px;
	position: relative;
	background-color: inherit;
	padding: 0 20px;
}
.page-header:not(.page-header-filled) + .page-container {
	padding-top: 35px;
}
.page-container {
	margin: auto;
	padding-bottom: 10px;
}
@media (min-width: 769px){
	.page-container {
		width: 100%;
		display: table;
		table-layout: fixed;
	}
}

.table {
	margin-bottom: 0;
}.table > thead > tr > th {
		border-bottom: dotted #ddd !important;
		vertical-align: middle;
		padding: 12px 20px;
		line-height: 1.5384616;
		border-top: 1px solid #f8f8f8;
	}
.table-responsive {
	overflow-x: auto;
	min-height: 0.01%;
}
.table {
	width: 100%;
	max-width: 100%;
	/* margin-bottom: 20px; */
}

.table > tbody > tr > td{
	vertical-align: middle;
	padding: 12px 20px;
	line-height: 1.5384616;
}
th {
	font-weight: 500;
	text-align: left;
}
.table-hover > tbody > tr:hover {
	background-color: #f8f8f8;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
	background-color: transparent;
}
.panel-title {
	position: relative;
	font-size: 21px;
}
.btn-success {
	color: #fff;
	background: linear-gradient(-48deg, #70ddad -30%, #226a4a 60%) !important;
	box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
}
.pull-right {
	float: right !important;
}
.btn-sm{
	padding: 6px 11px;
}
h3 {
	text-transform: uppercase;
	display: inline-block;
	letter-spacing: 0.02em;
	font-size: 15px;
	font-weight: 600;
	margin: 0;
	padding: 0;
	line-height: normal;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-text-stroke: 0px grey;
	filter: alpha(opacity=40);
	-webkit-transition: opacity 0.3s ease;
	transition: opacity 0.3s ease;
}
.label {
	font-size: 11px;
	padding: 2px 10px;
	margin: 2px 0;
	border-radius: 20px;
	font-weight: 600;
	line-height: 1;
	white-space: nowrap;
	text-align: center;
	display: inline-block;
	text-transform: uppercase;
	border: 1px solid transparent;
	letter-spacing: 0.1px;
}
.label-success {
	border-color: #4CAF50;
	color: #fff;
	background-color: #4CAF50;
}
.label-pending {
	border-color:#ffc107;
	color: #fff;
	background-color: #ffc107;
}
.label-rejected {
	border-color:#FF0000;
	color: #fff;
	background-color:#FF0000;
}
.label-approved{
	border-color:#226a4a;
	color: #fff;
	background-color:#226a4a;
}
.btn-primary {
	color: #fff;
	background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
	box-shadow: 8px 10px 20px 0 rgba(0, 0, 0, 0.22);
}
.btn-primary:hover {
	color: #fff;
	background-color: #0c7cd5;
	border: 1px solid transparent !important;
}
</style>
