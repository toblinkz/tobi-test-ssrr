<template>
  <div class="mt-30">
			<ContentLoader  v-if="!array_of_doughnut_chart_count">
				<rect x="100" y="5" rx="0" ry="0" width="200" height="15" />
				<circle cx="140" cy="110" r="70" />
				<rect x="230" y="50" rx="0" ry="0" width="7" height="7" />
				<rect x="250" y="50" rx="0" ry="0" width="30" height="7" />
				<rect x="230" y="64" rx="0" ry="0" width="7" height="7" />
				<rect x="250" y="64" rx="0" ry="0" width="30" height="7" />
				<rect x="230" y="78" rx="0" ry="0" width="7" height="7" />
				<rect x="250" y="78" rx="0" ry="0" width="30" height="7" />
				<rect x="230" y="92" rx="0" ry="0" width="7" height="7" />
				<rect x="250" y="92" rx="0" ry="0" width="30" height="7" />
			</ContentLoader>
    <div v-else class="chart chart-xs">
      <canvas id="chartjs-dashboard-pie" height="200"></canvas>
    </div>
  </div>
</template>

<script>
import {
	ContentLoader,

} from 'vue-content-loader'
export default {
name: "DoughnutChart",
	components:{ ContentLoader},
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
