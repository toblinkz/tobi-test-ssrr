<template>
  <div class="container">
			<ul class="settings-nav-bar">
        <li rel0="AccountController/profile">
          <nuxt-link to="/account/profile" class="level-1  " >
            <i class="icon-user icon"></i> My profile
          </nuxt-link>
        </li>
        <li rel0="AccountController/api">
          <nuxt-link to="/account/api" class="level-1  ">
            <i class="icon-key icon"></i> API token
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/account/webhook/config" class="level-1  ">
            <i class="entypo-tools icon"></i> Webhook Config
          </nuxt-link>
        </li>
        <li rel0="AccountController/api">
          <nuxt-link to="/account/deactivate" class="level-1 " exact>
            <i class="entypo-logout icon"></i> Deactivate Account
          </nuxt-link>
        </li>
							<li rel0="AccountController/api">
								<nuxt-link to="/account/change-password" class="level-1  ">
									<i class="icon-lock icon"></i> Change Password
								</nuxt-link>
							</li>
							<li rel0="AccountController/api">
								<nuxt-link to="/account/notification" class="level-1  ">
									<i class="icon-notification2 icon"></i> Email Notification
								</nuxt-link>
							</li>
							<li rel0="AccountController/api">
								<nuxt-link to="/account/kyc" class="level-1  ">
									<i class="entypo-newspaper icon"></i> KYC
								</nuxt-link>
							</li>
      </ul>
  </div>
</template>

<script>
    export default {
        name: "ApiNavbar",
    }
</script>

<style scoped>
  .nuxt-link-exact-active{
    color: #ffffff;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
  }
  .nuxt-link-active{
    color: #ffffff !important;
    background: linear-gradient(-48deg, #0DCBE5 -30%, #365899 60%) !important;
  }
  .container {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 1000px;
			padding: 10px;
			margin: 0 auto 20px;
			/*background-color: red;*/
  }

		.settings-nav-bar{
			/*background-color: blue;*/
			width: 100%;
			border-bottom: 1px dashed #26A69A;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			list-style-type: none;
			margin: 0;
			padding: 0;
		}

		.settings-nav-bar > li > a,
		.settings-nav-bar > li > a:focus {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-bottom: -1px;
			cursor: pointer;
			border-width: 0 0 4px 0;
			border-radius: 3px 3px 0 0;
			border-bottom: 4px solid transparent;
			color: #777;
			padding: 8px;
		}

		.settings-nav-bar > li > a:hover {
			border-bottom-color: #365899;
		}

  .icon {
    margin-right: 6px;
  }
</style>
