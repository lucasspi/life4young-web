
export default {
  setGame(state, game) {
    state.game = game;
  },
  setLoadingGame(state, loadingGame) {
    state.loading_game = loadingGame;
  },
  setProgress(state, progress) {
    state.progress = progress;
  },
  setLoadingProgress(state, loadingProgress) {
    state.loading_progress = loadingProgress;
  },
  setStartingGame(state, startingGame) {
    state.starting_game = startingGame;
  }
}
