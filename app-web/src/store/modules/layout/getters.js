import api from '../../../api'

export default {
  hero_banner (state) {
    if (state.contents && Array.isArray(state.contents) && state.contents.length > 0) {
      const selectedContents = state.contents
        .filter((i, idx, arr) => i.type === api.layout.contents.types.heroBanner);
      return selectedContents.length > 0 ? selectedContents[0] : null;
    }

    return null;
  },
  hero_banner_just_non_recurring_clients (state) {
    if (state.contents && Array.isArray(state.contents) && state.contents.length > 0) {
      const selectedContents = state.contents
        .filter((i, idx, arr) => i.type === api.layout.contents.types.heroBanner);
      return selectedContents.length > 0 ? selectedContents[0] : null;
    }

    return null;
  }

}
