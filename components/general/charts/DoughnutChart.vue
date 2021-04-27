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
	 	 message_data:''
		}
	},
methods:{
  mountPieChart(){
    // Pie chart
			Chart.defaults.global.legend.labels.usePointStyle = true;
    new Chart(document.getElementById("chartjs-dashboard-pie"), {
      type: "pie",
      data: {
							labels: ["Delivered","Sent","Failed","Rejected"],
							datasets: [{
								label: 'My First Dataset',
								data: [50, 20, 20, 10],
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
mounted() {
  this.mountPieChart();

}
}
</script>

<style scoped>

</style>
