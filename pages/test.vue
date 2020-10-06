<template>
		<div>
			<a class="btn btn-primary" @click="showModal">Show Modal</a>
			<VerificationModal></VerificationModal>
		</div>
</template>

<script>
import VerificationModal from "~/components/modals/VerificationModal";
export default {
	name: "test",
	components: {VerificationModal},
	methods: {
		showModal(){
			this.$modal.show('verification-id-modal');
			console.log('show')
		}
	}
}
</script>

<style scoped>

</style>
