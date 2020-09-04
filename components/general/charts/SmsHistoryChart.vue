<template>
    <div class="panel-body text-center">
      <canvas id="smsHistoryChart" width="400" height="200">

      </canvas>
    </div>
</template>

<script>
  import Chart from 'chart.js';
    export default {
        name: "SmsHistoryChart",

      mounted() {
        const ctx = document.getElementById('smsHistoryChart');
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: ["Delivered","Message Sent","DND Active","Failed"],
              datasets: [{"backgroundColor":["#5BC0DE","#30DDBC","#f0ad4e","#D9534F"],"hoverBackgroundColor":["#5BC0DE","#30DDBC","#f0ad4e","#D9534F"],"data":[2009,408325,0,0]}]
            },
            options: {"legend":{"display":true}}
            });
      }
    }
</script>

<style scoped>

</style>
