
function selected_serie_index(state) {
  if (state.course && state.course.series && state.course.series.length > 0) {
    return state.course.series.findIndex((serie, idx, arr) =>
        serie.id === state.selected_serie_id_or_slug ||
        serie.slug === state.selected_serie_id_or_slug
    )
  }
  return -1
}

function selected_serie (state, selectedSerieIndex = false) {
  if (!selectedSerieIndex) {
    selectedSerieIndex = selected_serie_index(state)
  }

  if (selectedSerieIndex !== -1) {
    return state.course.series[selectedSerieIndex]
  }
}

function selected_lesson_index(state, selectedSerie = false) {
  if (!selectedSerie) {
    selectedSerie = selected_serie(state)
  }
  if (selectedSerie && selectedSerie.lessons && selectedSerie.lessons.length > 0) {
    let selectedIndex = selectedSerie.lessons.findIndex((lesson, idx, arr) =>
        lesson.id == state.selected_lesson_id_or_slug ||
        lesson.slug == state.selected_lesson_id_or_slug
    )
    if (selectedIndex !== -1) {
      return selectedIndex
    }
  }
  return -1
}

function selected_lesson(state) {
  let selectedSerie = selected_serie(state)
  let lesson_index = selected_lesson_index(state, selectedSerie)
  if (lesson_index !== -1) {
    return selectedSerie.lessons[lesson_index]
  }
  return null
}

export default {
  lessonDurationTotalInHours (state) { // in hours
    // state.course.lesson_duration_sum[0].duration => is in seconds
    if (state.course && state.course.lesson_duration_sum && state.course.lesson_duration_sum.length > 0) {
      let hours = state.course.lesson_duration_sum[0].duration / 60 / 60;
      if (hours < 1) {
        let minutes = state.course.lesson_duration_sum[0].duration / 60;
        return { unit: 'm', num: parseInt(Math.ceil(minutes)) };
      }
      return { unit: 'h', num: parseInt(Math.ceil(hours)) };
    }
    return {unit: 'h', num: 0};
  },
  duration_total(state) {
    return (course) => {
      if (course && course.lesson_duration_sum && course.lesson_duration_sum.length > 0) {
        let hours = course.lesson_duration_sum[0].duration / 60 / 60;
        if (hours < 1) {
          let minutes = course.lesson_duration_sum[0].duration / 60;
          return { unit: 'm', num: parseInt(Math.ceil(minutes)) };
        }
        return { unit: 'h', num: parseInt(Math.ceil(hours)) };
      }
      return {unit: 'h', num: 0};
    }
  },
  selected_serie (state) {
    return selected_serie(state)
  },
  selected_lesson (state) {
    return selected_lesson(state)
  },
  next_serie_lesson (state) {
    let selectedSerieIndex = selected_serie_index(state)
    let selectedSerie = selected_serie(state, selectedSerieIndex)
    let currentLessonIndex = selected_lesson_index(state, selectedSerie)
    if (currentLessonIndex !== -1) {
      let nextLessonIndex = currentLessonIndex + 1;
      if (nextLessonIndex < selectedSerie.lessons.length) {
        // Its in our boundries
        return {
          serie: selectedSerie,
          lesson: selectedSerie.lessons[nextLessonIndex]
        }
      } else {
        let nextSerieIndex = selectedSerieIndex + 1
        if (nextSerieIndex < state.course.series.length) {
          let nextSerie = state.course.series[nextSerieIndex]
          if (nextSerie.lessons && nextSerie.lessons.length > 0) {
            return {
              serie: nextSerie,
              lesson: nextSerie.lessons[0]
            }
          }
        }
      }
    }
    return null
  },
  previous_serie_lesson (state) {
    let selectedSerieIndex = selected_serie_index(state)
    let selectedSerie = selected_serie(state, selectedSerieIndex)
    let currentLessonIndex = selected_lesson_index(state, selectedSerie)
    if (currentLessonIndex !== -1) {
      let previousLessonIndex = currentLessonIndex - 1
      if (previousLessonIndex >= 0) {
        return {
          serie: selectedSerie,
          lesson: selectedSerie.lessons[previousLessonIndex]
        }
      } else {
        let previousSerieIndex = selectedSerieIndex - 1
        if (previousSerieIndex >= 0 && state.course.series[previousSerieIndex].lessons && state.course.series[previousSerieIndex].lessons.length > 0) {
          let lastLessonIndex = state.course.series[previousSerieIndex].lessons.length - 1;
          return {
            serie: state.course.series[previousSerieIndex],
            lesson: state.course.series[previousSerieIndex].lessons[lastLessonIndex]
          }
        }
      }
    }
    return null
  },

  course_progress: (state) => (course) => {
    if (course && course.lessons_count > 0) {
      return parseInt(Math.floor((course.watched_lessons_count / course.lessons_count) * 100));
    }
    return 0;
  },

  my_started_courses(state) {
    return state.my_courses.filter((course, idx, arr) => course.watched_lessons_count > 0);
  },
  my_4_started_courses(state) {
    return state.my_courses.filter((course, idx, arr) => course.watched_lessons_count > 0).slice(0, 4);
  },
  my_not_started_courses(state) {
    return state.my_courses.filter((course, idx, arr) => course.watched_lessons_count <= 0);
  },
  my_courses_count(state) {
    return state.my_courses.length;
  },
  public_courses(state) {
    if (Array.isArray(state.public_courses) && state.public_courses.length > 0) {
      return state.public_courses.filter(course => !course.is_open && state.my_courses.filter(myCourse => myCourse.id === course.id && myCourse.watched_lessons_count === 0).length === 0);
    }
    return state.public_courses;
  },
  featured_courses (state) {
    return state.courses.slice(0, 3);
  },
  open_courses(state) {
    if (Array.isArray(state.public_courses)) {
      return state.public_courses.filter(course => course.is_open)
    }
    return [];
  },
  next_unwatched_lesson (state) {
    let series = state.course.series;
    let selectedSerie = null;
    let selectedLesson = null;
    for (let serieIndex in series) {
      let serie = series[serieIndex];
      let lessons = serie.lessons;
      let unwatchedLessons = lessons.filter((lesson, idx, arr) => lesson.watched_students_count <= 0);
      if (unwatchedLessons.length > 0) {
        selectedSerie  = serie;
        selectedLesson = unwatchedLessons.shift();
        break;
      }
    }
    return {
      serie: selectedSerie,
      lesson: selectedLesson
    }
  }
}
