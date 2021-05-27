<template>
  <div class="row">
			<ContentLoader v-if="!activity_logs"
																		:speed="2"
																		:animate="true"
			>
				<rect x="7" y="87" rx="2" ry="2" width="400" height="33" />
				<rect x="5" y="39" rx="2" ry="2" width="392" height="34" />
				<rect x="7" y="175" rx="2" ry="2" width="415" height="32" />
				<rect x="5" y="130" rx="2" ry="2" width="396" height="32" />
			</ContentLoader>
    <div class=" action-log-box"  v-else>
      <div id="mCSB_1" class="mCustomScrollBox" style="max-height: none;" tabindex="0">
        <vue-custom-scrollbar class="scroll-area" :settings="settings">
          <div id="mCSB_1_container" class="mCSB_container" style="position: relative;" dir="ltr">
          <!-- Timeline -->
          <div class="timeline-left content-group">
            <div class="timeline-container">
              <!-- Sales stats -->
              <div class="panel panel-flat " v-for="item in activity_logs.data" :key="item.id">
                <div class="panel-heading">
                  <h6 class="panel-title text-semibold"> <br>
                    <small>{{item.activity_date}}</small></h6>
                </div>
                <div class="panel-body">
                  {{item.message}}
                </div>
              </div>
              <!-- /sales stats -->
              </div>
          </div>
          </div>
        </vue-custom-scrollbar>

        </div>
      </div>
    </div>
</template>

<script>
  import vueCustomScrollbar from 'vue-custom-scrollbar'
		import {
			ContentLoader,
			FacebookLoader,
			CodeLoader,
			BulletListLoader,
			InstagramLoader,
			ListLoader
		} from 'vue-content-loader'
    export default {
        name: "ActivityLog",
       middleware: 'auth',
       components: {
        vueCustomScrollbar, ContentLoader
      },
      data() {
        return {
          settings: {
            maxScrollbarLength: 100
          },
          activity_logs:[],
          activity_date:'',
          message:'',
          emptyActivityLog: false
        }
      },
      methods: {
        async getActivityLog(){
       this.activity_logs = await this.$axios.$get('logs/activity', {
								headers:{'Authorization': `Bearer ${localStorage.getItem('local')}`}
							});
          if (this.activity_logs.data.length !== 0){this.emptyActivityLog = true}
          this.$emit('emptyActivityLog', this.emptyActivityLog);

        }
      },
      mounted() {
        	if (this.$store.state.view_verify_page === 'false' && localStorage.getItem('local')){
										this.getActivityLog();
										setInterval(this.getActivityLog, 60000 );
									}


      }
    }
</script>

<style>
  .scroll-area {
    position: relative;
    margin: auto;
    width: auto;
    height: 100%;
  }
  .mCSB_container {
    overflow: hidden;
    width: auto;
    height: auto;
  }
  .action-log-box {
    height: 540px;
    border: dashed 2px #ddd;
    padding: 12px 5px 15px 5px;
    background: #f5f5f5;
    margin-top: 23px;
  }
  .mCustomScrollBox {
    position: relative;
    overflow: hidden;
    height: 100%;
    max-width: 100%;
    outline: none;
    direction: ltr;
  }
  .ps__thumb-x, .ps__thumb-y {
    background-color: #00695C;
    border-radius: 6px;
    position: absolute;
  }
  .ps__rail-y.ps--clicking .ps__thumb-y, .ps__rail-y:focus>.ps__thumb-y, .ps__rail-y:hover>.ps__thumb-y {
    background-color:#00695C;
    width: 11px;
  }


</style>
