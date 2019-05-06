<template>
  <img class="is-rounded avatar-img" v-if="user && user.avatar && user.avatar.image_url" :src="user.avatar.image_url">
  <img class="is-rounded avatar-img" v-else src="/static/perfil.png">
</template>

<script>
  export default {

    name: 'user-avatar',
    props: ['user'],
    components: {

    },
    data () {
      return {
      }
    },
    computed: {
    },
    filters: {
    },
    methods: {
    }

  }
</script>

<style lang='scss'>
  .avatar-img {
    max-width: 200px;
  }
</style>
