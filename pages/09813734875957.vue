<template>

</template>

<script>
export default {
 name: "clear-storage",
	middleware:  ['auth', 'inactive_user'],
	async mounted() {
		try {
			await this.$axios.$get('auth/logout');
			this.$store.commit('setLIState', false);
			localStorage.clear();
			await this.$router.push({name: 'login'});
			this.$store.commit('setViewVerificationPage', 'false');
		}catch (e) {

		}
	}
}
</script>

<style scoped>

</style>
