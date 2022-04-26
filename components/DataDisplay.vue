<template>
	<div style="width: 100%">
				<div id="content" v-html="file"></div>
	</div>
</template>

<script>
export default {
	name: "DataDisplay",

	data() {
		return {
			file: '',
			myFile: '',
		}
	},

	async mounted() {
		await this.fetchFile()
		let privacyPolicyDiv = document.getElementById('content')
		privacyPolicyDiv.addEventListener('scroll', this.handleScroll)
	},

	beforeDestroy() {
		document.getElementById('content').removeEventListener('scroll', this.handleScroll)
	},

	methods: {
		async fetchFile() {
			const url = "https://termii.s3.us-west-1.amazonaws.com/upload/files/privacy_policy.html"
			// const url = "https://termii.s3.us-west-1.amazonaws.com/upload/files/Z3wqtym9r9B35FhsqDy2.html"
			await fetch(url)
				.then(r => r.text())
				.then(t => this.file = t)
		},

		async selectFile(e) {
			let files = e.target.files || e.dataTransfer.files
			this.myFile = files[0]
			const file_type = this.myFile.name.split('.').pop().toLowerCase();

			console.log(this.myFile, file_type)
			const uploadUrl = await this.$uploadFileTos3.uploadFileToS3(this.myFile, file_type).catch((e) => {
				this.$toast.error(e)
			});
			console.log(uploadUrl)
			console.log(uploadUrl.data)
		},

		handleScroll(event) {
			if ((event.target.offsetHeight + event.target.scrollTop) >= event.target.scrollHeight) {
				this.$emit('scroll-to-end')
			}
		}
	}

}
</script>

<style scoped>
#content {
	width: 100%;
	height: 450px;
	overflow: scroll;
	/*white-space: pre-wrap;*/
	padding: 1.5rem;
	margin: 0 0 20px;
	border-top: 1px solid #222222;
	border-bottom: 1px solid #222222;
}
</style>
