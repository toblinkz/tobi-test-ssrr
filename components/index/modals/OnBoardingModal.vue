<template>
	<modal name="on-boarding-modal"   width="700px" height="auto" >

				<div>
					<div>
						 <p class="blue-t" style="padding: 30px 20px 0px 0px; text-align: center; font-size: 25px">What will you like to do?</p>
					</div>
					<div style="display: flex; justify-content: space-around; padding: 20px">

						<NuxtLink to="/sandbox">
								<div class="onboarding-card">
									<div class="panel-body no-padding">
										<img src="/images/products/sandbox.svg" style="height: 50px!important;" class="wd-50">
										<h5 class="mb-10"><strong>Test Sandbox</strong></h5>
										<p class="insight mb-10">
											Test our<br> different channels and services on Sandbox
										</p>
									</div>
								</div>
						</NuxtLink>

							<NuxtLink to="/phone-book">
								<div class="onboarding-card">
									<div class="panel-body no-padding">
										<img src="/images/products/server.png" class="wd-50">
										<h5 class="mb-10"><strong>Upload Contacts</strong></h5>
										<p class="insight mb-10">
											Upload customers'<br> contacts  to a phonebook
										</p>
									</div>
								</div>
							</NuxtLink>

        <a  href="https://developers.termii.com" target="_blank">
									<div class="onboarding-card">
										<div class="panel-body no-padding">
											<img src="/images/products/app.png" class="wd-50">
											<h5 class="mb-10"><strong>Integrate Our APIs</strong></h5>
											<p class="insight mb-10">
												Explore our documentation<br> for a quick start
											</p>
										</div>
									</div>
								</a>


					</div>
				</div>


	</modal>
</template>

<script>
export default {
name: "OnBoardingModal"
}
</script>

<style scoped src="@/assets/css/modal/signupwizard.css"; >

</style>
