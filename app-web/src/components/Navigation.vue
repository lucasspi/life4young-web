<template>
	<div >
		<div class="navigation" :class="{'toggleMenu': is_menu_visible}" id="navigation">

			<a class="closeMenu" @click="onClickToggleNavigation">
				<div class="element">
					<vue-material-icon name="close"></vue-material-icon>
					Fechar
				</div>
			</a>

			<nav class="nav-top">
				<ul>
					<router-link tag="li" to="/">
						<a v-intro="'Sempre que precisar <strong>voltar à tela inicial, é só ir em <u>Início</u>.</strong>'" v-intro-step="1">
							<vue-material-icon name="home"></vue-material-icon>
							Início
						</a>
					</router-link>

					<router-link v-if="$auth.check('view-instagram')" tag="li" to="/instagram">
						<a>
							<vue-material-icon name="timeline"></vue-material-icon>
							Instagram
						</a>
					</router-link>

					<router-link v-if="$auth.check('view-courses')" tag="li" to="/courses">
						<a v-intro="'Para explorar os cursos em nossa plataforma, <strong>é só clicar no menu Treinamentos.</strong>'" v-intro-step="2">
							<vue-material-icon name="local_library"></vue-material-icon>
							Treinamentos
						</a>
					</router-link>

          <router-link v-if="$auth.check('view-courses') && false" tag="li" to="/certificates">
            <a>
              <vue-material-icon name="done_all"></vue-material-icon>
              Certificados
            </a>
          </router-link>

          <router-link v-if="$auth.check('view-groups')" tag="li" to="/groups">
						<a>
							<vue-material-icon name="people"></vue-material-icon>
							Grupos
						</a>
					</router-link>

          <router-link v-if="$auth.check('view-leads')" tag="li" to="/vila">
						<a>
							<vue-material-icon name="trending_up"></vue-material-icon>
							Leads e vendas
						</a>
					</router-link>

          <router-link v-if="$auth.check('view-campaign-lead-total-histories')" tag="li" to="/lead-report">
            <a>
              <vue-material-icon name="store"></vue-material-icon>
              Relatório de leads
            </a>
          </router-link>

          <li v-if="my_courses.length > 0"><div class="is-divider" data-content="CURSOS EM ANDAMENTO"></div></li>

          <router-link v-if="my_courses.length > 0" class="course sidebar-btn" v-for="course in my_courses" :key="course.id" tag="li" :to="`/courses/${course.slug}`">
            <a v-if="img(course, 'avatar')">
              <span class="image is-48x48">
                <img :src="img(course, 'avatar').image_url" :alt="course.name">
              </span>
              <span class="name">
                {{course.name}}
                <progress v-if="course_progress(course) > 0" class="progress is-success" :class="{'is-xsmall': mode == 'card'}" :value="course_progress(course)" max="100">15%</progress>
              </span>

            </a>
          </router-link>

          <li v-if="my_courses_count > navbar_max_courses" class="has-text-centered ">
            <router-link to="/" class="is-size-7 has-text-grey-dark">Ver todos</router-link>
          </li>

          <li v-if="appBrand !== 'socialguider'">
            <div class="is-divider" data-content="CONTATO & SAIR"></div>
          </li>

          <li v-if="$auth.check() && appBrand !== 'socialguider'">
            <router-link to="/contact" v-intro="'Quaisquer dúvidas ou sugestões, <strong>é só clicar aqui para entrar em contato conosco.</strong> Responderemos o mais rápido possível.'" v-intro-step="3">
              <vue-material-icon name="question_answer"></vue-material-icon>
              Fale conosco
            </router-link>
          </li>
          <li v-if="$auth.check()">
            <a @click.prevent="doLogout()" v-intro="'Para sair da sua conta, <strong>é só clicar aqui.</strong>'" v-intro-step="4">
              <vue-material-icon name="undo"></vue-material-icon>
              Sair
            </a>
          </li>

				</ul>
			</nav>

			<nav class="nav-bottom">
				<ul>
				</ul>
			</nav>
		</div>
		<div class="overlay" @click="onClickToggleNavigation"></div>
	</div>
</template>

<script>
import MenuToggle from './MenuToggle.vue'
import { mapState, mapGetters } from 'vuex'

export default {

  name: 'navigation',

  components: {
    MenuToggle
  },

  data () {
    return {
      toggleMenu: true,
      appBrand: process.env.APP_BRAND
    }
  },

  computed: {
    ...mapState(['is_menu_visible']),
    ...mapState('courses', ['loading_my_courses', 'navbar_max_courses']),
    ...mapGetters("metadata", {img: 'getMetadataImage'}),
    ...mapGetters("courses", {my_courses: 'my_4_started_courses', course_progress: "course_progress", my_courses_count: 'my_courses_count'}),
  },

  mounted () {
	    this.$store.dispatch('courses/fetchMyCourses')
  },

	  methods: {
	  	onClickToggleNavigation () {
        this.$store.commit("setMenuVisible", !this.is_menu_visible)
      },
      doLogout() {
        this.$auth.logout({redirect: '/login', makeRequest: false})
        this.$store.dispatch('onesignal/logoutEmail')
      }
	  }
}
</script>

<style lang="scss">
	@import "../assets/mixins.scss";
  $azul: rgba(0,144,247,0.8);
	.overlay {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba($branco, .7);
		z-index: 1;
		display: none;
	}

	.navigation {
		position: fixed;
		z-index: 10;

		@include transition(.4s);

		background-color: $branco;
		box-shadow: inset 0px 0px 16px -3px rgba(0, 0, 0, 0.4);

		top: 0;
		min-width: 15%;
		height: 100vh;

		padding: 60px 0 0;

    .is-divider {
      margin-top: 3rem;
      margin-bottom: 1rem;
    }

		&.toggleMenu + .overlay {
			@media screen and (max-width: 991px) {
				display: block;
			}
		}

    .course {
      a {
        display: flex;
        padding: 0px 4px;
        overflow: hidden;
        .image {
        }
        .name {
          font-size: 12px;
          line-height: 32px;
          margin-left: 10px;
          max-width: 130px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      progress {
        height: 1px;
        width: 100px;
      }

    }

		.closeMenu {
			display: none;
			border: 0;
			background-color: transparent;
			padding: 12px;

			.element {
				display: table;
				border: 1px solid rgba($branco, .3);
				padding: 4px 9px 4px 4px;

				@include border-radius(3px);
				@include transition(.4s);
			}

			&:hover, &:active, &:focus {
				background-color: transparent;
				border: 0;

				.element {
					background-color: $azul;
					border-color: $azul;
				}

			}

			@media screen and (max-width: 991px) {
				display: block;
			}
		}

		svg,
		.material-icon {
			vertical-align: middle;
		}

		svg {
			fill: $branco;
			width: 20px;
			height: auto;
			margin: 0 2px;
		}

		.nav-bottom {
			position: absolute;
			bottom: 20px;
			width: 100%;

			a {
				font-size: 14px;
				padding: 3px 12px;
			}

			@media screen and (max-height: 400px) {
				position: relative;
			}
		}

		.menuToggle {
			display: none;
			@media screen and (max-width: 991px) {
				display: block;
			}
		}

		ul {
			li {
				border-bottom: 1px solid rgba(180, 180, 180, 0.1);
				margin-bottom: 1px;
			}
		}

		.leave {
			border: 0;
			a {
				border: 0;
			}
		}

		a {
			font-size: 16px;
			padding: 7px 12px;
			display: block;
			// border-bottom: 1px solid rgba($preto, .1);
			color: $preto;

			@include transition(.4s);
			@include opacity(.7);

			&:hover {
				background-color: $azul;
				@include opacity(1);
				color: $preto;
      }
      .material-icon {
        margin-right: 15px;
        color: rgba(0, 0, 0, .4);
      }

			&:hover,
			&:focus,
			&:active {
				border-left: 3px solid $branco;
        background-color: $azul;
        color: $branco;
        @include opacity(1);
        .material-icon {
          color: rgba(255, 255, 255, .4);
        }
			}

		}

		@media screen and (min-width: 992px) {
			left: 0;
		}

		&.toggleMenu {
			left: -100%;
		}

    .is-divider {
      $cor: #dbdbdb;
      border-top: 1px solid rgba($cor, .5);
    }

		@media screen and (max-width: 991px) {

			padding: 0;
			position: absolute;
			z-index: 999;
			left: -100%;
			top: 0;
			width: 45vw;
			height: 100vh;

			&.toggleMenu {
				left: 0;
			}

			.nav-top {
				margin: 0;
			}
		}
	}
  .course.sidebar-btn {
    .image {
      border: 1px solid #c3c2c2;
    }
  }
</style>
