<template>
	<LineChartPlaceHolder v-if="!show_shimmer">

	</LineChartPlaceHolder>
	<div  v-else>
		<div style="display: flex; justify-content: center">
			<select id="date_range" class="select-style mb-30 text-center" @change="renderGraph($event.target.value)">
				<option value="15 Minutes">Last 15 Minutes</option>
				<option value="6 Hours">Last 6 Hours</option>
				<option value="24 Hours">Last 24 Hours</option>
				<option value="7 Days">Last 7 Days</option>
				<option value="30 Days">Last 30 Days</option>
				<option value="This Week">This week</option>
			</select>
		</div>

		<div class="graph-card panel-body">

			<canvas id="smsHistoryChart" width="100%" height="100%">
			</canvas>
		</div>
	</div>

</template>

<script>
import Chart from 'chart.js';
import LineChartPlaceHolder from "../LineChartPlaceHolder";
export default {
	name: "SmsHistoryChart",
	components: {LineChartPlaceHolder},
	data() {
		return {
			lineChartData: {},
			show_shimmer: false

		}
	},
	methods: {
		async renderGraph(duration) {

			if (duration) {
				await this.getGraphData(duration);
				this.drawChart();
			} else {
				this.lineChartData = {
					labels: [0, 0, 0, 0],
					datasets: [
						{
							label: 'Delivered',
							borderColor: '#226a4a',
							backgroundColor: '#226a4a',
							fill: false,
							data: [0, 0, 0, 0],
							yAxisID: 'y-axis-1',
						}, {
							label: 'Sent',
							borderColor: '#365899',
							backgroundColor: '#365899',
							fill: false,
							data: [0, 0, 0, 0],
							yAxisID: 'y-axis-1'
						}, {
							label: 'Failed',
							borderColor: '#ffc107',
							backgroundColor: '#ffc107',
							fill: false,
							data: [0, 0, 0, 0],
							yAxisID: 'y-axis-1'
						}, {
							label: 'Rejected',
							borderColor: '#FF0000',
							backgroundColor: '#FF0000',
							fill: false,
							data: [0, 0, 0, 0],
							yAxisID: 'y-axis-1'
						}]
				}

			}
		},
		async getGraphData(duration) {


			try {
				let	 data = await this.$axios.$get('sms/history/analytics', {params: {duration: duration}});
				this.lineChartData = {
					labels: ['Delivered', 'Sent', 'Failed', 'Rejected'],
					datasets: [
						{
							label: 'Delivered',
							borderColor: '#226a4a',
							backgroundColor: '#226a4a',
							fill: false,
							data: data.data.data.message_delivered,
							yAxisID: 'y-axis-1',
						}, {
							label: 'Sent',
							borderColor: '#365899',
							backgroundColor: '#365899',
							fill: false,
							data: data.data.data.message_sent,
							yAxisID: 'y-axis-1'
						}, {
							label: 'Failed',
							borderColor: '#ffc107',
							backgroundColor: '#ffc107',
							fill: false,
							data: data.data.data.message_failed,
							yAxisID: 'y-axis-1'
						}, {
							label: 'Rejected',
							borderColor: '#FF0000',
							backgroundColor: '#FF0000',
							fill: false,
							data: data.data.data.message_dnd_active,
							yAxisID: 'y-axis-1'
						}]

				}
				this.show_shimmer = true;
			} catch (e) {

			}

		},
		drawChart(){
			try {
				let ctx = document.getElementById('smsHistoryChart').getContext('2d');
				window.myLine = Chart.Line(ctx, {
					data: this.lineChartData,
					options: {
						responsive: true,
						// hoverMode: 'index',
						stacked: false,
						title: {
							display: true,
							text: 'Performance of Messages'
						},
						scales: {
							yAxes: [{
								type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
								display: true,
								position: 'left',
								id: 'y-axis-1',
								ticks: {
									beginAtZero: true
								},
								gridLines: {
									drawOnChartArea: false, // only want the grid lines for one axis to show up
								},
							}],
						}
					}
				});
			}catch (e) {

			}

		}
	},
	async mounted() {
		await this.getGraphData();
		this.drawChart();
	}
}
</script>

<style scoped>
.graph-card{
	border-width: 1px;
	border-radius: 8px;
	background-color: white;
	box-shadow: 0 10px 45px 0 rgba(0,0,0,.1);
}
.select-style{
	padding: 10px 10px;
	outline: none;
	border-radius: 8px;
	border-color: #2D74AC;
	color: #2D74AC;
}
</style>
