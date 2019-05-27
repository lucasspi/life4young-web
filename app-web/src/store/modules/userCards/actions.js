import api from '../../../api'

export default {
  fetchCards({commit, dispatch}) {
    commit('setLoadingCards', true);

    return api.userCards.fetch()
      .then((addresses) => commit('setCards', addresses))
      .finally(() => commit('setLoadingCards', false));
  }
}
