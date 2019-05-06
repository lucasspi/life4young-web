<template>
  <div class="leads-page">
    <hero-section waves-size="small" not-waves="true" set-classes="is-primary is-bold">
      <div class="container">
        <h1 class="title">
          Leads e vendas
        </h1>
      </div>
    </hero-section>
    <nav class="level">
      <div v-if="old_total_leads_count && total_leads_count" class="level-item has-text-centered has-text-primary">
        <div>
          <p class="heading">Todos membros geraram</p>
          <p class="title"><countTo :startVal='old_total_leads_count' :endVal='total_leads_count' :duration='2000'></countTo></p>
          <p class="heading">leads</p>
        </div>
      </div>
      <div class="level-item has-text-centered has-text-primary">
        <div>
          <p class="heading">Você gerou</p>
          <p class="title">{{ leads_count }}</p>
          <p class="heading">leads</p>
        </div>
      </div>
    </nav>
    <div class="container">
      <!--<dashboard></dashboard>-->
      <p class="has-text-centered is-size-4">Volume total dos lançamentos</p>
      <p class="has-text-centered is-size-7">(Separados por meio de pagamento e status do pedido)</p>
      <div class="columns is-multiline is-centered is-fullwidth" v-if="!loading_order_summary">
        <div class="column is-2" v-for="summary in order_summary">
          <counter-card :classes="{'is-warning': ([transaction_status.WAITING, transaction_status.WAITING_PAYMENT].indexOf(summary.transaction_status_id) !== -1),
                                   'is-success': (transaction_status.PAID === summary.transaction_status_id),
                                   'is-danger': ([transaction_status.CHARGEBACK, transaction_status.DISPUTE, transaction_status.CANCELED, transaction_status.REFUNDED].indexOf(summary.transaction_status_id) !== -1)}"
                        :label="summary.transaction_status.name"
                        :subtitle="summary.payment_method.name"
                        :counter="`R\$ ${format_price(summary.price)}`"
                        :quantity="summary.count"></counter-card>
        </div>
      </div>
      <div class="is-size-5 has-text-centered">
        <p>&nbsp;</p>
        <p>Abaixo você pode conferir todas os pedidos (transações) feitos nesse lançamento.</p>
        <p>&nbsp;</p>
      </div>
      <table class="table is-fullwidth" :class="{'is-loading': loading_orders}">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Data</th>
            <th>Método de Pagamento</th>
            <th>Valor total bruto</th>
            <th>Valor est. da comissão</th>
            <th>Status da transação</th>
            <th>Plano/produto</th>
            <th>Afiliado</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="orders.length > 0" v-for="order in orders">
            <th>{{order.remote_id}}</th>
            <th>{{order.created_at | moment("DD/MM/YYYY")}}</th>
            <th>{{order.payment_method.name}}</th>
            <th>R$ {{ format_price(order.price) }}</th>
            <th>R$ {{ format_price(order.price * 0.25) }}</th>
            <th>
              <span v-if="order.last_transaction" class="last-transaction-status">{{order.last_transaction.transaction_status.name}}</span>
              <span v-else class="order-transaction-status">{{order.transaction_status.name}}</span>
            </th>
            <th>{{order.product.name}}</th>
            <th>
              <span v-if="order.affiliate">{{order.affiliate.name}}</span>
              <span v-else>-</span>
            </th>
          </tr>
          <tr v-else>
            <th colspan="8">
              <div class="content">
                <p class="has-text-centered">
                  Não existem registros de transações no momento.
                </p>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
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

export default {
  components: {
    Chart, FirstTeamBadgeIcon, HeroSection, Dashboard, countTo, CounterCard
  },

  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch('leads/fetchPerDay'),
      store.dispatch('leads/fetchSummary'),
      store.dispatch('leads/fetchAllOrders'),
      store.dispatch('leads/fetchAllOrderSummary')
    ]).then(
      () => next(vm => vm.startInterval())
    )
  },
  beforeRouteLeave (from, to, next) {
    store.dispatch('leads/stopInterval')
    next()
  },

  data () {
    return {
      current_page: 1,
      transaction_status: api.orders.transaction_status
    }
  },

  computed: {
    ...mapState('leads', [
      'leads_count', 'total_leads_count', 'old_total_leads_count',
      'orders', 'orders_last_page', 'loading_orders',
      'order_summary', 'loading_order_summary'
    ]),
    ...mapGetters('order', ['format_price']),
    pages () {
      let pages = []
      for (let page = 1; page <= this.orders_last_page; page++) { pages.push(page) }

      return pages
    }
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
    }
  }
}
</script>

<style lang="scss">

</style>
