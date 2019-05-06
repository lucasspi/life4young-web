import axios from 'axios'

export default {
  games: {
    chainOfKnowledge: 'chain-of-knowledge'
  },

  fetchGame(gameSlug) {
    return axios.get(`gamefication/games/${gameSlug}`).then(
      (response) => response.data.data
    )
  },

  fetchGameProgress(gameSlug) {
    return axios.get(`gamefication/games/${gameSlug}/achievements-progress`).then(
      (response) => response.data.data
    )
  },

  startGame(gameSlug) {
    return axios.post(`gamefication/games/${gameSlug}/start-game`).then(
      (response) => response.data.data
    )
  }
}
