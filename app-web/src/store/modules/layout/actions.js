import api from '../../../api'
import getters from './getters'
import metadata from '../metadata'

export default {
  fetchAllContents ({commit, getters}) {
    commit('setIsLoadingContents', true)

    return api.layout.fetchAllContents().then(
      (contents) => {
        commit('setContents', contents)
        commit('setIsContentsLoaded', true)
      }
    ).finally(() => commit('setIsLoadingContents', false));
  },
  fetchContent ({commit, getters}, contentSlugOrId) {
    commit('setIsLoadingContent', true)

    return api.layout.fetchContent(contentSlugOrId)
      .then((content) => commit('setContent', content))
      .finally(() => commit('setIsLoadingContent', false));
  },
  fetchPages ({commit, dispatch}, page) {
    commit('setLoadingPage', true)

    return api.layout.pages.get(page)
      .then((page) => commit('setPage', page))
      .finally(() => commit('setLoadingPage', false));
  }
}
