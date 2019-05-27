import api from '../../../api'

export default {
  fetchGame ({commit, dispatch}, gameSlug) {
    commit('setLoadingGame', true);

    return api.gamefication.fetchGame(gameSlug)
      .then((game) => commit('setGame', game))
      .finally(() => commit('setLoadingGame', false));
  },

  fetchProgress ({commit, dispatch}, gameSlug) {
    commit('setLoadingProgress', true);

    return api.gamefication.fetchGameProgress(gameSlug)
      .then((progress) => commit('setProgress', progress))
      .finally(() => commit('setLoadingProgress', false));
  },

  startGame ({commit, dispatch}, gameSlug) {
    commit('setStartingGame', true);

    return api.gamefication.startGame(gameSlug)
      .then((progress) => progress)
      .finally(() => commit('setStartingGame', false));
  }
}
