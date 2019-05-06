<template>
	<div class="dashboard">
		<div class="columns is-centered">
			<div class="column is-9 box">
        <h3 class="title has-text-centered">
          {{$t('dashboard.label-total')}}
        </h3>
        <chart-leads-per-day></chart-leads-per-day>
			</div>
		</div>
	</div>
</template>

<script>

	import News from './News.vue';
  import ChartLeadsPerDay from './ChartLeadsPerDay.vue';
  import {mapState} from 'vuex';
  import countTo from 'vue-count-to';

	export default {

		name: 'dashboard',

		components: {
			News,
      ChartLeadsPerDay,
      countTo
    },

    computed: {
      ...mapState("leads", [
        'leads_count',
        'total_leads_count',
        'old_total_leads_count'
      ])
    }
	}
</script>

<style lang="scss">

	@import '../../assets/mixins.scss';

	.dashboard {
    position: relative;
    h3 {
      font-size: 18px;
    }
		h2 {
			margin: 0 0 24px;
			.material-icon {
				vertical-align: middle;
				color: $azul;
			}
		}
	}
</style>
