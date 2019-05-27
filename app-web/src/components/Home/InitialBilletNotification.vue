<template>
  <div class="notification is-warning" v-if="initial_pending_billet">
    <p class="has-text-justified">
      <font-awesome-icon icon="exclamation-triangle"></font-awesome-icon>
      <strong>
        Falta apenas um passo para você garantir seu acesso às aulas: realizar o pagamento do boleto até o dia
        {{ initial_pending_billet.billet_expires_at | moment("DD/MM/YYYY")}}.
      </strong>
      Caso já tenha sido pago, por favor, ignore essa mensagem (ela irá sumir automaticamente).
    </p>
    <p class="has-text-centered">
      <a :href="initial_pending_billet.billet_url" target="_blank" class="button is-primary has-icons-left">
        <span class="icon">
          <font-awesome-icon icon="barcode"></font-awesome-icon>
        </span>
        <span>Clique aqui para visualizar seu boleto bancário.</span>
      </a>
    </p>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    components: {
    },

    data () {
      return {
      }
    },

    computed: {
      ...mapGetters('subscriptions', ['initial_pending_billet'])
    },

    methods: {
    }
  }
</script>

<style lang="scss">

</style>
