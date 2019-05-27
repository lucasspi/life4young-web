
export default {
  setProjects (state, projects) {
    state.projects = projects
  },
  setSelectedProjectId (state, selectedProjectId) {
    state.selected_project_id = selectedProjectId
  },
  setVideos (state, videos) {
    state.videos = videos
  },
  setIsLoadingVideos (state, isLoading) {
    state.is_loading_videos = isLoading
  },
  addSelectedVideo (state, selectedVideo) {
    let videoExists = state.selected_videos.filter((vid, idx, arr) => vid.id === selectedVideo.id);
    if (videoExists.length > 0) return;

    state.selected_videos.push(selectedVideo);
  },
  removeSelectedVideo (state, selectedVideo) {
    let videoIndex = state.selected_videos.findIndex((vid, idx, arr) => vid.id === selectedVideo.id);

    if (videoIndex !== -1) {
      state.selected_videos.splice(videoIndex, 1);
    }
  },
  addSelectedVideos (state, selectedVideos) {
    selectedVideos.map((selectedVideo, idx, arr) => {
      let videoExists = state.selected_videos.filter((vid, idx, arr) => vid.id === selectedVideo.id);
      if (videoExists.length > 0) return;

      state.selected_videos.push(selectedVideo);
    });
  },
  removeSelectedVideos (state, selectedVideos) {
    selectedVideos.map((selectedVideo, idx, arr) => {
      let videoIndex = state.selected_videos.findIndex((vid, idx, arr) => vid.id === selectedVideo.id);

      if (videoIndex !== -1) {
        state.selected_videos.splice(videoIndex, 1);
      }
    });
  },
  setImportedVideo (state, importedVideo) {
    let selectedVideoIndex = state.selected_videos.findIndex((vid, idx, arr) => vid.id === importedVideo.id);

    if (selectedVideoIndex !== -1) {
      state.selected_videos.splice(selectedVideoIndex, 1);
    }

    state.imported_videos.push(importedVideo);
  },
  setVideoNotImported(state, importedVideo, error) {
    let selectedVideoIndex = state.selected_videos.findIndex((vid, idx, arr) => vid.id === importedVideo.id);

    if (selectedVideoIndex !== -1) {
      state.selected_videos.splice(selectedVideoIndex, 1);
    }

    state.not_imported_videos.push(importedVideo);
  },
  resetImportedVideos(state) {
    state.imported_videos = []
  },
  resetNotImportedVideos(state) {
    state.not_imported_videos = []
  }
}
