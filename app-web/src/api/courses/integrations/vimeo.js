import axios from 'axios'

export default {
  listProjects (options) {
    // options = {direction = 'asc', page = 1, per_page = 30}
    return axios.get('courses/integrations/vimeo/projects', {params: options})
      .then((response) => response.data.data)
  },

  listProjectVideosUrl (projectId, options) {
    let apiUrl = process.env.API_URL;
    return `${apiUrl}/courses/integrations/vimeo/projects/${projectId}/videos`;
  },

  listProjectVideos (projectId, options) {
    // options = {direction = 'asc', page = 1, per_page = 30};
    return axios
      .get(`courses/integrations/vimeo/projects/${projectId}/videos`, {params: options})
      .then((response) => response.data.data)
  }
}
