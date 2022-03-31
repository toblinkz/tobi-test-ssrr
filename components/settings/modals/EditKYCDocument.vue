<template>
	<modal name="edit-kyc-document-modal" height="auto" width="440px">
		<div class="edit-kyc-document-modal-container">
			<div class="edit-kyc-document-modal-header">
				<h4 class="edit-kyc-document-modal-title">Edit KYC Document</h4>
				<img src="/images/icons/svg_icons/close-icon-round.svg" alt="" class="close-icon" @click="closeModal">
			</div>

			<div class="edit-kyc-document-modal-body">
				<p style="margin-bottom: 20px">Make adjustments to your KYC document</p>
				<div class="form-group">
					<div style="width: 100%">
						<label>Document Name</label>
						<input
							v-model="nameOfFile"
							class="form-control"
						/>
					</div>

					<div class="upload-file">
						<input @change="selectFile" type="file" id="upload-file" name="filename" hidden>
						<label for="upload-file" id="upload-file-doc">Choose File</label>
						<span id="file-chosen">{{ fileDocument.name	}}</span>
					</div>
				</div>
			</div>

			<div class="edit-kyc-document-modal-footer">
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
	name: "EditKYCDocument",
	middleware:'auth',
	components: {ButtonSpinner, Switches},

	data() {
		return {
			isLoading: false,
			hover: false,
			show_icon: true,
			submitDocument: 'Update Document',
			nameOfFile: '',
			fileDocument: '',
			fileUrl: '',
		}
	},

	computed:{
		isDisabled:function () {
			return (!this.nameOfFile);
		},
	},

	methods: {
		closeModal() {
			this.nameOfFile = ''
			this.fileDocument = ''
			this.$modal.hide('edit-kyc-document-modal');
		},

		selectFile(e){
			let files = e.target.files || e.dataTransfer.files
			this.fileDocument = files[0]
		},

		submitDocumentFunc()	{
			const newDocument = {name_of_file: this.nameOfFile, file_document: this.fileDocument}
			this.$emit('edit-document', newDocument)
		}
	},

}
</script>

<style scoped>
@import "../../../assets/css/modal/modal.css";

.edit-kyc-document-modal-header {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20px 30px;
	border-bottom: 1px solid #E7E7E7;
}

.edit-kyc-document-modal-header h4 {
	padding: 0;
	font-weight: bold;
}

.edit-kyc-document-modal-title {
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

.edit-kyc-document-modal-body {
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

.edit-kyc-document-modal-footer {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 0 0 40px;
}

.edit-kyc-document-modal-footer .btn {
	margin: 0 auto;
}

</style>
