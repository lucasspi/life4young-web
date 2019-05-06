<template>
	<div>
		<div class="level is-mobile">
			<div class="toggleResponsive level-left">
				<MenuToggle></MenuToggle>
			</div>

			<div class="level-left">
				<logo></logo>
			</div>

			<div class="level-right">
				<LoggedIn></LoggedIn>
			</div>
		</div>		
	</div>
</template>

<script>	
	import Logo from './Logo.vue'
	import MenuToggle from './MenuToggle.vue'
	import LoggedIn from './LoggedIn.vue'
	
	export default {

		name: 'mind',

		components: {
			Logo,
			MenuToggle,
			LoggedIn
		},

		data() {
			return {
	        	// toggleMenu: true
	        }
	    },

		// methods: {
		// 	onCLickToggleMenu() {
		// 		this.toggleMenu = !this.toggleMenu;
		// 	}
		// } 
	}
</script>

<style lang="scss">
	@import '../assets/mixins.scss';

	.toggleResponsive {
		a {

			@include opacity(.7);
			@include transition(.4s);

			&:hover {
				@include opacity(1);
			}

			.material-icon {
				color: $branco !important;	
				@include transition(.4);
			}			
		}

	}
	
</style>