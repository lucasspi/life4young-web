
export default {
  filtering_by_hashtag(state) {
    if (state.query_params && state.query_params.tag && Array.isArray(state.tags)) {
      const tagFiltered = state.tags.filter(t => t.slug === state.query_params.tag);
      if (tagFiltered.length > 0) {
        return tagFiltered[0];
      }
    }
    return null;
  },
  filtering_by_text(state) {
    if (state.query_params && state.query_params.text) {
      return state.query_params.text;
    }
    return null;
  }
}
