<template>
   <div >
				<PrimaryNavbar></PrimaryNavbar>
								<section class="header-section section-404">
									<div class="container">
											<div class="sub-container">
												<img src="/images/error-ladder.svg">

											</div>
										<div class="text-button">
											<p class="text-center">Whoops! Page Not Found, Seems you made a wrong turn,<br>
												please check the link you typed or reload this page again. <br>If the issue still persists return to Home Page</p><br>
											<nuxt-link to="/"  class="btn bg-blue m-t-10 " >
											Back to Homepage
											</nuxt-link>
										</div>
										<TrustedBySection></TrustedBySection>
										<TheFooter></TheFooter>
									</div>
								</section>
			</div>
</template>
<script>
    import PrimaryNavbar from "../components/general/navbar/PrimaryNavbar";
				import ButtonSpinner from "../components/general/ButtonSpinner";
				import TrustedBySection from "../components/general/TrustedBySection";
				import TheFooter from "../components/general/TheFooter";
				export default {
        name: "error",
					   layout: 'auth',
					   components: {TheFooter, TrustedBySection, ButtonSpinner, PrimaryNavbar}
				}
</script>

<style scoped>
.header-section{
	background: url('/images/suare.svg') no-repeat top ;
}
section.section-404 {
	padding: 200px 0 50px;

}
.container {
	margin: 0 auto;
	max-width: 1310px;
	padding: 0 20px;
	width: 100%;
}
	.sub-container{
		display: flex;
		justify-content: center;
	}
	.text-button{
		margin-bottom: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	p{
		font-size: 1.8rem;
		font-weight: bold;
		color: #365899;
	}
</style>
