import api from '../../../api'

export default {
  fetch({commit, dispatch}, certificateHashOrId) {
    commit('setLoadingCertificate', true)
    return api.courseStudent.get(certificateHashOrId).then(
      (certificate) => commit('setCertificate', certificate)
    ).finally(
      () => commit('setLoadingCertificate', false)
    )
  },

  fetchAllPosts({commit, dispatch}, {page = null, tag = null, text = null, cancelToken = null}) {
    commit('setLoadingPosts', true)
    let queryParams = {};
    if (page)
      queryParams = {...queryParams, page};
    if (tag)
      queryParams = {...queryParams, tag};
    if (text)
      queryParams = {...queryParams, text};

    commit('setQueryParams', queryParams)

    return api.community.posts.all(queryParams, cancelToken).then(
      (response) => {
        commit('setPosts', response.data);
        commit('setPostsMetadata', response.metadata);
      }
    ).finally(
      () => commit('setLoadingPosts', false)
    )
  },

  fetchAllTags({commit, dispatch}, cancelToken = null) {
    commit('setLoadingTags', true)
    return api.community.tags.all(cancelToken).then(
      (tags) => commit('setTags', tags)
    ).finally(
      () => commit('setLoadingTags', false)
    )
  },

  fetchBasicData({commit, dispatch}, queryParams = null) {
    const cancelToken = api.createCancelToken();
    commit('addCancelToken', cancelToken);
    return Promise.all([
      dispatch('fetchAllPosts', {...queryParams, cancelToken}),
      dispatch('fetchAllTags', cancelToken)
    ]);
  },

  cancelAllRequests({commit, dispatch, state}) {
    state.cancel_tokens.forEach((cancelToken) => cancelToken.cancel());
    commit('flushCancelTokens')
  },

  async fetchPost({commit, dispatch}, postIdOrSlug) {
    commit('setLoadingPost', true)
    commit('setPost', await api.community.posts.get(postIdOrSlug))
    commit('setLoadingPost', false)
  },

  async fetchPostComments({commit, dispatch}, postIdOrSlug) {
    commit('setLoadingPostComments', true);
    const responseData = await api.community.posts.comments(postIdOrSlug).all();
    commit('setPostComments', responseData.data);
    commit('setPostCommentsMetadata', responseData.metadata);
    commit('setLoadingPostComments', false);
  },

  async reloadPostComment({commit, dispatch}, {postId, commentId}) {
    const comment = await api.community.posts.comments(postId).get(commentId);
    commit('replaceCommentInList', comment)
  },

  async togglePostLike({commit, dispatch, state}, {post, queryParams = null}) {
    const likedPost = await api.community.posts.toggleLike(post);
    if (state.post) {
      await dispatch('fetchPost', state.post.slug);
    } else {
      commit('replacePostInList', likedPost)
      // await dispatch('fetchBasicData', state.query_params);
    }
  },

  async togglePostCommentLike({commit, dispatch, state}, {postId, commentId, parentCommentId = null}) {
    const likedComment = await api.community.posts.comments(postId).toggleLike(commentId);
    commit('replaceCommentInList', likedComment);
  }
}
