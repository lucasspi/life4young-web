<script>
	// CommitChart.js
	import { Line } from 'vue-chartjs'
	import VueCharts from 'vue-chartjs'

	export default {
	  extends: Line,
	  mounted () {

		this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
		this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

		this.gradient.addColorStop(0, 'rgba(26,69,191, 0.9)')
		this.gradient.addColorStop(0.5, 'rgba(26,69,191, 0.5)');
		this.gradient.addColorStop(1, 'rgba(26,69,191, 0.2)');

	    this.renderChart({
	      labels: ['08 Jul', '09 Jul', '10 Jul', '11 Jul', '12 Jul'],
	      datasets: [
	        {
	          label: 'Leads Gerados',
	          backgroundColor: '#1a45bf',

	          borderColor: '#1a45bf',

	          pointBackgroundColor: 'white',
	          borderWidth: 3,
	          pointBorderColor: 'white',
	          backgroundColor: this.gradient,

	          data: [40, 50, 32, 39, 30],
	          steppedLine: false
	        }
	      ]
	    }, {responsive: true, maintainAspectRatio: false})
	  }
	}
</script>