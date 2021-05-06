<template>
  <div class="mt-30">
    <div class="chart chart-xs">
      <canvas id="chartjs-dashboard-pie" height="200"></canvas>
    </div>
  </div>
</template>

<script>
export default {
name: "DoughnutChart",
	data(){
	 return{
	 	 message_data:'',
			 array_of_doughnut_chart_count:'',
		}
	},
methods:{
	async getChartData(){
		let data = await this.$insight.getChartData();
		this.array_of_doughnut_chart_count = data.data.data.total_count;

	},
  mountPieChart(){
    // Pie chart
			Chart.defaults.global.legend.labels.usePointStyle = true;
    new Chart(document.getElementById("chartjs-dashboard-pie"), {
      type: "pie",
      data: {
							labels: ["Delivered","Sent","Failed","Rejected"],
							datasets: [{
								data: this.array_of_doughnut_chart_count,
								backgroundColor:["#226a4a","#365899","#ffc107","#FF0000"],
								hoverOffset: 4
							}]
      },
      options: {
        responsive: !window.MSInputMethodContext,
        maintainAspectRatio: false,
        cutoutPercentage: 70,
        legend: {
          display: true,
									position: 'left',
									maxHeight: 2,
									maxWidth: 2,
									labels:{
										boxHeight: 5
									}
        },

      }
    });
  }
},
async mounted() {
	 await this.getChartData();
  await this.mountPieChart();

}
}
</script>

<style scoped>

</style>
