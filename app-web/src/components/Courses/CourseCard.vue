<template>
  <div class="column course tile is-parent" :class="{'is-11': mode == 'list', 'is-3': mode == 'card'}">
    <router-link :to="`/courses/${course.slug}`">
      <!-- <article class="tile is-child box" :style="`background-image: url(${course.thumb_url});`"> -->
      <div class="tile is-child box">
        <article class="media">
          <figure class="media-left cover">
            <p class="image is-3by2">
              <img src="/static/bg_course.png" :alt="course.name">
            </p>
            <img v-if="img(course, 'avatar')" :src="img(course, 'avatar').image_url" :alt="course.name" class="logo">
          </figure>
          <div class="media-content">
            <h2 class="title has-text-centered">{{course.name}}</h2>
            <h3 class="subtitle has-text-centered" v-if="course.publisher && course.publisher.name">{{course.publisher.name}}</h3>
            <progress v-if="course_progress(course) > 0" class="progress is-success is-xsmall" :value="course_progress(course)" max="100">15%</progress>
            <p v-if="course_progress(course) > 0"><small>({{course_progress(course)}}% concluído)</small></p>
            <div class="course-tags">
              <p class="tag is-warning course-data">
                {{course.lessons_count}} Aulas | {{duration_total(course).num}} {{duration_total(course).unit == 'h' ? 'horas' : 'minutos'}}
              </p>
              <p v-if="course_progress(course) > 0" class="tag is-success course-in-progress">
                {{course_progress(course)}}% concluído
              </p>
            </div>

            <nav class="level is-mobile">
              <div class="level-left">
                <div class="level-item"></div>
              </div>
            </nav>
          </div>
        </article>
        <div class="media-footer">
          <button type="button" class="button is-fullwidth has-text-primary" style="text-transform: uppercase">
            <span v-if="course.watched_lessons_count == 0">Começar curso</span>
            <span v-else>Continuar curso</span>
          </button>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

	export default {

    name: 'course-card',

    props: ['course', 'mode'],

	  components: {

    },

    computed: {
      ...mapGetters("courses", ["course_progress", "duration_total"]),
      ...mapGetters("metadata", {img: 'getMetadataImage'})
    },

	  data () {
	    return {
        content_visible: false
	    }
	  }
	}
</script>

<style lang="scss">
  .course.tile {
    position: relative;
    > a {
      display: block;
      width: 100%;
    }
    .title {
      font-size: 16px;
    }
    .subtitle {
      color: #CCC;
      // font-style: italic;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .tile.is-child {
      width: 100%;
      min-height: 340px;
      &.box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0.5em;
      }
      .content {
        font-size: 14px;
      }
    }
    &.is-11, &.is-12 {
      .tile.is-child {
        min-height: 192px;
      }
    }
    button.button {
      border: 0;
      border-top: 1px solid #CCC;
      border-radius: 0;
      &:focus {
        box-shadow: none;
      }
    }
    .card-footer {
      .card-footer-item {
        border-radius: 0;
        border:0;
      }
    }
    .media {
      flex-direction: column;
      .media-content {
        width: 100%;
        margin-top: 20px;
      }
    }
    .course-tags {
      position: absolute;
      top: 30px;
      left: 11px;
      display: flex;
      flex-direction: column;
    }
    .media-left {
      @media screen and (max-width: 600px) {
        margin-right: 0;
        margin-bottom: 10px;
      }
      &.cover {
        width: 100%;
        margin-right: 0;
        position: relative;
        @media screen and (max-width: 600px) {
          width: 100%;
        }
        .image {
          margin-bottom: 0;
          img {

          }
        }
        .logo {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          width: 25%;
          margin: auto;
          box-shadow: 3px 3px 5px -1px rgba(158,158,158,1);
        }
      }
    }
  }
</style>
