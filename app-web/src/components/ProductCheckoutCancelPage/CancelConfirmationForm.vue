<template>
  <form action="" method="post" @submit.prevent="onSubmitForm">
    <div class="content has-text-centered">
      <p class="is-size-3">Oi, <strong v-if="$auth.user()">{{$auth.user().name}}</strong>!</p>
      <p>Percebemos que você desistiu de concretizar sua assinatura, mas ainda assim queremos que conheça nossa plataforma.</p>
      <p>Quem sabe você não muda de ideia, não é mesmo?</p>
      <button type="submit" class="button is-primary is-fullwidth is-large" :class="{'is-loading': cta_clicked}">Acessar plataforma</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'cancel-confirmation-form',
  data () {
    return {
      cta_clicked: false
    }
  },
  methods: {
    onSubmitForm () {
      this.cta_clicked = true
      this.$emit('confirmed')
    }
  }
}
</script>

<style scoped>

</style>
