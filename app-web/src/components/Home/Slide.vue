<template>
	<div class="slide">
		<div class="columns is-vcentered">
			<div class="column is-4">
				<img src="../../assets/images/dashboard.png" alt="Dashboard">
			</div>
			<div class="column">
        <h1 v-if="appBrand == 'esteira'"><vue-typer :repeat="0" text="Bem-vindo(a)!" @completed="releasesSubAnimation++"></vue-typer></h1>
				<h1 v-else><vue-typer :repeat="0" text="De arquiteto para arquiteto." @completed="releasesSubAnimation++"></vue-typer></h1>
        <h2 v-if="appBrand == 'esteira'">
          <vue-typer v-if="releasesSubAnimation >= 1" @completed="releasesSubAnimation++" :repeat="0" text="Faça seus projetos saírem do papel"></vue-typer><br />
          <vue-typer v-if="releasesSubAnimation >= 2" :preTypeDelay="1500" :repeat="0" text="E foque no que realmente importa!"></vue-typer>
        </h2>
				<h2 v-else>
          <vue-typer v-if="releasesSubAnimation >= 1" @completed="releasesSubAnimation++" :repeat="0" text="Divulgue seus projetos pelo mundo."></vue-typer><br />
          <vue-typer v-if="releasesSubAnimation >= 2" :preTypeDelay="1500" :repeat="0" text="E foque no que realmente importa!"></vue-typer>
        </h2>
        <h2></h2>
			</div>
		</div>
		<hr>
	</div>
</template>

<script>
	import bulmaCarousel from 'bulma-extensions/bulma-carousel/dist/js/bulma-carousel.min.js';

	export default {

		name: 'slide',

		components: {

		},

		data () {

			return {
        releasesSubAnimation: 0,
        appBrand: process.env.APP_BRAND
			}

		},
		mounted: function() {
			var carousels = bulmaCarousel.attach();
		}
	}
</script>

<style lang="scss">
	@import './../../assets/mixins.scss';

	.slide {
		position: relative;
		background: url(./../../assets/images/fundo-slide.jpg) top center no-repeat;
		background-color: #092333;
		background-size: cover;
		color: $branco;
		@include border-radius(7px);

		@media screen and (max-width: 692px) {
			h1, h2 {
				margin: 24px 24px 0 !important;
			}
    }
    .vue-typer { .custom.char, .custom.caret {color: #FFF } }

		strong {
			color: $branco;
		}

		h1 {
			margin: 0 0 14px;
			font-size: 38px;
		}

		h2 {
			margin: 0 0 24px;
			font-weight: $light;
			strong {
				font-weight: $regular;
			}
		}
	}
</style>
