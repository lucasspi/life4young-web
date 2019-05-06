
export default {
  getAchievementProgressBySlug (state) {
    return (slug) => {
      if (state.progress && state.progress.length > 0) {
        const progressIndex = state.progress.findIndex(p => p.achievement.slug === slug);
        return state.progress[progressIndex];
      }
      return null;
    }
  }
}
