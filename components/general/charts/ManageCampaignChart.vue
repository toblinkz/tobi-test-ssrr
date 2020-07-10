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
      mounted() {
        const ctx = document.getElementById('ManageCampaignChart');
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ["Delivered","Message Sent","DND Active","Failed"],
            datasets: [{"backgroundColor":["#5BC0DE","#30DDBC","#f0ad4e","#D9534F"],"hoverBackgroundColor":["#5BC0DE","#30DDBC","#f0ad4e","#D9534F"],"data":[12614,789,2,0]}]
          },
          options: {"legend":{"display":true}}
        });
      }
    }
</script>

<style scoped>

</style>
