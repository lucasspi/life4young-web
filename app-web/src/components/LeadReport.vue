<template>
<div class="">
  <table class="table is-bordered is-striped is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Optins</th>
        <th>Leads</th>
        <th>Atualizado em</th>
        <th>Criado em</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="history in rows" :key="history.id">
        <td>{{history.campaign_affiliate.user.name}}</td>
        <td>{{history.campaign_affiliate.user.email}}</td>
        <td>{{history.optin_count}}</td>
        <td>{{history.leads}}</td>
        <td>{{history.updated_at}}</td>
        <td>{{history.created_at}}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import Chart from './Home/Chart.vue';
import axios from 'axios';
import FirstTeamBadgeIcon from './Icons/FirstTeamBadgeIcon.vue';
import store from '@/store';
import {mapState} from 'vuex';
export default {
  components: {
    Chart, FirstTeamBadgeIcon
  },

  beforeRouteEnter(to, from, next) {
    store.dispatch("histories/fetchHistories").then(
      () => next(vm => vm.startInterval())
    );
  },
  beforeRouteLeave(from, to, next) {
    store.dispatch("histories/stopInterval");
    next();
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapState("histories", ['rows'])
  },

  methods: {
    startInterval() {
      store.dispatch("histories/startInterval");
    }
  }
};
</script>

<style lang="scss">
</style>
