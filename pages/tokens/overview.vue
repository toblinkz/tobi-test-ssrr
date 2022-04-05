<template>
 <div class="token-overview-container">
		 <div class="overview-header">
				<p style="font-weight: 700; font-size: 3rem">Token</p>
				<p>Token allows businesses generate, send and verify one-time-passwords. The Token API is organised around using HTTP verbs and REST. Our API accepts and returns JSON formatted payload.</p>
			</div>
				<div style="margin-left: 4em; margin-top: 2em">
					<TokenItemCard
						title="Token Sandbox"
						info="Run test to generate, send and verify token across different messaging channel"
					>
						<template v-slot:coming-soon>
							<a style="align-self: end">Coming Soon ⇢</a>
						</template>
					</TokenItemCard>
				</div>
				<p style="margin-left: 3em; margin-top: 1em; font-weight: 700; font-size: 2rem">Token APIs</p>
				<div style="margin-left: 4em; margin-top: 1em; display: flex; gap: 10px;">
						<TokenItemCard
							title="Send Token"
							info="Send Token API allows businesses trigger one-time-passwords across any available messaging channel"
						/>
						<TokenItemCard
							title="Verify Token"
							info="Verify Token API, verifies one-time-passwords and returns responses based on the validity of the token"
						/>
						<TokenItemCard
							title="In-App Token"
							info="In-App Token are numeric or alpha-numeric codes generated to authenticate login requests and verify customer transactions."
						/>
				</div>
	</div>
</template>

<script>
import TokenItemCard from "@/components/tokens/tokenItemCard";
export default {
	name: "overview",
	components: {TokenItemCard}
}
</script>

<style scoped>
.token-overview-container{
	 display: flex;
	 flex-direction: column;
	 margin-top: 8em;
}

.overview-header{
	 padding-left: 4em;
	 padding-right: 20em;
}
</style>
