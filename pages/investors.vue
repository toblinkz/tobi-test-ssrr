<template>
  <div class="home-y body">
    <div class="container background">
      <!--main nav-->
      <TheNavbar></TheNavbar>
      <!--/main nav-->
      <div class="page-container" >
        <!--page content-->
        <div class="page-content">
          <div class="row mb-50 mt-150">
            <center>
              <small>TERMII INC.</small>
              <h1 class="mb-40">2,088+ <strong class="text-bold blue-t">Businesses</strong></h1>
              <p>Across every industry - from financial technology, health technology, agric technology, and retail use our sms,<br> emails, voice, & instant messaging APIs to verify and engage their customers daily.</p>
            </center>
          </div>
          <div class="row">
            <OurCard>
              <template v-slot:title>
                <h2>Our<strong class="text-bold blue-t"> Offices</strong></h2>
              </template>
              <template v-slot:text_body>
                <p class="text-semibold" style="text-align: center;">
                  We are located across three offices Washington D.C - USA, Lagos - Nigeria, and Accra - Ghana
                </p>
              </template>
            </OurCard>
            <OurCard>
              <template v-slot:title>
                <h2>Our<strong class="text-bold blue-t"> Impact</strong></h2>
              </template>
              <template v-slot:text_body>
                <p class="text-semibold" style="text-align: center;">
                  We connect across multiple messaging channels over <strong>100,000 Africans</strong> on a monthly basis to brands they love</p>
              </template>
            </OurCard>
            <OurCard>
              <template v-slot:title>
                <h2>Our<strong class="text-bold blue-t"> Fund</strong></h2>
              </template>
              <template v-slot:text_body>
                <p class="text-semibold" style="text-align: center;">
                  We have created a <strong>USD 10,000 fund</strong> to support projects that utilize our infrastructure to solve social problems</p>
              </template>
            </OurCard>
          </div>
          <div class="container mt-100 hidden-xs">
            <div class="row mb80">
              <div class="page-timeline" id="">
                <div class="vtimeline-point">
                  <div class="vtimeline-icon">
                    <i class="entypo-rocket"></i>
                  </div>
                  <div class="vtimeline-block">
                    <span class="vtimeline-date">2020</span>
                    <div class="vtimeline-content">
                      <small>JANUARY</small>
                      <h4><strong class="text-bold blue-t">Y Combinator</strong></h4>
                      Termii the first Nigerian CPaaS startup to be accepted into Y Combinator, the tech startup accelerator where companies like Brex and Airbnb were incubated
                    </div>
                  </div>
                </div>

                <div class="vtimeline-point">
                  <div class="vtimeline-icon">
                    <i class="entypo-rocket"></i>
                  </div>
                  <div class="vtimeline-block">
                    <span class="vtimeline-date">2019</span>
                    <div class="vtimeline-content">
                      <small>DECEMBER</small>
                      <h4><strong class="text-bold blue-t">Termii launches Verification APIs</strong></h4>
                      Termii launches its new line of verification API products that targets fintech startups across Africa
                    </div>
                  </div>
                </div>

                <div class="vtimeline-point">
                  <div class="vtimeline-icon">
                    <i class="entypo-rocket"></i>
                  </div>
                  <div class="vtimeline-block">
                    <span class="vtimeline-date">2019</span>
                    <div class="vtimeline-content">
                      <small>NOVEMBER</small>
                      <h4><strong class="text-bold blue-t">Termii wins Zenathon Grant</strong></h4>
                      Termii wins Zenith bank's $2,500 prize grant at its first zenathon event held in partnership with Seedstars Nigeria
                    </div>
                  </div>
                </div>

                <div class="vtimeline-point">
                  <div class="vtimeline-icon">
                    <i class="entypo-rocket"></i>
                  </div>
                  <div class="vtimeline-block">
                    <span class="vtimeline-date">2019</span>
                    <div class="vtimeline-content">
                      <small>OCTOBER</small>
                      <h4><strong class="text-bold blue-t">Pre-Seed Investment</strong></h4>
                      Termii raises $45,000 in pre-seed investment from early stage investment funds -- Microtraction and Future hub
                    </div>
                  </div>
                </div>

                <div class="vtimeline-point">
                  <div class="vtimeline-icon">
                    <i class="entypo-rocket"></i>
                  </div>
                  <div class="vtimeline-block">
                    <span class="vtimeline-date">2018</span>
                    <div class="vtimeline-content">
                      <small>OCTOBER</small>
                      <h4><strong class="text-bold blue-t">Termii wins regional finals</strong></h4>
                      Termii wins regional finals and emergies as one of Demo Africa's top 30 finalist to attend lions africa 2017 startup showcase in casablance, morrocco
                    </div>
                  </div>
                </div>

                <div class="vtimeline-point">
                  <div class="vtimeline-icon">
                    <i class="entypo-rocket"></i>
                  </div>
                  <div class="vtimeline-block">
                    <span class="vtimeline-date">2017</span>
                    <div class="vtimeline-content">
                      <small>DECEMBER</small>
                      <h4><strong class="text-bold blue-t">Termii Wins Next-Economy</strong></h4>
                      Termii wins €2,000 at the 2017 Next-Economy Acceleration programme organized by the ministry of foreign affairs of The Kingdom of the Netherlands
                    </div>
                  </div>
                </div>
                <div class="vtimeline-point">
                  <div class="vtimeline-icon">
                    <i class="entypo-rocket"></i>
                  </div>
                  <div class="vtimeline-block">
                    <span class="vtimeline-date">2017</span>
                    <div class="vtimeline-content">
                      <small>OCTOBER</small>
                      <h4><strong class="text-bold blue-t">Termii officially launch first Beta</strong></h4>
                      Termii is founded by Emmanuel Gbolade and Ayomide Awe, software developers and longtime business partners and friends
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-50">
            <center class="row">
              <h2>Press<strong class="text-bold blue-t"> Mentions</strong></h2>
            </center>
            <div class="mt-20">

            </div>
            <PressMentionCard
              card_text="All the companies from Y Combinator’s W20 Demo Day, Part I: B2B Companies"
              explore_url="https://techcrunch.com/2020/03/17/all-the-companies-from-y-combinators-w20-demo-day-part-i-b2b-companies">
              <template>
                <h4 class="testimonial-head"><span style="font-weight: 400 !Important;">Mentions by</span> <span class="blue-t"> Techcrunch</span></h4>
              </template>
            </PressMentionCard>
            <PressMentionCard
              card_text="Microtraction invests in Nigerian online marketing platform Termii"
              explore_url="https://ventureburn.com/2019/11/microtraction-termii-investment-nigeria">
              <template>
                <h4 class="testimonial-head"><span style="font-weight: 400 !Important;">Mentions by</span> <span class="blue-t"> Ventureburn</span></h4>
              </template>
            </PressMentionCard>
            <PressMentionCard
              card_text="Termii, a Nigerian CaaS startup, secures $30,000 seed fund from Future Hub"
              explore_url="https://techpoint.africa/2019/11/20/termii-raises-seed-fund">
              <template>
                <h4 class="testimonial-head"><span style="font-weight: 400 !Important;">Mentions by</span> <span class="blue-t"> Techpoint</span></h4>
              </template>
            </PressMentionCard>
          </div>
          <center>
            <div class="hrr-2"></div>
          </center>
          <div class="row z-in mt-50 hidden-xs">
            <div class="col-md-12">
              <div class="panel-flat timeline-content mt-50 text-center">
                <h2>Want to invest or partner <strong class="text-bold blue-t">with us?</strong></h2>
                <p>Reach out to our corporate finance and legal team, <br>we are always ready to connect with you</p>
                <a id="CHATID" class="btn bg-blue">Talk to company@termii.com<i class="fa fa-angle-double-right padd-left"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TheFooter></TheFooter>
    </div>
  </div>
</template>

<script>
  import TheNavbar from "../components/general/navbar/PrimaryNavbar";
  import OurCard from "../components/general/cards/OurCard";
  import PressMentionCard from "../components/general/cards/PressMentionCard";
  import TermiiButton from "../components/general/TermiiButton";
  import TheFooter from "../components/general/TheFooter";
  export default {
    name: "investors",
    components: {TheFooter, TermiiButton, PressMentionCard, OurCard, TheNavbar},
    mounted () {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()

        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      })
    }

  }
</script>

<style >
  .background{
    background: url('/images/suare.svg') no-repeat top ;
  }

  .page-timeline {
    margin: 30px auto 0 auto;
    position: relative;
    max-width: 680px;
  }

  .page-timeline:before {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 303px;
    right: auto;
    height: 100%;
    width: 3px;
    background: #365799;
    z-index: 0;
  }

  .page-timeline:after {
    position: absolute;
    content: '';
    width: 3px;
    height: 40px;
    background: #365799;
    top: 100%;
    left: 303px;

    -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.3);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.3);
  }

  .vtimeline-content {
    margin-left: 350px;
    padding: 0px 30px 100px 20px;
    border-radius: 3px;
    text-align: left;
    font-size: 15px;
  }

  .vtimeline-content h3 {
    font-size: 1.5em;
    font-weight: 600;
    display: inline-block;
    margin: 0;
  }

  .vtimeline-content p {
    font-size: 0.9em;
    margin: 0;
  }

  .vtimeline-point {
    position: relative;
    display: block;
    vertical-align: top;
    margin-bottom: 30px;
  }

  .vtimeline-icon {
    position: relative;
    color: #fff;
    width: 20px;
    font-size: 8px;
    padding: -30px 0px 0px 0px;
    height: 20px;
    background: #365799;
    border-radius: 50%;
    float: left;
    text-align: center;
    line-height: 50px;
    z-index: 99;
    margin-left: 295px;
  }

  .vtimeline-icon i {
    display: block;
    font-size: 1.5em;
    line-height: 50px;

  }

  .vtimeline-date {
    width: 260px;
    text-align: right;
    position: absolute;
    left: 0;
    top: 0px;
    font-weight: 400;
    color: #374054;
  }
  .post-meta {
    padding-top: 15px;
    margin-bottom: 20px;
  }
  .post-meta li:not(:last-child) {
    margin-right: 10px;
  }
</style>
