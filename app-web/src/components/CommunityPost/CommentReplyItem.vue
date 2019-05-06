<template>
  <div class="columns">
    <div class="comment-item column is-11-desktop">
      <div class="postnickname media nickname content" style="margin-bottom: 15px;">
        <figure class="media-left image nickname ">
          <user-avatar :user="comment.public_created_by"></user-avatar>
        </figure>
        <div class="media-content">
          <div class="content" style="margin-bottom:0px;">
            <p>
              <router-link :to="`/profiles/${comment.public_created_by.nickname || comment.public_created_by.id}`"><strong>{{comment.public_created_by.nickname || comment.public_created_by.name}}</strong></router-link>
              <span class="is-size-7">
                ({{comment.public_created_by.points}} pts)
              <span class="has-text-grey-light">{{comment.updated_at | fromNow}}</span>
              </span>
            </p>
            <nl2br tag="p" :text="comment.body"></nl2br>
            <button @click="onClickLikeButton()" class="button is-white is-small" :class="{'is-loading': is_liking_this_comment, 'is-liked': comment.current_user_like}">
              <span class="icon"><font-awesome-icon icon="thumbs-up"></font-awesome-icon></span>
              <span>{{comment_likes_count}} {{ comment_likes_count === 0 || comment_likes_count > 1 ? 'gostaram' : 'gostou' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import Vue from 'vue'
  import Nl2br from 'vue-nl2br'
  import UserAvatar from '../Community/UserAvatar.vue'

  Vue.component('nl2br', Nl2br)

  export default {

    name: 'post',
    props: ['comment'],
    components: {
      UserAvatar
    },
    computed: {
      comment_replies_count() {
        if (this.comment.replies_count) {
          return this.comment.replies_count.total;
        }
        return 0;
      },
      comment_likes_count() {
        if (this.comment.likes_count) {
          return this.comment.likes_count.total;
        }
        return 0;
      }
    },
    data () {
      return {
        is_liking_this_comment: false
      }
    },
    filters: {
      fromNow(date) {
        return moment(date).fromNow();
      }
    },
    methods: {
      async onClickLikeButton() {
        this.is_liking_this_comment = true;
        const payload = {
          postId: this.comment.commentable_id,
          commentId: this.comment.id
        };
        if (this.comment.commentable_type === 'posts') {
          await this.$store.dispatch('community/togglePostCommentLike', payload)
        }
        this.is_liking_this_comment = false;
      }
    }


  }
</script>

<style lang='scss'>
  /* iPads (portrait and landscape) ----------- */
  @media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
    .likeButton{
      display: none;
    }
  }
  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    .likeButton{
      display: none;
    }
  }
  /* Desktops and laptops ----------- */
  @media only screen  and (min-width : 1224px) {
    .likeBtnMobile{
      display: none;
    }
  }
  .likeBtnMobile{
    text-align: center; margin-left: 20px;
  }
  .columnMaindiv{
    margin-bottom:20px;
    padding: 10px;
    background-color:#fafafa;
    border-radius: 10px;
  }

  .likeButton{
    //background-color: #f5f5f5;
    border-radius:5px;
    height: 100px;
    border: 1px solid #848484;
    margin-right: 10px;
    padding-top: 25px;
    width: 4.33333% !important;
  }
  .comment-item{
    padding-bottom: 20px;

    //background-color: #f5f5f5;
    border-radius: 10px;
    padding-right: 20px;
    padding-left: 20px;
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
    .image img {
      display: block;
      height: auto;
      width: 100%;
    }
    .postnickname {
      //padding-top: 30px;
    }
  }
  .comment-item {
    .button.is-white.btn-like {
      border-radius: 5px !important;
      height: 100px;
      border: 1px solid #848484;
      margin-right: 10px;
      padding-top: 25px;
    }
  }
</style>
