
export default {
  setCourses (state, courses) {
    state.courses = courses;
  },
  setLoadingCourses (state, loadingCourses) {
    state.loading_courses = loadingCourses;
  },
  setCourse (state, course) {
    state.course = course;
  },
  setLoadingCourse (state, loadingCourse) {
    state.loading_course = loadingCourse;
  },
  setCourseCompleted (state) {
    state.course.is_completed = true;
  },
  setSelectedSerie (state, serieSlugOrId) {
    state.selected_serie_id_or_slug = serieSlugOrId
  },
  setSelectedLesson (state, lessonSlugOrId) {
    state.selected_lesson_id_or_slug = lessonSlugOrId
  },
  setLoadingMyCourses(state, loadingMyCourses) {
    state.loading_my_courses = loadingMyCourses;
  },
  setMyCourses(state, myCourses) {
    state.my_courses = myCourses;
  },
  setPublicCourses (state, publicCourses) {
    state.public_courses = publicCourses;
  },
  setLoadingPublicCourses (state, loadingPublicCourses) {
    state.loading_public_courses = loadingPublicCourses;
  }
}
