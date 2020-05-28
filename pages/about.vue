<template class="">
  <div class="home-y">
    <div class="container background body">
      <!--main nav-->
      <TheNavbar></TheNavbar>
      <!--/main nav-->
      <!--page container-->
      <div class="page-container" >
        <!--page content-->
        <div class="page-content">
          <div class="row mb-50 mt-150 ">
            <center>
              <h1 class="mb-40">We power <strong class="text-bold blue-t">messaging across Africa</strong></h1>
            </center>
          </div>
          <div class="row">
            <OurCard :styles="styles">
              <template v-slot:title>
                <h2>Our<strong class="text-bold blue-t"> Mission </strong></h2>
              </template>
              <template v-slot:text_body>
                <p class="text-semibold" style="text-align: center;">
                  To power customer messaging for the next generation of African technology businesses</p>
              </template>
            </OurCard>
            <OurCard :styles="styles">
              <template v-slot:title>
                <h2>Our<strong class="text-bold blue-t"> Vision </strong></h2>
              </template>
              <template v-slot:text_body>
                <p class="text-semibold" style="text-align: center;">
                  To help millions of African businesses communicate with their customers easily across multiple messaging channels</p>
              </template>
            </OurCard>
            <OurCard :styles="styles">
              <template v-slot:title>
                <h2>Our<strong class="text-bold blue-t"> Culture </strong></h2>
              </template>
              <template v-slot:text_body>
                <p class="text-semibold" style="text-align: center;">
                  We believe in simplicity and creating awesome experiences for our customers</p>
              </template>
            </OurCard>
          </div>
          <div class="container mt-100">
            <div class="row z-in mb-100">
              <div class="col-md-12">
                <div class="col-md-6">
                  <div class="panel-flat">
                    <h2 class="mt-100 mb-100" style="font-size: 20px !important;">Africa is home to a billion people and as a new generation of businesses spring up to serve this populace, we aim to provide them with the best infrastructure for communicating with their customers.</h2>
                    <img src="https://termii.com/assets/images/team/termii-2.jpg" class="wd-o mb-20">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="panel-flat">
                    <img src="https://termii.com/assets/images/team/termii-1.jpg" class="wd-o">
                    <h2 class="mt-50" style="font-size: 20px !important;">So far we have supported <strong>2,075+</strong> businesses (across every sector) with messaging tools for communicating with their customers easily.</h2>

                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-50">
              <center class="row">
                <h2 >We are backed by<strong class="text-bold blue-t"> global partners</strong></h2>
              </center>
              <GlobalPartnersCard url="https://termii.com/assets/images/logo/ycombinator.png" styling="investors-y"></GlobalPartnersCard>
              <GlobalPartnersCard url="https://termii.com/assets/images/logo/micro.png" styling="investors-m"></GlobalPartnersCard>
              <GlobalPartnersCard url="https://termii.com/assets/images/logo/future-hub.png" styling="investors-f"></GlobalPartnersCard>
            </div>
            <div class="row mt-10">
              <GlobalPartnersCard url="https://termii.com/assets/images/logo/kepple.png" styling="investors-k"></GlobalPartnersCard>
              <GlobalPartnersCard url="https://termii.com/assets/images/logo/brex.png" styling="investors-b"></GlobalPartnersCard>
              <GlobalPartnersCard url="https://termii.com/assets/images/logo/av.png" styling="investors-av"></GlobalPartnersCard>
            </div>
            <!-- Group Team -->
            <div class="container mt-50">
              <center>
                <h2>Our<strong class=" blue-t"> Team</strong></h2>
                <p>Our team comprises a close group of people passionate about building digital <br> products that stand out and meets the needs of our customers.</p>
                <div class="col-md-1">
                </div>
                <div class="col-md-9">
                  <div class="row mt-50">
                    <TeamMembersCard url="https://termii.com/assets/images/team/1.jpg"
                                      team_member_name="Gbolade Emmanuel"
                                      role="CoFounder & CEO"></TeamMembersCard>
                    <TeamMembersCard url="https://termii.com/assets/images/team/3.png"
                                     team_member_name="Awe Ayomide"
                                     role="CoFounder & CTO"></TeamMembersCard>
                    <TeamMembersCard url="https://termii.com/assets/images/team/9.png"
                                     team_member_name="Osuala Jennifer"
                                     role="Commercials & Strategy"></TeamMembersCard>
                  </div>
                  <div class="row mt-50">
                    <TeamMembersCard url="https://termii.com/assets/images/team/4.jpg"
                                     team_member_name="Ogunjubee Ifedolapo"
                                     role="Business & Partnership"></TeamMembersCard>
                    <TeamMembersCard url="https://termii.com/assets/images/team/5.jpg"
                                     team_member_name="Abegunde Cecilia"
                                     role="Growth & Marketing"></TeamMembersCard>
                    <TeamMembersCard url="https://termii.com/assets/images/team/6.png"
                                     team_member_name="Bakare Taiwo"
                                     role="Customer Success"></TeamMembersCard>
                  </div>
                  <div class="row mt-50">
                    <TeamMembersCard url="https://termii.com/assets/images/team/8.png"
                                     team_member_name="Nyarko Mary"
                                     role="Customer Billing"></TeamMembersCard>
                    <TeamMembersCard url="https://termii.com/assets/images/team/10.png"
                                     team_member_name="Egbayelo Tobi"
                                     role="Growth & Marketing"></TeamMembersCard>
                    <TeamMembersCard url="https://termii.com/assets/images/team/7.jpg"
                                     team_member_name="Deborah James"
                                     role="Design & Branding"></TeamMembersCard>
                  </div>
                </div>
                <div class="col-md-1">
                </div>
              </center>
            </div>
            <!-- Investr\ors-->
            <center>
              <div class="hrr-2"></div>
            </center>

            <div class="row z-in mt-20">
              <div class="col-md-12">
                <div class="panel-flat timeline-content mt-20 text-center">
                  <p class="hidden-xs">Do you have a great personality and<br> would like to join our team?</p>
                  <TermiiButton id="CHATID" label="Send CV to careers@termii.com" class="mt-40"></TermiiButton>
                </div>
              </div>
            </div>
          </div>
          <!-- /main content -->
          </div>
        <!-- /page content -->
      </div>
      <!-- Footer -->
      <TheFooter></TheFooter>

    </div>
  </div>
</template>

<script>
    import TheNavbar from "../components/general/navbar/PrimaryNavbar";
    import OurCard from "../components/general/cards/OurCard";
    import TeamMembersCard from "../components/general/cards/TeamMembersCard";
    import GlobalPartnersCard from "../components/general/cards/GlobalPartnersCard";
    import TermiiButton from "../components/general/TermiiButton";
    import TheFooter from "../components/general/TheFooter";

    export default {
        name: "about",
      components: {TheFooter, TermiiButton, GlobalPartnersCard, TeamMembersCard, OurCard, TheNavbar},
      data() {
        return {
          styles: {
            paddingLeft: '50px !important',
            paddingRight: '50px !important'
          }
        }
      }
    }
</script>

<style>

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    outline: 1px solid #fafafa !important;
  }
  ::-webkit-scrollbar {
    width: 9px !important;
    height: 9px !important;
  }
  ::-webkit-scrollbar-track {
    border-radius: 5px !important;
  }
  .background{
    background: url('~assets/images/suare.svg') no-repeat top ;

  }

  .investors-y {
    width: 225px !important;
  }
  .investors-m {
    width: 110px !important;
  }
  .investors-f {
    width: 171px !important;
    padding: 36px !important;
  }
  .investors-k {
    width: 159px !important;
    padding: 31px !important;
  }
  .investors-b {
    padding: 39px !important;
    width: 175px !important;
  }
  .investors-av {
    padding: 37px !important;
    width: 200px !important;
  }

</style>
