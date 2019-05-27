import api from '../../../api'

export default {

  fetchProjects ({ commit, state }) {
    return api.courses.integrations.vimeo.listProjects()
      .then((projects) => commit('setProjects', projects))
  },

  fetchVideos ({ commit, state }, selectedProjectId) {
    commit('setSelectedProjectId', selectedProjectId)
    return api.courses.integrations.vimeo.listProjectVideos(selectedProjectId)
      .then((videos) => commit('setVideos', videos))
  },

  importVideos ({commit, state}, {course, serie}) {
    let  promises = [];

    state.selected_videos.map((selectedVideo, idx, arr) => {
      promises.push(
        api.lessons.create(course, serie, {
          'name': selectedVideo.name,
          'description': selectedVideo.description,
          'vimeo_url': selectedVideo.link,
          'is_open': false,
          'duration': selectedVideo.duration,
          'vimeo_id': selectedVideo.id,
          'order': idx,
          'metadata': selectedVideo.pictures.sizes.map((picture, idx, arr) => {
            return {
              key: `picture_${picture.width}x${picture.height}`,
              value: picture.link,
              type: 'string'
            }
          })
        }).then(
          (lesson) => commit('setImportedVideo', selectedVideo),
          (err) => commit('setNotImportedVideo', selectedVideo)
        )
      );
    });

    return Promise.all(promises);
  }

}
