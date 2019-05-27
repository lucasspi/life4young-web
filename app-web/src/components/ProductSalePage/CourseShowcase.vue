<template>
  <div class="course-showcase">
    <article class="media course-showcase">
      <figure class="media-left" v-if="img(course, 'avatar')" >
        <p class="image is-64x64">
          <img :src="img(course, 'avatar').image_url" alt="" />
        </p>
      </figure>
      <div class="media-content">
        <h2 class="title" v-html="course.name"></h2>
        <span class="tag is-warning">
          {{course.lessons_count[0].total}} Aulas | {{duration_total(course).num}} {{duration_total(course).unit == 'h' ? 'horas' : 'minutos'}}
        </span>
      </div>
      <div class="media-right">
        <button class="button is-white" @click="content_visible = !content_visible">
          <font-awesome-icon :icon="content_visible ? 'caret-square-up' : 'caret-square-down'"></font-awesome-icon>
        </button>
      </div>
    </article>
    <div v-if="content_visible" class="box">
      <div class="content">
        <h3>Conteúdo do curso</h3>
        <ol>
          <li v-for="serie in course.series">
            <p class="subtitle">{{serie.name}}</p>
            <ul>
              <li v-for="lesson in serie.lessons">
                {{lesson.name}}
              </li>
            </ul>
            <p>&nbsp;</p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {

    name: 'course-showcase',

    props: ['course', 'product-slug', 'publisher-slug'],

    components: {

    },

    computed: {
      ...mapGetters("metadata", {img: 'getMetadataImage'}),
      ...mapGetters("courses", ["course_progress", "duration_total"]),
    },

    data () {
      return {
        content_visible: false
      }
    }
  }
</script>

<style lang="scss">
  .course-showcase {
    margin-bottom: 25px;
    h2.title {
      margin-bottom: 0;
      font-size: 18px;
    }
    .box {
      margin-top: 50px;
    }
  }
</style>
