<template>
  <div class="leads-page">
    <hero-section not-waves="true" set-classes="is-bold">
      <div class="container">
        <h1 class="title">
          Trilhas e cursos disponíveis para trocar
        </h1>
      </div>
    </hero-section>
    <div class="container"><br>
      <div class="level-item has-text-centered has-text-primary">
        <div>
          <p class="heading">Você possui</p>
          <p class="title">{{$auth.user().points}}</p>
          <p class="heading">pontos</p>
        </div>
      </div>

      <p class="has-text-centered is-size-4">Troque pontos por cursos</p>

      <div class="table__wrapper">
        <table class="table is-fullwidth" :class="{'is-loading': loading_orders}">
          <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Valor em Pontos</th>
            <th>Realizar Troca</th>
          </tr>
          </thead>

          <tbody>
          <tr v-if="courses.length > 0" v-for="course in courses">
            <th>{{course.name}}</th>
            <th>{{course.description}}</th>
            <th>{{course.points}}</th>
            <th>
              <a class="button is-success" v-if="user_courses.findIndex((item) => item.course_id === course.id) === -1" @click="swapPoints(course.id)">
                Trocar
              </a>
              <span v-else>
                Você já possui este curso
              </span>
            </th>
          </tr>
          <tr v-else>
            <th colspan="8">
              <div class="content">
                <p class="has-text-centered">
                  Você não tem saldo suficiente para resgatar esse curso
                </p>
              </div>
            </th>
          </tr>
          </tbody>
        </table><br>
      </div>
      <nav class="pagination" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
          <li v-for="page in pages">
            <a class="pagination-link" :class="{'is-current': page === current_page}" @click.prevent="setPage(page)">{{page}}</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import Chart from './Home/Chart.vue'
import FirstTeamBadgeIcon from './Icons/FirstTeamBadgeIcon.vue'
import store from '@/store'
import {mapState, mapGetters} from 'vuex'
import Dashboard from './Home/Dashboard.vue'
import HeroSection from './HeroSection.vue'
import countTo from 'vue-count-to'
import CounterCard from './Leads/CounterCard.vue'
import api from '../api'
import axios from 'axios'
import {handleApiErrors} from '../helpers'

export default {
  components: {
    Chart, FirstTeamBadgeIcon, HeroSection, Dashboard, countTo, CounterCard
  },

  beforeRouteEnter (to, from, next) {
    Promise.all([
      axios.get('courses/per-points'),
      axios.get('courses/list-user-courses')
    ]).then((responses) => {
      next(vm => {
        vm.setCourses(responses[0].data.data)
        vm.setUserCourses(responses[1].data.data)
      })
    })
  },
  beforeRouteLeave (from, to, next) {
    next()
  },

  data () {
    return {
      current_page: 1,
      transaction_status: api.orders.transaction_status,
      comission_rate: 0.25,
      courses: [],
      user_courses: []
    }
  },

  computed: {
  },

  methods: {
    startInterval () {
      store.dispatch('leads/startInterval')
    },

    setPage (page) {
      if (page > this.orders_last_page) { page = this.orders_last_page }
      store.dispatch('leads/fetchAllOrders', page).then(
        () => { this.current_page = page }
      )
    },

    swapPoints (course_id) {
      axios.post('courses/swap-points', {course_id}).then(
        () => {
          this.$swal('Troca realizada com sucesso!!!')
          axios.get('courses/list-user-courses').then((response) => this.user_courses = response.data.data)
          this.$auth.fetch()
        },
        (err) => {
          this.$swal({
            type: 'error',
            title: this.$t('payment-form.errors.title'),
            html: this.$t('Você não tem pontos suficiente para trocar neste curso', {msg: handleApiErrors(err.response)})
          })
        }
      )
    },

    setCourses (courses) {
      this.courses = courses
    },

    setUserCourses (userCourses) {
      this.user_courses = userCourses
    }

  }
}
</script>

<style lang="scss">
</style>
