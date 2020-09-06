<template>
  <div class="guidelineContainer">
    <div>
      <SecondaryNavbar></SecondaryNavbar>
      <div class="col-md-12 api-pad">
        <div class="col-md-3"><div class="bs-sidebar hidden-print affix well" role="complementary" style="margin-top: 40px;">
          <ul class="nav bs-sidenav" style="padding: 19px;">
            <h3 class="main api-menu"><a class="blue-t">Home</a></h3>
            <li><a href="http://developer.termii.com/docs/home/" class="blue-t">Introduction</a></li>
            <h3 class="main api-menu"><a class="blue-t">Switch</a></h3>
            <li><a href="http://developer.termii.com/docs/senderid">Sender ID</a></li>
            <li><a href="http://developer.termii.com/docs/messaging/">Messaging</a></li>
            <li><a href="http://developer.termii.com/docs/number/">Number</a></li>
            <li><a href="http://developer.termii.com/docs/webhook-setup">Delivery Report</a></li>
            <h3 class="main api-menu"><a class="blue-t">Token</a></h3>
            <li><a href="http://developer.termii.com/docs/send-token">Send Token</a></li>
            <li><a href="http://developer.termii.com/docs/verify-token">Verify Token</a></li>
            <li><a href="http://developer.termii.com/docs/generate-token">InApp Token</a></li>
            <h3 class="main api-menu"><a class="blue-t">Insight</a></h3>
            <li><a href="http://developer.termii.com/docs/delivery">Inbox</a></li>
            <li><a href="http://developer.termii.com/docs/search">Search</a></li>
            <li class="up-top mt-10">
              <a href="https://termii.com/old-guideline">View Old API Docs</a></li>
          </ul>
        </div></div>

        <div class="col-md-8" role="main" style="margin-top: 50px;">

          <center>
            <img src="/images/api-doc.gif" style="width: 240px;margin-bottom: 20px;">
          </center>
          <div class="panel-flat timeline-content  text-center">

            <h2 class="blue-t">Developer's Guide</h2>
            <p class="mb-50">This document provides the requirement for 3rd party application integration with Termii's API. It is designed with <br>flexibility and ease of integration using any programming language.
            </p>
          </div>

          <div class="row" style="margin-top: 50px;">
            <div class="col-md-1">
            </div>

            <GuidelineCard image_url="/images/products/note.png"
                           card_title="Guide"
                           card_text="Read API guide to learn more about our APIs"
                           start_url="/"></GuidelineCard>

            <GuidelineCard image_url="/images/products/up-arrow.png"
                           card_title="API Keys"
                           card_text="Visit user console to get your test or live API      key
                                        "
                           start_url="/"></GuidelineCard>

            <GuidelineCard image_url="/images/products/payment.png"
                           card_title="Top-up Wallet"
                           card_text="Credit your virtual wallet to go live"
                           start_url="/"></GuidelineCard>
            <div class="col-md-1 ">
            </div>
          </div>
          <div class="row mt-70">
            <center>
              <div class="hrr-5 "></div>
              <footer class="col-md-12">
                <p >Termii &copy; 2020. Termii is a registered trademark of Termii Inc. With our subsidiaries in Africa,<br> We collaborate with fast growing brands to deliver great customer messaging experience for African businesses.</p>
              </footer>
            </center>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import GuideLineNavbar from "../components/general/navbar/SecondaryNavbar";
    import GuidelineCard from "../components/general/cards/GuidelineCard";
    import SecondaryNavbar from "../components/general/navbar/SecondaryNavbar";
    export default {
        name: "guideline",
      components: {SecondaryNavbar, GuidelineCard, GuideLineNavbar},
					head() {
						return {
							title: 'Developer Center - Termii',
							meta: [
								// hid is used as unique identifier. Do not use `vmid` for it as it will not work
								{
									hid: 'description',
									name: 'description',
									content: 'My custom description'
								}
							]
						}
					},
      mounted () {
        this.$nextTick(() => {
          this.$nuxt.$loading.start()

          setTimeout(() => this.$nuxt.$loading.finish(), 500)
        })
      }
    }
</script>

<style scoped>
  @import "assets/css/general_style/guideline.css";


</style>
