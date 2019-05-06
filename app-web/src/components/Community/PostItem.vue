<template>

  <div id="post" class="post-item" v-if="post">

    <div id="postnickname" class="media nickname content" style="margin-bottom: 15px;">
      <router-link style="color:#4a4a4a" :to="`/profiles/${post.public_user.nickname || post.public_user.id}`">
        <figure class="media-left image nickname ">
          <img class="is-rounded" v-if="post.public_user && post.public_user.avatar && post.public_user.avatar.image_url" :src="post.public_user.avatar.image_url">
          <img class="is-rounded" v-else src="http://bulma.io/images/placeholders/128x128.png">
        </figure>
      </router-link>
      <div class="media-content">
        <div class="content" style="margin-bottom:0px;">
            <router-link :to="`/profiles/${post.public_user.nickname || post.public_user.id}`" ><strong>{{post.public_user.nickname || post.public_user.name}}</strong></router-link>
        </div>
        <router-link :to="`/profiles/${post.public_user.nickname || post.public_user.id}`"><p style="font-size:12px; color:#4a4a4a;">{{post.public_user.points}} pontos </p></router-link>
      </div>

      <p style="font-size:12px;" :title="post.updated_at">{{post.updated_at | fromNow}}</p>
    </div>
    <div>
      <router-link :to="`/community/posts/${post.slug}`" class="is-size-6">
        <p class="post-content">
          {{post.text}}
        </p>
      </router-link>
    </div>

    <div class="item" >
        <div id="search">
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <div class="field has-addons">
                  <p class="control">
                    <button @click="onClickLikeButton()" class="button is-white btn-like" :class="{'is-loading': is_liking_this_post, 'is-liked': post.current_user_like}">
                      <span class="icon is-small"><font-awesome-icon icon="thumbs-up"></font-awesome-icon></span>
                      <span>{{post_likes_count}}</span>
                    </button>
                  </p>
                  <p class="control">
                    <router-link  :to="`/community/posts/${post.slug}`" class="button is-white">
                      <span class="icon is-small"><font-awesome-icon icon="comments"></font-awesome-icon></span>
                      <span>{{post_comments_count}}</span>
                    </router-link>
                  </p>
                </div>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <router-link v-for="tag in post.tags" :to="`/community?tag=${tag.slug}`"><p  class="post-tag" :style="`font-size:13px; margin-left:30px; background-color: ${tag.color_hex}`">{{tag.name}}</p></router-link>
              </div>
            </div>
          </nav>

        </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import Nl2br from 'vue-nl2br'

Vue.component('nl2br', Nl2br)
export default {

  name: 'post-item',
  props: ['active', 'post'],
  components: {

  },
  data () {
    return {
      is_liking_this_post: false,
    }
  },
  computed: {
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
  filters: {
    fromNow(date) {
      return moment(date).fromNow();
    }
  },
  methods: {
    async onClickLikeButton() {
      this.is_liking_this_post = true;
      await this.$store.dispatch('community/togglePostLike', {post: this.post.slug, queryParams: null})
      this.is_liking_this_post = false;
    }
  }

}
</script>

<style lang='scss'>
  @import "../../assets/mixins.scss";

p.post-tag {
    background-color: #09449c;
    padding-right: 6px;
    padding-left: 6px;
    color: white;
    border-radius: 23px;
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
display:none;
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
.post-item .post-content {
  color: $cinza;
  @include multiLineEllipsis($lineHeight: 1.2em, $lineCount: 3, $bgColor: #f5f5f5);
  &:hover {
    color: initial;
  }
}
.post-item figure.nickname.image {
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
.image img {
    display: block;
    height: auto;
    width: 100%;
}

</style>
