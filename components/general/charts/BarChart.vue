<script>

import { Bar } from 'vue-chartjs'
import {mixins} from "vue-chartjs"
const { reactiveProp } = mixins
export default {
	extends: Bar,
	mixins: [reactiveProp],
	watch: {
		chartData() {
			this.$data._chart.update()
		},
	},
	props: {
		chartData: {
			type: Object,
			default: null
		},
		options: {
			type: Object,
			default: null
		}
	},
	mounted () {
		this.renderChart(this.chartData, this.options)
	}
}
</script>

<style scoped>

</style>
