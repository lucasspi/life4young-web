<template>
  <div class="comment-list">
    <nav class="level" v-if="post_comments_metadata">
      <div class="level-item level-left">
        {{post_comments_metadata.pagination.total}} comentário(s)
      </div>
    </nav>
    <comment-item v-for="comment in post_comments" v-bind:key="comment.id" :comment="comment"></comment-item>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import CommentItem from './CommentItem.vue'
  export default {

    name: 'comment-list',
    props: ['active', 'replies'],
    components: {
      CommentItem
    },
    data () {
      return {}
    },
    computed: {
      ...mapState('community', ['post_comments', 'loading_post_comments', 'post_comments_metadata'])
    }

  }
</script>

<style lang='scss'>

</style>
