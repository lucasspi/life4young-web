<template>
  <div>
    <initial-section></initial-section>
    <div class="is-centered container community-post">
      <div class="columns displayNoneMobile displayNoneIpad displayNoneIpad3 displayNoneIpad4">
        <div class="column is-1-desktop">
          <div class="box has-text-centered post-updated-at" style="padding: 0.2rem 0.75rem;">
            <div class="is-size-3">{{post.updated_at | moment("DD")}}</div>
            <div class="is-size-5 is-uppercase">{{post.updated_at | moment("MMM")}}</div>
            <div class="is-size-7">{{post.updated_at | moment("HH:MM")}}</div>
          </div>
          <div class="field is-vertical has-addons ">
            <p class="control">
              <button @click="onClickLikeButton()" class="button is-light" :class="{'is-loading': is_liking_this_post}">
                <span class="icon is-size-4"><font-awesome-icon icon="thumbs-up"></font-awesome-icon></span>
                <span class="is-size-7">{{post_likes_count}}</span>
              </button>
            </p>
            <p class="control">
              <a  :href="`/community/posts/${post.slug}`" @click.prevent="onClickCommentsButton()" class="button is-light">
                <span class="icon is-size-4"><font-awesome-icon icon="comments"></font-awesome-icon></span>
                <span class="is-size-7">{{post_comments_count}}</span>
              </a>
            </p>
          </div>
        </div>
        <div class="column">
          <div class="content">
            <nl2br tag="p" :text="post.text"></nl2br>
          </div>
        </div>
      </div>

      <div class="displayNoneDesktop">
        <div class=" column is-12-mobile box has-text-centered post-updated-at" style="padding: 0.2rem 0.75rem;">
          <div class="is-size-3">{{post.updated_at | moment("DD")}}</div>
          <div class="is-size-5 is-uppercase">{{post.updated_at | moment("MMM")}}</div>
          <div class="is-size-7">{{post.updated_at | moment("HH:MM")}}</div>
        </div>
        <div class="columns is-mobile">
          <div class="column is-6-mobile field is-vertical has-addons">
            <p class="control">
              <button @click="onClickLikeButton()" class="button is-light" :class="{'is-loading': is_liking_this_post}">
                <span class="icon is-size-4"><font-awesome-icon icon="thumbs-up"></font-awesome-icon></span>
                <span class="is-size-7">{{post_likes_count}}</span>
              </button>
            </p>
          </div>
          <div class="column is-6-mobile field is-vertical has-addons">
             <p class="control">
              <a  :href="`/community/posts/${post.slug}`" @click.prevent="onClickCommentsButton()" class="button is-light">
                <span class="icon is-size-4"><font-awesome-icon icon="comments"></font-awesome-icon></span>
                <span class="is-size-7">{{post_comments_count}}</span>
              </a>
            </p>
          </div>
        </div>
        <div class="column ">
          <div class="content">
            <nl2br tag="p" :text="post.text"></nl2br>
          </div>
        </div>
      </div>



      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <router-link v-for="tag in post.tags" :to="`/community?tag=${tag.slug}`"><p  class="post-tag" :style="`font-size:13px; margin-left:30px; background-color: ${tag.color_hex}`">{{tag.name}}</p></router-link>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <router-link tag="div" :to="`/profiles/${post.public_user.nickname || post.public_user.id}`" class="button avatar is-light">
              <div class="media nickname is-centered content">
                <figure class="media-left image nickname">
                  <img class="is-rounded" v-if="post.public_user && post.public_user.avatar && post.public_user.avatar.image_url" :src="post.public_user.avatar.image_url">
                  <img class="is-rounded" v-else src="http://bulma.io/images/placeholders/128x128.png">
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>{{post.public_user.nickname || post.public_user.name}}</strong><br />
                      <small>{{post.public_user.points}} pts</small>
                    </p>
                  </div>
                </div>
                <!--<p v-for="tag in post.tags" v-bind:key="tag.id" class="post-tag" :style="`font-size:12px; margin-right:30px; background-color: ${tag.color_hex};`">{{tag.name}}</p>-->


              </div>
            </router-link>



          </div>
        </div>
      </nav>

      <form v-if="commentForm" id="comments_form" action="" method="post" @submit.prevent="onSubmitCommentForm">
        <div class="field">
          <form-control :form="commentForm" name="body" label="Deixe seu comentário">
            <textarea class="textarea" id="comment_body" name="body" v-model="commentForm.body" placeholder="Digite aqui o conteúdo do seu comentário"></textarea>
          </form-control>
        </div>

        <button type="submit" class="button is-primary is-fullwidth" :class="{'is-loading': commentForm.sendingData}">Comentar</button>
      </form>
      <div class="is-divider"></div>
      <comment-list></comment-list>
    </div>
  </div>
</template>

<script>
import store from '../store'
import InitialSection from './Community/InitialSection'
import CommentList from './CommunityPost/CommentList.vue'
import FormControl from './Form/FormControl.vue'
import {mapState, mapGetters} from 'vuex'
import api from '../api'
import Vue from 'vue'
import Nl2br from 'vue-nl2br'

Vue.component('nl2br', Nl2br)

export default {
  components: {
    InitialSection,
    CommentList,
    FormControl
  },

  data () {
    return {
      is_liking_this_post: false,
      commentsApi: null,
      commentForm: null
    }
  },

  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch('community/fetchPost', to.params.slug),
      store.dispatch('community/fetchPostComments', to.params.slug)
    ]).then(() => next(vm => { vm.startComponent() }))
  },

  beforeRouteUpdate (to, from, next) {
    Promise.all([
      store.dispatch('community/fetchPost', to.params.slug),
      store.dispatch('community/fetchPostComments', to.params.slug)
    ]).then(() => next(vm => { this.startComponent() }))
  },

  computed: {
    ...mapState('community', ['post', 'loading_post']),
    post_comments_count() {
      if (this.post.comments_count) {
        return this.post.comments_count.total;
      }
      return 0;
    },
    post_likes_count() {
      if (this.post.likes_count) {
        return this.post.likes_count.total;
      }
      return 0;
    }
  },

  methods: {
    startComponent() {
      this.commentsApi = api.community.posts.comments(this.post.id);
      this.commentForm = this.commentsApi.createForm()
    },
    async onSubmitCommentForm() {
      await this.commentForm.post(this.commentsApi._create());
      this.commentForm.sendingData = true;
      await store.dispatch('community/fetchPost', this.post.slug);
      await store.dispatch('community/fetchPostComments', this.post.slug);
      this.commentForm.sendingData = false;
    },
    async onClickLikeButton() {
      this.is_liking_this_post = true;
      await this.$store.dispatch('community/togglePostLike', {post: this.post.slug, queryParams: null})
      this.is_liking_this_post = false;
    },
    onClickCommentsButton() {
      this.$scrollTo(document.getElementById('comments_form'));
      document.getElementById('comment_body').focus();
    }
  }
}
</script>

<style lang="scss">
/**********
iPad 3
**********/
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) and (-webkit-min-device-pixel-ratio : 2) {
  .displayNoneIpad3{
    display: none;
  }
}
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) and (-webkit-min-device-pixel-ratio : 2) {
  .displayNoneIpad3{
    display: none;
  }
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
  .displayNoneIpad{
    display: none;
  }
}
/* Desktops and laptops ----------- */
@media only screen  and (min-width : 1224px) {
  .displayNoneDesktop{
    display: none;
  }
}
/* Desktops and laptops ----------- */
@media only screen  and (min-width : 1024px) {
  .displayNoneLaptop{
    display: none;
  }
}
/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  .displayNoneMobile{
    display: none;
  }
}

  .community-post {
    margin-top: 30px;
    .post-updated-at {
      > *:first-child {
        line-height: 30px;
      }
    }
  }
p.post-tag {
    background-color: #09449c;
    padding-right: 6px;
    padding-left: 6px;
    color: white;
    border-radius: 23px;
}
.button.avatar {
  height: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  > .columns > .column {
    padding: 0.5rem 0.75rem;
  }
}

#post{

  padding-bottom: 20px;
  margin-top: 5px;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding-right: 20px;
  padding-left: 20px;
}
.item{
  margin-top:30px;
}
.item label{
  display: inline;
  padding:10px;
  background-color: #3273dc;
  font-size:16px;
  color:white;
  border-radius: 3px;

}
.item label:hover{

  padding:10px;
  background-color: #f2673a;
  font-size:16px;
  color:white;
  border-radius: 3px;
  transition: all .2s linear;

}
.item ul{
  width:100%;
  list-style: none;
  overflow: hidden;
  max-height: 0 ;
  transition: all .4s linear;
  margin-top: 15px;

}
.item ul li a{
  width:100%;
  height:200px;
  padding:10px;
  display:block;
  text-decoration: none;
  background-color: #fafafa;
}
.item input:checked ~ label{
  display: none;
}
.item input:checked ~ ul{
height: auto;
max-height: 200px;
transform: all;
}
.item input{
  display: none;
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
    width: 60px;
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
.image img {
    display: block;
    height: auto;
    width: 100%;
}

.field.has-addons.is-vertical {
  flex-direction: column;
  .control .button {
    display: flex;
    flex-direction: column;
    height: auto;
    margin: 0 auto;
    width: 100%;
    padding: 10px 0;
    span.icon {
      margin: 5px auto;
    }
  }
  .control:first-child .button {
    border-top-right-radius: 4px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .control:not(:last-child) {
    margin: 0;
  }
  .control:last-child .button {
    border-top-right-radius: 0;
    border-bottom-left-radius: 4px;
  }
}

</style>
