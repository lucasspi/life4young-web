<template>
  <div class="home-mensal">
    <div class="container">
      <div class="columns is-vcentered">
        <div  class="column is-5 is-offset-1 landing-caption">
          <h1 class="title is-1 is-bold is-spaced" style="color: white;">
            LIFE4YOUNG
          </h1>
          <h2 class="subtitle is-5 is-muted " style="color: white;">
            Uma plataforma global feita para escutar e solucionar as dores mais latentes dos jovens das igrejas.
          </h2>
          <p  v-if="!$auth.check() || !is_user_subscribed_on_recurring_plan">
            <router-link to="/p/escola/plano-mensal/checkout" class="button cta primary-btn rounded is-danger raised">
              JUNTE-SE A NÓS
            </router-link>
          </p>
          <div v-if="$auth.check() && is_user_subscribed_on_recurring_plan">
            <p>
              <router-link to="/dashboard" class="button cta rounded is-danger raised">
                Aprender agora
              </router-link>
            </p>
            <p class="is-size-7 sm-course-list">
              Cursos disponíveis em sua assinatura:
              <span v-for="course in my_available_courses"><router-link  :to="`/courses/${course.slug}`">{{course.name}}</router-link></span>
            </p>
          </div>
        </div>
        <div class="column is-5 is-offset-1">
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'home-mensal',

    components: {
    },

    data () {
      return {
      }
    },

    computed: {
      ...mapGetters('subscriptions', ['is_user_subscribed_on_recurring_plan', 'my_available_courses'])
    },

    methods: {

    }
  }
</script>

<style lang="scss">
  .home-mensal {
    background-color: #e2e2e2;
    background-image: url(/static/student.jpg);
    position: relative;
    > * {
      z-index: 10;
    }
    &::after {
      background-color: rgba(72, 72, 72, 0.54);
      content: ' ';
      position: absolute;
      left: 0;
      z-index: 1;
      top: 0;
      bottom: 0;
      right: 0;
    }
    .sm-course-list {
      span {
        &::after {
          content: ', ';
        }
        &:last-child {
          &::after {
            content: '.';
          }
        }
      }
    }
  }
</style>
