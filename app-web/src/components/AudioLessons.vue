<template>
<div class="bodyMenuFixed">
  <fixed-sidebar-lesson></fixed-sidebar-lesson>
  <div class="columns responsiveMenuMobile ">
    <a href="javascript:void(0);" @click="onClickToggleNavigation()">
      <div class="column is-2-mobile is-1-tablet menu4mobile is-centered">
        <font-awesome-icon icon="angle-right" style="color: white; font-size: 25px; text-align: center; margin-left:14px;"></font-awesome-icon>
      </div>
    </a>
  </div>
  <div class="columns reponsiveMenuTablet">
    <a href="javascript:void(0);"  @click="onClickToggleNavigation()">
      <div class="column is-1-mobile is-1-tablet menu4mobile is-centered">
        <font-awesome-icon icon="angle-right" style="color: white; font-size: 25px; text-align: center; margin-left:14px;"></font-awesome-icon>
      </div>
    </a>
  </div>
  <section class="container" style="padding-left:10px; padding-right:10px;">
    <div>
      <h1 class="title is-2">Podcast</h1><br>
    </div>
  </section>
  <section class="container content" style="padding-left:10px; padding-right:10px;">
    <audio controls="control" autoplay="false" name="media" style="width: 100%; height: 100px; ">
      <source src="http://www.podbr.com/data/casos/casos_morbidos.mp3" type="audio/mpeg">
    </audio>


        <audio controls>
            <source :src="selected_lesson.audio_url" type="audio/wav">
        </audio>


  </section>
  <section class="container content" style="margin-bottom: 60px; padding-left:10px; padding-right:10px;">
    <div class="columns">
      <div class="column is-9-desktop">
        <h2 class="title is-4">Aula 2 - Como criar e gerenciar</h2>
        <p class="subtitle is-5" style="font-weight: 300;">Serie estrutura base Photoshop | Trilha completa de Photoshop</p>
      </div>
      <div class="column is-3-desktop">
        <button class="likeButton">
          <font-awesome-icon icon="thumbs-up" style="color: white; font-size: 18px;"></font-awesome-icon>
        </button>
        <button class="previousButton">
          <font-awesome-icon icon="step-backward" style="color: #0691E6; font-size: 18px;"></font-awesome-icon>
        </button>
        <button class="proximaAulaButton">
          Próxima aula
        </button>
      </div>
    </div>
  </section>
<lesson-comments></lesson-comments>
<sidebar-lesson></sidebar-lesson>


</div>
</template>

<script>
import LessonComments from './Community/LessonComments'
import SidebarLesson from './Sidebar/SidebarLesson'
import FixedSidebarLesson from './Sidebar/LessonFixedsidebar'
export default {
 components: {
   LessonComments,
   SidebarLesson,
   FixedSidebarLesson
  },
  methods: {
    onClickToggleNavigation() {
      this.$store.commit("setMenuVisible", !this.is_menu_visible)
    },

  }
}
</script>

<style>
.menu4mobile{
  background-color: #ff6126;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;

}
/* Desktops and laptops ----------- */
@media only screen  and (min-device-width : 1023px) {
  .responsiveMenuMobile{
    display: none !important;
  }
  .reponsiveMenuTablet{
    display: none !important;
  }

}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
  .responsiveMenuMobile{
    display:none;
  }
}
.likeButton{
  background-color: #0691E6;
  border-radius: 5px;
  padding:10px;
  border: transparent;
  cursor: pointer;
  margin-right:40px;
}
.previousButton{
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: white;
  cursor: pointer;
  padding:10px;
  border-color: #e0e0e0;
}
.proximaAulaButton{
  cursor: pointer;
  font-size: 16px;
  font-weight:600;
  border-color:transparent;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding:10px;
  background-color:  #0691E6;
  color: white;
}

/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  .reponsiveMenuTablet{
    display:none;
  }
  .likeButton{
    background-color: #0691E6;
    border-radius: 5px;
    padding:10px;
    border: transparent;
  }
  .previousButton{
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: white;
    padding:10px;
    border-color: #e0e0e0;
  }
  .proximaAulaButton{
    font-size: 13px;
    font-weight:600;
    border-color:transparent;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding:10px;
    background-color:  #0691E6;
    color: white;
  }

}

</style>
