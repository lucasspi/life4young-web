<template>
  <div class="column course-offer is-3 tile is-parent">
    <router-link :to="course.exclusive_product_course && course.exclusive_product_course.product ? `/p/${course.publisher.slug}/${course.exclusive_product_course.product.slug}` : `/signup`">
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
            <h2 class="title">{{course.name}}</h2>
            <h3 class="subtitle" v-if="course.publisher && course.publisher.name">{{course.publisher.name}}</h3>
            <div class="course-tags">
              <p class="tag is-warning course-data">
                {{course.lessons_count}} Aulas | {{duration_total(course).num}} {{duration_total(course).unit == 'h' ? 'horas' : 'minutos'}}
              </p>
            </div>

            <nav class="level is-mobile">
              <div class="level-left">
                <div class="level-item"></div>
              </div>
            </nav>
          </div>
        </article>
        <div class="content" v-if="!course.is_open">
          <div v-if="subscription_courses.indexOf(course.id) !== -1">
            <div class="is-size-7 has-text-grey-dark has-text-right">
              Curso disponível em sua conta
            </div>
          </div>
          <div v-else>
            <div class="is-size-7 has-text-grey-dark has-text-right">
              Preço do curso avulso:
            </div>
            <p class="is-size-5 has-text-right" v-if="course.exclusive_product_course && course.exclusive_product_course.product">
              <span class="is-size-6 has-text-grey-light" style="text-decoration: line-through; margin-right: 10px;" v-if="course.exclusive_product_course.product.price_from">
                R$ {{ format_price(course.exclusive_product_course.product.price_from) }}
              </span>
              R$ {{ format_price(course.exclusive_product_course.product.price) }}
            </p>
            <p class="is-size-5 has-text-right" v-else>
              Indisponível
            </p>
          </div>
        </div>
        <div class="content" v-else>
          <p class="is-size-4 has-text-right">
            Gratuito
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {

    name: 'course-offer',

    props: ['course', 'mode'],

    components: {

    },

    computed: {
      ...mapGetters("subscriptions", ["subscription_courses"]),
      ...mapGetters("courses", ["course_progress", "duration_total"]),
      ...mapGetters("metadata", {img: 'getMetadataImage'}),
      ...mapGetters('order', ['format_price']),
    },

    data () {
      return {
        content_visible: false
      }
    }
  }
</script>

<style lang="scss">
  .course-offer.tile {
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
      min-height: 320px;
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
