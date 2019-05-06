<template>
  <div>
    <section style="background-color: #f3f3f6" class="section">
      <div class="columns is-mobile content is-vertical-center is-multiline is-centered">
        <div class="column is-12-mobile is-hidden-desktop is-hidden-tablet">
          <figure class="is-square">
            <user-avatar :user="user"></user-avatar>
          </figure>
        </div>
        <div class="column is-6-desktop is-12-mobile" style="padding-top: 30px;">
          <div class="content" style="margin-bottom:1rem;">
            <h2 class="title is-2 has-text-centered-mobile"><strong>{{user.name}}</strong></h2>
            <h3 class="subtitle is-5 has-text-grey has-text-centered-mobile" v-if="user.nickname">{{user.nickname}}</h3>
            <nl2br v-if="user.biography" tag="p" :text="user.biography"></nl2br>
          </div>
          <div class="has-text-centered-mobile">
            <router-link to="/profile/public-settings" v-if="user.id === $auth.user().id" class="button is-small is-white has-icons-left">
              <span class="icon">
                <font-awesome-icon icon="edit"></font-awesome-icon>
              </span>
              <span>Editar seu perfil</span>
            </router-link>
          </div>
        </div>
        <div class="column is-4-desktop is-12-mobile is-hidden-mobile">

          <figure class="is-square">
            <user-avatar :user="user"></user-avatar>
          </figure>
        </div>

        <div class="column is-6-desktop">
          <nav class="level is-mobile">
            <div v-if="user.instagram_username" class="level-item has-text-centered">
              <a :href="`https://instagram.com/${user.instagram_username}`" target="_blank" class="button is-medium is-white has-icons-left">
                <span class="icon">
                  <font-awesome-icon :icon="['fab', 'instagram']"></font-awesome-icon>
                </span>
              </a>
            </div>
            <div v-if="user.twitter_username" class="level-item has-text-centered">
              <a :href="`https://twitter.com/${user.twitter_username}`" target="_blank" class="button is-medium is-white has-icons-left">
                <span class="icon">
                  <font-awesome-icon :icon="['fab', 'twitter']"></font-awesome-icon>
                </span>
              </a>
            </div>
            <div v-if="user.facebook_url" class="level-item has-text-centered">
              <a :href="`${user.facebook_url}`" target="_blank" class="button is-medium is-white has-icons-left">
                <span class="icon">
                  <font-awesome-icon :icon="['fab', 'facebook']"></font-awesome-icon>
                </span>
              </a>
            </div>
            <div v-if="user.linkedin_url" class="level-item has-text-centered">
              <a :href="`${user.linkedin_url}`" target="_blank" class="button is-medium is-white has-icons-left">
                <span class="icon">
                  <font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </section>
    <nav class="level is-mobile profile-metrics" style="margin-top:1rem;">
      <div class="level-item has-text-centered has-text-primary">
        <font-awesome-icon icon="certificate" style="font-size: 25px; color: #3273dc;"></font-awesome-icon>
        <h3 style="margin:0px; text-align:center;" class="is-size-3 title">{{$auth.user().points}}</h3>
        <h3 style="margin:0px; font-size:14px; text-align:center; font-weight: 300;" class="is-size-7">PONTOS</h3>
      </div>
      <div class="level-item has-text-centered has-text-primary">
        <font-awesome-icon icon="graduation-cap" style="font-size: 25px; color: #3273dc;"></font-awesome-icon>
        <h3 style="margin:0px; text-align:center;" class="is-size-3 title">03</h3>
        <h3 style="margin:0px; font-size:14px; text-align:center; font-weight: 300;" class="">CURSOS</h3>
      </div>
      <div class="level-item has-text-centered has-text-primary">
        <font-awesome-icon icon="comment-dots" style="font-size: 25px; color: #3273dc;"></font-awesome-icon>
        <h3 style="margin:0px; text-align:center;" class="is-size-3 title">12</h3>
        <h3 style="margin:0px; font-size:14px; text-align:center; font-weight: 300;" class="">POSTS</h3>
      </div>
      <!-- <div class="level-item has-text-centered">
        <div>
          <p class="heading">Completado por</p>
          <p class="title">789</p>
        </div>
      </div> -->
    </nav>
    <div class="is-centered section is-offset-one-fifth is-three-fifths column">
      <forum-post></forum-post>
      <forum-post></forum-post>
      <forum-post></forum-post>
    </div>
  </div>

</template>

<script>

  import ForumPost from './Community/PostItem'
  import store from '../store'
  import {mapState} from 'vuex'
  import Vue from 'vue'
  import Nl2br from 'vue-nl2br'
  import UserAvatar from './Community/UserAvatar.vue'

  Vue.component('nl2br', Nl2br)

  export default {
    components: {
      ForumPost, UserAvatar
    },
    data(){
      return{

        post: {
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
          nickname: '@nickname',
          data: 'a 3 horas atrás',
          uri: '/static/perfil.png',
        },
        tags:["Revit","Autocad", "Photoshop", "Illustrator", "Lumion", "V-Ray", "SketchUp"],
        filtro: '',
        foto:{
          url: 'https://spirandeli.com.br/wp-content/uploads/2019/03/forum-01.png',
        }
        //tags:[ {titulo: "Revit"},{titulo: "Autocad"}, {titulo: "Photoshop"}, {titulo: "Illustrator"}, {titulo: "Lumion"}, {titulo: "V-Ray"}, {titulo: "SketchUp"}]

      }
    },

    beforeRouteEnter (to, from, next) {
      store.dispatch('users/get', to.params.slug).then(
        () => next(vm => vm.startComponent())
      )
    },
    beforeRouteLeave (from, to, next) {
      store.dispatch('users/get', to.params.slug).then(
        () => next(vm => vm.startComponent())
      )
    },
    computed: {
      ...mapState('users', ['user']),
      postsComFiltro() {

        if (this.filtro) {
          let exp = new RegExp(this.filtro.trim(), 'i');
          return this.post.filter(posts => exp.test(post.content));
        } else {
          return this.post;
        }

      }
    },



  }
</script>

<style lang="scss">
  div#firstSection {
    background-color: #fefefe;
    margin: 20px;
    border-radius: 10px;
    padding:20px;
    width: 35%;
  }
  div#postnickname {
    padding-top: 30px;
  }
  .media {
    -ms-flex-align: start;
    align-items: flex-start;
    display: -ms-flexbox;
    display: flex;
    text-align: left;
  }
  figure.nickname.image {
    width: 40px;
    height: auto;
    margin: 0 auto;
  }
  .media.nickname .media-content {
    padding-left: 15px;
    padding-top: 5px;
  }
  .media-content {
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    text-align: left;
  }



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

  .level.profile-metrics {
    .level-item {
      flex-direction: column;
    }
  }

</style>
