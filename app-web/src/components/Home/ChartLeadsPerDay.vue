<script>
	// CommitChart.js
	import { Line } from 'vue-chartjs'
  import VueCharts from 'vue-chartjs'
  import {mapState} from 'vuex'
  import moment from 'moment'

	export default {
    name: 'chart-leads-per-day',
    extends: Line,

    computed: {
      ...mapState("leads", [
        'leads_per_day'
      ])
    },

	  mounted () {

		this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

		this.gradient.addColorStop(0, 'rgba(227, 104, 85, 0.9)')
    this.gradient.addColorStop(1, 'rgba(227, 104, 85, 0.2)');

    let chartLabels = [],
        chartValues = [];
    for (let k in this.leads_per_day) {
      const newDateFormat = moment(k, "YYYY-MM-DD").format('ll');
      chartLabels.push(newDateFormat); // @TODO: Transform this Y-M-d date into something readable
      chartValues.push(this.leads_per_day[k]);
    }

	    this.renderChart({
	      labels: chartLabels,
	      datasets: [
	        {
	          label: 'Qtd. total de leads',
	          backgroundColor: '#e36855',

	          borderColor: '#e36855',

	          pointBackgroundColor: '#e36855',
	          borderWidth: 3,
	          pointBorderColor: '#e36855',
	          backgroundColor: this.gradient,

	          data: chartValues,
	          steppedLine: false
	        }
	      ]
	    }, {responsive: true, maintainAspectRatio: false})
	  }
	}
</script>
