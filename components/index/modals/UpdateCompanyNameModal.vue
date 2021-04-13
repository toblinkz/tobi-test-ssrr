<template>
	<modal name="update-company-name-modal" height="auto" width="500" :resizable="true" >
		<div  style="display: block; padding-left: 9px;">
			<div>
				<div>
					<div class="modal-header" >
						<button type="button" class="close" @click="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" style="font-weight: bold" >Update</h4>
					</div>
					<div class="modal-body">
						<p class="alert insight toke" style="border-radius: 10px; padding: 5px">
							<span >Kindly Update your company name.<br>
						</span>
						</p>
						<div class="form-group">
							<label>Company Name</label>
							<input type="text" class="form-control"  >

							<br>

							<br>
						</div>
						<div class="mt-20 mb-20">
							<center>

								<a  class="btn id-btn-primary" >
									 Update
									<span v-show="isLoading" >
															<img src="/images/black_spinner.svg" height="25px" width="35px"/>
													</span>
								</a>
							</center>
						</div>
					</div>
				</div>
			</div>
		</div>
	</modal>
</template>

<script>
export default {
name: "UpdateCompanyNameModal",
methods:{
	 close(){
	 	 this.$modal.hide('update-company-name-modal');
		}
}
}
</script>

<style  scoped src="@/assets/css/modal/modal.css";>

</style>
