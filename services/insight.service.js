export class InsightService {

	constructor(axios) {

		this.$axios = axios
	}

	calculatePercentageOfPieChart( array_of_message_count, total_message_count){
		let array_of_percentages = [];
		  array_of_message_count.forEach( (count) => {
			 array_of_percentages.push(Math.round((count * 100) /total_message_count))
		 })
  return array_of_percentages
	}

	async getFilteredChartData(duration, channels){
	return 	await this.$axios.$get('sms/history/analytics', {params:
			{
				duration: duration,
				channel:channels
			}, headers:{'Authorization': `Bearer ${localStorage.getItem('local')}`}});
	}
}
