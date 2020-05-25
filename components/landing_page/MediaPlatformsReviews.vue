<template>
<div>
  <div class="container">
    <div class="row">
      <div class="col-sm-3">
        <ul class="list-inline social-list">
          <li class="hidden-xs">
            <p> As seen on online <br><strong> media platforms </strong></p>
          </li>
        </ul>
      </div>
      <div class="col-sm-9">
        <ul class="list-inline social-list">
          <li class="hidden-xs padx-right">
            <a href="https://techpoint.africa/2020/03/16/termii-graduates-yc/" target="_blank"><img alt="Image" class="test-m-6" src="https://termii.com/assets/images/logo/techpoint.png"></a>
          </li>
          <li class="hidden-xs padx-right">
            <a href="https://ventureburn.com/2020/03/13-african-and-africa-focused-startups-y-combinator-w20/" target="_blank"><img alt="Image" class="test-m-10" src="https://termii.com/assets/images/logo/ventureburn.png"></a>
          </li>
          <li class="hidden-xs padx-right">
            <a href="https://techcrunch.com/2020/03/17/all-the-companies-from-y-combinators-w20-demo-day-part-i-b2b-companies/" target="_blank"><img alt="Image" class="test-m-9" src="https://termii.com/assets/images/logo/techcrunch.png"></a>
          </li>
          <li class="hidden-xs padx-right">
            <a href="https://twitter.com/ycombinator/status/1239642663147757572?s=20" target="_blank"><img alt="Image" class="test-m-3" src="https://termii.com/assets/images/logo/yc.png"></a>
          </li>
        </ul>
      </div>

    </div>
    <!--end of row-->
  </div>

  </div>
</template>

<script>
    export default {
        name: "MediaPlatformsReviews"
    }
</script>

<style scoped>

  .list-inline {
    padding-left: 0;
    list-style: none;
    margin-left: -5px;
  }
  .list-inline > li {
    padding-left: 0;
    padding-right: 15px;
    font-size: 13px;
    display: inline-block;
  }


  .padx-right {
    padding-right: 15px !important;
  }
  img {
    vertical-align: middle;
  }
  .test-m-6 {
    height: 33px !important;
    margin-right: 2.9em !important;
  }
  .test-m-10 {
    height: 24px !important;
    margin-right: 3.4em !important;
  }
  .test-m-9 {
    height: 30px !important;
    margin-right: 3.71428571em !important;
  }
  .test-m-3 {
    height: 42px !important;
    margin-right: 3.71428571em !important;
  }



</style>
