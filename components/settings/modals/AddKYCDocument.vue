<template>
	<modal name="add-kyc-document-modal" height="auto" width="440px">
		<div class="add-kyc-document-modal-container">
			<div class="add-kyc-document-modal-header">
				<h4 class="add-kyc-document-modal-title">Upload Your KYC Document</h4>
				<img src="/images/icons/svg_icons/close-icon-round.svg" alt="" class="close-icon" @click="closeModal">
			</div>

			<div class="add-kyc-document-modal-body">
					<div class="form-group">
						<div style="width: 100%">
							<label>
								Document Name

								<img
									@mouseover="hover = true"
									@mouseleave="hover = false"
									style="margin-left: 6px; cursor: pointer"
									src="/images/icons/svg_icons/more-info-icon.svg" alt="">
							</label>

							<input
								v-model="nameOfFile"
								class="form-control"
								placeholder="Document name should not exceed 9 characters"
							/>
						</div>

						<div class="more-info" v-if="hover">
							Sample document name:
							<br>
							<ul>
								<li>NCC License</li>
								<li>Payment License (CBN/Money Lender/Co-operative license/SEC, etc.)</li>
								<li>CAC document or certificate</li>
								<li>Letter of Authorization (Signed Copy)</li>
								<li>Trade License</li>
								<li>NOC (No Objection Certificate)</li>
							</ul>
						</div>

						<div class="upload-file">
							<input @change="selectFile" type="file" id="upload-file" name="filename" hidden>
							<label for="upload-file" id="upload-file-doc">Choose File</label>
							<span id="file-chosen">{{ fileDocument.name	}}</span>
						</div>
					</div>
			</div>

			<div class="add-kyc-document-modal-footer">
				<a class="btn bg-blue" @click="submitDocumentFunc" :aria-disabled="isDisabled">
					{{submitDocument}}
					<span v-show="isLoading" >
						<img src="/images/black_spinner.svg" height="20px" width="30px"/>
					</span>
				</a>
			</div>
		</div>
	</modal>

</template>

<script>
import ButtonSpinner from "@/components/general/ButtonSpinner";
import Switches from "vue-switches";

export default {
	name: "AddKYCDocument",
	middleware:'auth',
	components: {ButtonSpinner, Switches},

	data() {
		return {
			isLoading: false,
			hover: false,
			show_icon: true,
			submitDocument: 'Submit Document',
			nameOfFile: '',
			fileDocument: '',
			fileUrl: '',
		}
	},

	computed:{
		isDisabled:function () {
			return (!this.nameOfFile || !this.fileDocument);
		},
	},

	methods: {
		closeModal() {
			this.nameOfFile = ''
			this.fileDocument = ''
			this.$modal.hide('add-kyc-document-modal');
		},

		selectFile(e){
			let files = e.target.files || e.dataTransfer.files
			this.fileDocument = files[0]
		},

		async submitDocumentFunc() {
			this.submitDocument = 'Submitting Document'
			this.isLoading = true
			try {
					const file_type = this.fileDocument.name.split('.').pop().toLowerCase();
					const uploadS3Url = await this.$uploadFileTos3.uploadFileToS3(this.fileDocument, file_type).catch((e) => {
						this.$toast.error(e)
					});

					this.fileUrl = uploadS3Url.data;

					let response = await this.$kyc.addKYCDocument(this.nameOfFile, this.fileUrl)

					this.isLoading = false
					this.nameOfFile = ''
					this.fileDocument = ''
					this.submitDocument = 'Submit Document'
					this.$modal.hide('add-kyc-document-modal');
					this.$toast.success('Document successfully uploaded!')
					this.$emit('refresh-kyc-list')
			} catch (e) {
				this.isLoading = false
				this.submitDocument = 'Submit Document'
			}
		}
	}
}
</script>

<style scoped>
@import "../../../assets/css/modal/modal.css";

.add-kyc-document-modal-header {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20px 30px;
	border-bottom: 1px solid #E7E7E7;
}

.add-kyc-document-modal-header h4 {
	padding: 0;
	font-weight: bold;
}

.add-kyc-document-modal-title {
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

.add-kyc-document-modal-body {
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
	color: #2b2b2b;
}
.form-control{
	font-size: 13px;
	border-radius: 5px;
	border: 1px solid rgba(204, 204, 204, 1);
	font-weight: 500;
	box-shadow: none;
	display: block;
	width: 100%;
	height: 36px;
	padding: 7px 12px;
	line-height: 1.5384616;
	color: #2b2b2b;
	background-color: #fff;
	background-image: none;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.form-control:hover {
	border-color: #777777;
}
.form-control:focus {
	border-color: #4DB6AC;
	outline: none;
}

.more-info {
	width: 280px;
	background: #365899;
	border-radius: 0 6px 6px 6px;
	font-size: 13px;
	line-height: 18px;
	color: #FFFFFF;
	padding: 10px 13px;
	position: absolute;
	top: 18px;
	left: 125px;
	z-index: 99;
}

.upload-file {
	width: 100%;
	margin: 30px 0;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}

#upload-file-doc {
	background: #777777;
	color: white;
	padding: 0.5rem;
	font-family: sans-serif;
	border-radius: 6px;
	cursor: pointer;
	margin-top: 1rem;
	margin-right: 20px;
	width: 120px;
	text-align: center;
}

.add-kyc-document-modal-footer {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 0 0 40px;
}

.add-kyc-document-modal-footer .btn {
	margin: 0 auto;
}

</style>
