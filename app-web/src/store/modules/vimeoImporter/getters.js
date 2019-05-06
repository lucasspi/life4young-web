import api from "../../../api";

export default {
  project_videos_api_url (state) {
    if (state.selected_project_id)
      return api.courses.integrations.vimeo.listProjectVideosUrl(state.selected_project_id)

    return null;
  }
}
