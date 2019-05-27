<template>
  <div class="column is-4 tile is-parent lesson" :class="{'is-watched': lesson.watched_students_count > 0}">
    <router-link :to="`/courses/${course.slug}/${serie.slug}/${lesson.slug}`">
      <article class="tile is-child box" :style="`background-image: url(${metadata(lesson, 640) ? metadata(lesson, 640).value : ''});`">
      <!-- <article class="tile is-child box"> -->
        <div class="media-content">
          <p class="title">
            {{lesson.name}}
          </p>
          <p class="subtitle">{{lesson.description}}</p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <span v-if="lesson.is_open || course.is_open" class="icon is-small tooltip is-tooltip-right" data-tooltip="Esta aula é aberta ao público">
                <vue-material-icon name="lock_open"></vue-material-icon>
              </span>
              <span v-else class="icon is-small tooltip is-tooltip-right" data-tooltip="Esta aula é exclusiva para assinantes">
                <vue-material-icon name="lock"></vue-material-icon>
              </span>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <button class="button is-small is-dark">
                <span v-if="lesson.watched_students_count > 0">Reassistir aula</span>
                <span v-else>Assistir aula</span>
              </button>
            </div>
          </div>
        </nav>
      </article>
    </router-link>
  </div>
</template>

<script>
  import store from '@/store';
  import {mapState, mapGetters} from 'vuex';

	export default {

    name: 'lesson-card',

    props: ['course', 'serie', 'lesson'],

	  components: {
    },

    computed: {
      ...mapGetters("metadata", {metadata: "getPicture"}),
      first_lesson() {
        let state = this.$store.state.courses
        if (state.course && state.course.series && state.course.series.length > 0 && state.course.series[0].lessons && state.course.series[0].lessons.length > 0) {
          return state.course.series[0].lessons[0]
        }
        return null
      }
    },

	  data () {
	    return {
	    }
    },

    methods: {
      setData() {

      }
    }
	}
</script>

<style lang="scss">
.tile.lesson {
  .tile.is-child {
    min-height: 200px;
    display: flex;
    flex-direction: column;
  }
  .title {
    color: #FFF;
    font-size: 14px;
    transition: 0.3s all;
  }
  .level {
    z-index: 100;
    .icon {
      color: #FFF;
    }
    .level-right .level-item {
      margin-right: 0;
    }
  }
  > a {
    position: relative;
    display: block;
    width: 100%;
    transition: 0.3s all;
    &::after {
      content: " ";
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      opacity: 0;
      background-color: rgba(0,0,0,.7);
      transition: 0.3s all;
      border-radius: 6px;
      z-index: 10;
    }
    &:hover {
      &::after { opacity: .6; }
      .title {
        position: relative;
        color: #FFF;
        z-index: 100;
        font-size: 18px;
      }
    }
  }
  &.is-watched {
    a {
      opacity: .5;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
