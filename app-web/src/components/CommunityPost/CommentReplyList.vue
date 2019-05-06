<template>
  <div class="comment-reply-list">
    <comment-reply-item v-for="comment in parentComment.replies" v-bind:key="comment.id" :comment="comment"></comment-reply-item>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import CommentReplyItem from './CommentReplyItem.vue'
  export default {

    name: 'comment-list',
    props: ['parentComment'],
    components: {
      CommentReplyItem
    },
    data () {
      return {}
    },
    computed: {
    }

  }
</script>

<style lang='scss'>
.comment-reply-list {
  margin-top: 1rem;
}
</style>
