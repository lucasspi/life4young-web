<template>
  <div class="courses-page">
    <hero-section not-waves="true" set-classes="is-bold">
      <div class="container">
        <h1 class="title">
          Treinamentos
        </h1>
        <h2 class="subtitle">
          Para construção da sua carreira
        </h2>
      </div>
    </hero-section>
    <div class="container is-fluid">
      <div class="columns is-multiline is-centered">
        <course-featured v-for="course in courses" v-if="course.is_featured" :key="course.id" :course="course"></course-featured>
        <course-card  v-for="course in courses" v-if="!course.is_featured" mode="card" :key="course.id" :course="course"></course-card>
      </div>
    </div>

  </div>
</template>

<script>
import CourseCard from './Courses/CourseCard.vue'
import CourseFeatured from './Courses/CourseFeatured.vue'
import { mapState } from 'vuex'
import store from '@/store'
import HeroSection from './HeroSection.vue'

export default {

	  name: 'Courses',

	  components: {
    HeroSection,
    CourseCard,
    CourseFeatured
  },

  beforeRouteEnter (to, from, next) {
    store.dispatch('courses/fetchAll', {params: {
      include: ['metadata_images', 'publisher', 'first_lesson', 'lesson_duration_sum'],
      include_count: ['lessons', 'watched_lessons']
    }}).then(
      () => next(vm => vm.setCoursesLength(0))
    )
  },

  beforeRouteUpdate (to, from, next) {
    store.dispatch('courses/fetchAll', {params: {
      include: ['metadata_images', 'publisher', 'first_lesson', 'lesson_duration_sum'],
      include_count: ['lessons', 'watched_lessons']
    }}).then(
      () => {
        this.setCoursesLength(0)
        next()
      }
    )
  },

	  data () {
	    return {
      courses_length: 0
	    }
  },

  computed: {
    ...mapState('courses', ['courses'])
  },

  methods: {
    setCoursesLength (courses_length) {
      this.courses_length = courses_length
    }
  }
}
</script>

<style lang="scss">
.courses-page {
  margin-bottom: 50px;
  @media screen and (max-width: 991px) {
    .container {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  .container {
    margin-top: -40px;
    @media screen and (max-width: 961px) {
      margin-top: 40px;
    }
  }
}
</style>
