<template>
  <div class="panel-body text-center">
			<PieChartPlaceHolder v-if="!show_shimmer">

			</PieChartPlaceHolder>
    <canvas id="ManageCampaignChart" width="100%" height="100%" v-else>

    </canvas>
  </div>
</template>

<script>
    import Chart from "chart.js";
				import PieChartPlaceHolder from "../PieChartPlaceHolder";
				import BarChart from "./PieChart";

    export default {
        name: "ManageCampaignChart",
					components: {BarChart, PieChartPlaceHolder},
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
            labels: ["Delivered","Sent","Failed","Rejected"],
            datasets: [{"backgroundColor":["#226a4a","#365899","#ffc107","#FF0000"],"hoverBackgroundColor":["#226a4a","#365899","#ffc107","#FF0000"],"data":[this.delivered_message_count,this.message_sent_count,this.dnd_active_count,this.failed_message_count]}]
          },
          options: {"legend":{"display":true}}
        });

      }
    }
</script>

<style scoped>

</style>
