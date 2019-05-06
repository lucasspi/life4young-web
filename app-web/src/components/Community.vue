<template>
  <div>

    <section class="hero is-medium is-info">
      <div class="hero-body ">
          <div class="columns container is-vertical-center">
          <div class="column is-offset-1 is-6-desktop is-12-mobile">
            <h1 style="color:white;" class="title is-1">Comunidade Escola de Arquitetos</h1>
            <h3 style="color:white;" class="subname is-8">
                Esta é a nossa comunidade onde você pode buscar por posts, criar novos itens e interagir com outras pessoas.
            </h3>
            <div id="search" class="box">
              <div class="field is-grouped">
                <p class="control is-expanded">
                    <input class="input filtro" type="search" :value="query_params.text" @input="onChangeSearchTerm"  placeholder="Digite aqui.">
                  <!--@TODO: Add search icon!!-->
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


		<section class="container section ">
			<div class="columns ">
				<div class="column is-3-desktop is-12-mobile">
					<router-link class="button is-primary is-block is-alt is-large" to="/community/new-post">Novo Post</router-link>
					<aside class="menu">
						<p class="menu-label">
							Tags
						</p>
						<ul class="menu-list" >
							<li v-for="tag in tags" v-bind:key="tag.name" ><router-link :to="`/community?tag=${tag.slug}`" :style="'line-height:1.2; background-color: '+ tag.color_hex" class="listDetails button is-block is-alt tag is-primary is-medium"  >{{tag.name}}</router-link></li>
						</ul>
					</aside>
				</div>
        <div class="is-centered section is-offset-one-fifth-desktop is-three-fifths-desktop is-12-mobile column" style="margin: 0px; padding-top: 0px;">
          <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
            <ul>
              <li v-if="filtering_by_hashtag"><router-link to="/community">Todas as tags</router-link></li>
              <li v-if="filtering_by_hashtag">
                <router-link :to="`/community?tag=${filtering_by_hashtag.slug}`">
                  {{filtering_by_hashtag.name}}
                </router-link>
              </li>
              <li v-if="filtering_by_text"><router-link to="/community">Todos os posts</router-link></li>
              <li v-if="filtering_by_text">
                <router-link :to="`/community?text=${filtering_by_text}`">
                  Buscando por: {{filtering_by_text}}
                </router-link>
              </li>


            </ul>
          </nav>
          <div class="has-text-centered" v-if="loading_posts || loading_tags">
            <button class="button is-loading is-large is-white"></button>
          </div>
          <post-item v-for="post in posts" v-bind:key="post.id" :post="post"></post-item>


        </div>
			</div>
		</section>

</div>

</template>

<script>
import store from '../store'
import {mapState, mapActions, mapGetters} from 'vuex'
import PostItem from './Community/PostItem'
export default {
  components: {
    PostItem
  },
  data(){
    return{
      filtro: '',
      foto: { url: ''}
    }
  },

  beforeRouteEnter (to, from, next) {
    const queryParams = {
      tag: to.query.hasOwnProperty('tag') ? to.query.tag : null,
      page: to.query.hasOwnProperty('page') ? to.query.page : null,
      text: to.query.hasOwnProperty('text') ? to.query.text : null
    }

    store.dispatch('community/fetchBasicData', queryParams)
      .then(() => next(vm => {}))
  },
  beforeRouteUpdate (to, from, next) {
    const queryParams = {
      tag: to.query.hasOwnProperty('tag') ? to.query.tag : null,
      page: to.query.hasOwnProperty('page') ? to.query.page : null,
      text: to.query.hasOwnProperty('text') ? to.query.text : null
    }

    store.dispatch('community/fetchBasicData', queryParams)
      .then(() => next(vm => {}))
  },

  computed: {

    ...mapState('community', ['posts', 'loading_posts', 'tags', 'loading_tags', 'query_params']),
    ...mapGetters('community', ['filtering_by_hashtag', 'filtering_by_text']),

  },

  methods: {
    onChangeSearchTerm(e) {
      console.log('Search: ', e)
      this.$store.dispatch('community/cancelAllRequests');
      this.$router.replace({
        path: '/community',
        query: {
          ...this.query_params,
          ...{text: e.target.value},
          ...{tag: null}
        }
      })
    }
  }



}
</script>

<style>
.is-vertical-center {
  display: flex;
  align-items: center;
}
.centerText {
  line-height: 1.5;
  display: inline-block;
  vertical-align: middle;
}
.centerImage{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}

.listDetails{
  padding:3px;
  text-align: left;
}

a.listDetails {
    border-radius: 0px;
    border-color: transparent;
    border-width: 0px;
}

aside.menu {
    padding-top: 3rem;
}
aside.menu .menu-list {
    line-height: 1.5;
}
button.is-primary.is-alt {
    background: #00c6ff;
    background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
    background: linear-gradient(to bottom, #0072ff, #00c6ff);
    font-weight: 700;
    font-size: 14px;
    height: 3rem;
    line-height: 2.8;
}
#search{
  background-color:  rgba(255, 255, 255, 0.1);
  border-color: transparent;
}
.menu-list li {
    padding: 0px;
}
article.post {
    margin: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #E6EAEE;
}
.hero.is-info {
    background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://unsplash.it/1200/900?random) no-repeat center center fixed;
    background-size: cover;
}
.column {
  width: 50%;
}
</style>
