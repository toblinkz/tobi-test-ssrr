<template>
  <div class="panel-body text-center">
			<PieChartPlaceHolder v-if="!show_shimmer">

			</PieChartPlaceHolder>
    <canvas id="ManageCampaignChart" width="400" height="200" v-else>

    </canvas>
  </div>
</template>

<script>
    import Chart from "chart.js";
				import PieChartPlaceHolder from "../PieChartPlaceHolder";

    export default {
        name: "ManageCampaignChart",
					components: {PieChartPlaceHolder},
					data(){
       return{
								delivered_message_count: '',
								message_sent_count: '',
								dnd_active_count: '',
								failed_message_count: '',
								show_shimmer: false
							}
					},
      props:{
        campaign_id: {
          required: true
        } ,

      },
					methods:{

						async fetch(){
							try {
								//get campaign analytics
								let data = await  this.$axios.$get('sms/campaign/'+ this.campaign_id + '/analytics')
								this.delivered_message_count = data.delivered;
								this.message_sent_count = data.sent;
								this.dnd_active_count = data.dnd;
								this.failed_message_count = data.failed;
								this.show_shimmer = true;
							}catch (e) {

							}
						}
					},
      async mounted() {
        	await this.fetch();
         const ctx = document.getElementById('ManageCampaignChart');
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ["Delivered","Message Sent","DND Active","Failed"],
            datasets: [{"backgroundColor":["#5BC0DE","#30DDBC","#f0ad4e","#D9534F"],"hoverBackgroundColor":["#5BC0DE","#30DDBC","#f0ad4e","#D9534F"],"data":[this.delivered_message_count,this.message_sent_count,this.dnd_active_count,this.failed_message_count]}]
          },
          options: {"legend":{"display":true}}
        });

      }
    }
</script>

<style scoped>

</style>
