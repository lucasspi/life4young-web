<template>
	<div class="menuToggle">
		<a :class="is_menu_visible ? 'open' : 'open closed'" @click="onClickToggleNavigation" href="#">
			<ul>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</a>
	</div>
</template>

<script>
  import { mapState } from 'vuex'

export default {

  name: 'MenuToggle',

  data () {
    return {
    	is_active: false
    }
  },
  computed: {
    ...mapState(["is_menu_visible"])
  },
  methods: {
  	onClickToggleNavigation() {
  	  this.$store.commit("setMenuVisible", !this.is_menu_visible)
  	}
  }
}
</script>

<style lang="scss">

	@import '../assets/mixins.scss';

	.menuToggle {
		@include opacity(.7)

		a:hover {
			ul {
				li {
					&:first-child {
						top: 5px;
					}

					&:last-child {
						top: 19px;
					}
				}
			}
		}

		a.closed {
			ul {
				li {

					&:first-child {
						@include rotate(-45deg);
						top: 12px;
					}

					&:last-child {
						@include rotate(45deg);
						top: 12px;
					}

					&:nth-child(2) {
						@include opacity(0);
					}
				}
			}
		}

		a {
			ul {
				position: relative;
				display: block;
				width: 25px;
				height: 25px;

				li {
					display: block;
					content: " ";
					width: 100%;
					height: 2px;
					background-color: $preto;


					@include opacity(1);
					@include transition(.2s);

					position: absolute;
					left: 0;
					right: 0;
					margin: auto;

					&:first-child {
						top: 3px;
					}

					&:nth-child(2) {
						top: 12px;
					}

					&:last-child {
						top: 21px;
					}
				}
			}
		}
	}
</style>
