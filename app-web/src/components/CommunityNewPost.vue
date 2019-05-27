<template>
<div>
  <initial-section></initial-section>

  <form action="" method="post" @submit.prevent="onSubmitNewPostForm">
    <div class="is-centered section is-offset-one-fifth is-three-fifths column is-12-mobile">
      <h2 class="title">Sobre o que você quer falar?</h2>

      <div class="field">
        <div class="control">
          <form-control :form="form" name="tag" label="Assunto:">
            <div class="select is-fullwidth">
              <select name="tag" v-model="form.tag">
                <option value="">Selecione pelo menos uma</option>
                <option v-for="tag in tags" :value="tag.id">{{tag.name}}</option>
              </select>
            </div>
          </form-control>
        </div>
      </div>

      <div class="field">
        <form-control :form="form" name="text" label="Seu post">
          <textarea class="textarea" v-model="form.text" placeholder="Digite aqui o conteúdo do seu post"></textarea>
        </form-control>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" :class="{'is-loading': form.sendingData}">Postar</button>
        </div>
        <div class="control">
          <router-link to="/community" class="button is-text">Voltar</router-link>
        </div>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import InitialSection from './Community/InitialSection'
import FormControl from './Form/FormControl.vue'
import {mapState} from 'vuex'
import store from '../store'
import api from '../api'

export default {
  name: 'community-new-post',

  components: {
    InitialSection, FormControl,
  },

  data () {
    return {
      form: api.community.posts.createForm()
    }
  },

  beforeRouteEnter (to, from, next) {
    store.dispatch('community/fetchAllTags')
      .then(() => next(vm => {}))
  },
  beforeRouteUpdate (to, from, next) {
    store.dispatch('community/fetchAllTags')
      .then(() => next(vm => {}))
  },

  computed: {
    ...mapState('community', ['tags', 'loading_tags']),
  },

  methods: {
    onSubmitNewPostForm() {
      this.form.post(api.community.posts._create()).then(
        (responseData) => {
          const post = responseData.data;
          this.$router.push(`/community/posts/${post.slug}`)
        }
      )
    }
  }



}
</script>

<style>
#previousPage{
    background-color: #f3f3f6;
    padding-top: 15px;
    padding-bottom: 15px;

}
@media only screen and (min-width: 48em){
.Breadcrumbs {
    padding: 1em 0;
}
}

.u-row-wrapper {
    max-width: 1024px;
    margin: 0 auto !important;
}
.Breadcrumbs-link {
    font-size: 14px;
    font-weight: bold;
    color: #0791e6;
    text-decoration: none;
    padding-left: 20px;
}
</style>
