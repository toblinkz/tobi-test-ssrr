<template>
  <div class="body">
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
          <img src="https://termii.com/assets/images/api-doc.gif" style="width: 240px;margin-bottom: 20px;">
        </center>
        <div class="panel-flat timeline-content  text-center">

          <h2 class="blue-t">Developer's Guide</h2>
          <p class="mb-50">This document provides the requirement for 3rd party application integration with Termii's API. It is designed with <br>flexibility and ease of integration using any programming language.
          </p>
        </div>

        <div class="row" style="margin-top: 50px;">
          <div class="col-md-1">
          </div>

          <GuidelineCard image_url="https://termii.com/assets/images/products/note.png"
                         card_title="Guide"
                         card_text="Read API guide to learn more about our APIs"
                          start_url="http://developer.termii.com/docs/home"></GuidelineCard>

          <GuidelineCard image_url="https://termii.com/assets/images/guide/up-arrow.png"
                         card_title="API Keys"
                         card_text="Visit user console to get your test or live API      key
                                        "
                         start_url="https://termii.com/account/api"></GuidelineCard>

          <GuidelineCard image_url="https://termii.com/assets/images/products/payment.png"
                         card_title="Top-up Wallet"
                         card_text="Credit your virtual wallet to go live"
                         start_url="https://termii.com/billing/fund"></GuidelineCard>
          <div class="col-md-1 ">
          </div>
        </div>
        <div class="row">
          <center>
            <div class="hrr-5"></div>
            <footer class="col-md-12">
              <p >Termii &copy; 2020. Termii is a registered trademark of Termii Inc. With our subsidiaries in Africa,<br> We collaborate with fast growing brands to deliver great customer messaging experience for African businesses.</p>
            </footer>
          </center>

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
      components: {SecondaryNavbar, GuidelineCard, GuideLineNavbar}
    }
</script>

<style >
  body {
    padding-top: 70px;
    background: white url('~assets/images/grid.png') repeat-x fixed ;
    color: #555;
  }
  .row {
    margin-right: -15px;
    margin-left: -15px;
  }
  .api-pad {
    padding: 0px 35px 0px 35px;
  }
  @media (min-width: 1200px){
    .bs-sidebar.affix-bottom, .bs-sidebar.affix {
      width: 263px;
    }
  }
  .bs-sidebar .nav > li > a:hover,
  .bs-sidebar .nav > li > a:focus {
    text-decoration: none;
    border-right: 1px solid;
  }
  .nav>li>a:hover, .nav>li>a:focus {
    text-decoration: none;
    background-color: #eee;
  }

  .bs-sidenav {
    border-radius: 5px;
  }
  @media (min-width: 992px){
    .bs-sidebar.affix {
      position: fixed;
      top: 80px;
    }
  }
  .bs-sidebar.well {
    padding: 0;
    max-height: 90%;
    overflow-y: auto;
  }
  footer {
    margin-top: 30px;
    margin-bottom: 10px;
    text-align: center;
    font-weight: 200;
  }
  .well {
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.05);
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.05);
  }
  @media (min-width: 992px){
    .bs-sidebar.affix-bottom .bs-sidenav, .bs-sidebar.affix .bs-sidenav {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  .api-menu {
    color: #393939;
    font-size: 14px;
    font-weight: 700;
    padding: 10px 0px 0px 10px;
    line-height: 1.2em;
    margin-bottom: 0;
    margin-top: 0;
  }
  .bs-sidebar .nav > li > a {
    padding: 5px 20px;
    z-index: 1;
    border: none;
    color: #717171;
    display: block;
    font-size: 14px;
    transition: color .3s;
  }
  .nav>li>a {
    position: relative;
  }
  .nav>li {
    position: relative;
    display: block;
  }
  .up-top {
    border-top: 1px solid #e5e5e5 !important;
    padding-top: 10px !important;
  }
  p {
    font-size: 13px;
    margin: 0 0 10px;
  }
  h2{
    font-size: 30px;
  }
  h5, .h5 {
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .hrr-5 {
    border: 0;
    height: 15px;
    margin-top: 50px !important;
    margin-bottom: 50px !important;
    position: relative;
    background: radial-gradient(ellipse at bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0) 70%);
    width: 50% !important;
  }
  ::-webkit-scrollbar {
    width: 9px !important;
    height: 89px !important;
    background: #fff !important;
  }
  ::-webkit-scrollbar {
    width: 9px !important;
    height: 9px !important;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
    outline: 1px solid #fafafa !important;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #C3C3C3 !important;
    outline: 1px solid #7D838B !important;
  }
  ::-webkit-scrollbar-track {
    border-radius: 5px !important;
  }

</style>
