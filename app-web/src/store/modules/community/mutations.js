import Vue from 'vue';

export default {
  setPosts: (state, posts) => state.posts = posts,
  setPostsMetadata: (state, postsMetadata) => state.posts_metadata = postsMetadata,
  setLoadingPosts: (state, loadingPosts) => state.loading_posts = loadingPosts,
  setTags: (state, tags) => state.tags = tags,
  setLoadingTags: (state, loadingTags) => state.loading_tags = loadingTags,
  setPost: (state, post) => state.post = post,
  setLoadingPost: (state, loadingPost) => state.loading_post = loadingPost,
  setPostComments: (state, postComments) => state.post_comments = postComments,
  setPostCommentsMetadata: (state, postCommentsMetadata) => state.post_comments_metadata = postCommentsMetadata,
  setLoadingPostComments: (state, loadingPostComments) => state.loading_post_comments = loadingPostComments,
  setQueryParams: (state, queryParams) => state.query_params = queryParams,
  replacePostInList (state, newPost) {
    // state.posts
    Vue.set(state.posts, state.posts.findIndex(p => p.id === newPost.id), newPost)
  },
  replaceCommentInList (state, newComment) {
    const commentIndex = state.post_comments.findIndex((c) => c.id === newComment.id);
    if (commentIndex !== -1) {
      return Vue.set(state.post_comments, commentIndex, newComment);
    }

    const parentCommentIndex = state.post_comments.findIndex(
      (c) => c.replies && c.replies.findIndex((r) => r.id === newComment.id) !== -1
    );
    if (parentCommentIndex !== -1) {
      const parentComment = state.post_comments[parentCommentIndex];
      const replyCommentIndex = parentComment.replies.findIndex((r) => r.id === newComment.id);
      if (replyCommentIndex !== -1) {
        return Vue.set(state.post_comments[parentCommentIndex].replies, replyCommentIndex, newComment)
      }
    }
    // if not found, search in replies
  },
  addCancelToken: (state, cancelToken) => state.cancel_tokens.push(cancelToken),
  flushCancelTokens: (state) => state.cancel_tokens = []
}
