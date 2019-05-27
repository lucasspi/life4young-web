<template>
<div>
  <section class="Left">
    <div style="">
      <a style="background-color: white; padding:15px; border-radius: 50px;" @click="onClickToggleNavigation()">
        <font-awesome-icon icon="chevron-right" style="font-size:22px; color:black;  height: 22px; width: 22px;"></font-awesome-icon>
      </a>
    </div>
    <div style="margin-top: 80px;">
      <router-link :to='`/courses/${course.slug}`'>
        <img v-if="img(course, 'avatar')" width="40%" :src="img(course, 'avatar').image_url" :alt="course.name" class="logo">
        <p class="textCommunity">{{course.name}}</p>
        <p class="textProgress">{{course_progress(course)}}%</p>
      </router-link>
    </div>
    <div style="margin-top: 60px;">
      <a>
        <font-awesome-icon icon="comment-dots" style="font-size:30px; color:white; text-align:center;"></font-awesome-icon>
        <p class="textCommunity">Comunidade</p>
      </a>
    </div>
  </section>

  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'fixed-sidebar-lesson',
    props: ['active'],
    components: {

    },
    computed: {
      ...mapState(['is_menu_visible', 'is_tour_open']),
      ...mapState('courses', ['course']),
      ...mapGetters('courses', {
        'lesson_duration_total_in_hours': 'lessonDurationTotalInHours',
        course_progress: 'course_progress',
        'next': 'next_unwatched_lesson'
      }),
      ...mapGetters('metadata', {metadata: 'getMetadata', img: 'getMetadataImage'}),
    },

    data() {
      return {
        // toggleMenu: true
      }
    },

    methods: {
      onClickToggleNavigation() {
        this.$store.commit("setMenuVisible", !this.is_menu_visible)
      },
      onClickToggleMoNavigation() {
        this.$store.commit("seMobileMenuVisible", !this.is_mobile_menu_visible)
      }
    }
  }
</script>
<style>

.textCommunity{
  font-size:11px;
  text-align: center;
  color: white;
}
.textProgress{
  font-size:11px;
  background-color: #2D3136;
  margin-right:30px;
  margin-left:30px;
  border-radius:20px;
  color: white;
}
.Left{
    background-color:#334258;
    overflow: auto;
    height: 100%;
    position:fixed;
    width: 6.5rem;
    top: 0;
    bottom: 0;
    left:0;
    padding-top: 60px;
    text-align: center;
    z-index: 2;
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
  .Left{
    display: none;
  }
}
/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  .Left{
    display: none;
  }
}


</style>
