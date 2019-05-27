<template>
	<div>
		<section>


				<h1>Esteira de Lançamentos</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis porro qui, labore quae itaque facere doloremque maxime odit repellendus, reiciendis perspiciatis. Sit architecto eos, rem mollitia facere. Aperiam, eum vel?</p>


				<div class="tabs">
				  <ul>
				    <li class="is-active"><a>Produtos em Lançamento</a></li>
				    <li><a>Mais Vendidos</a></li>
				  </ul>
				</div>

				<div class="columns">
					<div class="column">
						<product></product>
					</div>

					<div class="column">
						<product></product>
					</div>

					<div class="column">
						<product></product>
					</div>

					<div class="column">
						<product></product>
					</div>
				</div>

				<div class="columns">
					<div class="column">
						<slot></slot>
					</div>

					<div class="column">
						<slot></slot>
					</div>

					<div class="column">
						<slot></slot>
					</div>

					<div class="column">
						<slot></slot>
					</div>
				</div>

		</section>
	</div>
</template>

<script>
	import Product from './Releases/Product.vue'

	import Slot from './Releases/Slot.vue'

	export default {

	  name: 'Releases',

	  components: {
	  	Product,

	  	Slot
	  },

	  data () {
	    return {

	    }
	  }
	}
</script>

<style lang="scss">

</style>
