<template>
	<span class="LoggedIn">
    <router-link href="/login" v-if="!$auth.check()" class="navbar-item is-secondary">
      Fazer login
    </router-link>
    <router-link :to="$auth.check() ? '/profile' : '/signup'" class="navbar-item">
      <span v-if="!$auth.check()" class="button signup-button rounded secondary-btn raised">
          Cadastre-se
      </span>
      <span v-else  class="button signup-button rounded secondary-btn raised">
        <vue-material-icon name="account_circle"></vue-material-icon> Meu perfil
      </span>
    </router-link>
	</span>
</template>

<script>
	export default {

		name: 'loggedin',

		data () {
			return {

			}
		}
	}
</script>

<style lang="scss">
	@import '../assets/mixins.scss';

	.LoggedIn {
		span {
			display: inline-block;
			vertical-align: middle;
		}

		.material-icon {

			color: $preto !important;
			font-size: 33px !important;

			@include border-radius(120px);
			@include opacity(.7);
			@include transition(.4s);

			&:hover {
				@include opacity(1);
			}
		}

		.userName {
			font-size: 16px;
		}

		@media screen and (max-width: 940px) {
			.userName {
				display: none;
			}
		}
	}
</style>
