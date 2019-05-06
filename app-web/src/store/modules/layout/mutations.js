
export default {
  setContents: (state, contents) => state.contents = contents,
  setIsLoadingContents: (state, isLoadingContents) => state.is_loading_contents = isLoadingContents,
  setIsContentsLoaded: (state, isContentsLoaded) => state.is_contents_loaded = isContentsLoaded,

  setContent: (state, content) => state.content = content,
  setIsLoadingContent: (state, isLoadingContent) => state.is_loading_content = isLoadingContent,

  setPage (state, page) {
    state.page = page;
  },

  setLoadingPage(state, loadingPage) {
    state.loading_page = loadingPage;
  },
}
