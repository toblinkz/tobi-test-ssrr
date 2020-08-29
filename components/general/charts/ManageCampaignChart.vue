<template>
  <div class="panel-body text-center">
    <canvas id="ManageCampaignChart" width="400" height="200">

    </canvas>
  </div>
</template>

<script>
    import Chart from "chart.js";

    export default {
        name: "ManageCampaignChart",
      props:{
        delivered_message_count: {
          type: Number,
          required: true
        } ,
        message_sent_count:{
          type: Number,
          required: true
        },
        dnd_active_count:{
          type:Number,
          required: true
        },
        failed_message_count: {
          type: Number,
          required:true
        }

      },
      mounted() {
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
