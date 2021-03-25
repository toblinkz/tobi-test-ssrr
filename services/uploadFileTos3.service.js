export class UploadFileToS3Service {
	 constructor(axios) {
	 	 this.$axios = axios
	 }

	 ConvertFileToBase64 = file => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result.split(',')[1]);
		reader.onerror = error => reject(error);
	});

	 async uploadFileToS3(file, file_type){
	 	try {
			 let hash = await this.ConvertFileToBase64(file)
			 return this.$axios.$post('utility/process/file/upload', {
				 hash: hash,
				 file_type: file_type
			 });
		 }catch (e) {}

	 }

}
