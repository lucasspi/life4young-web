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
  <section class="container content" style="margin-bottom: 60px; margin-top: 30px; padding-left:10px; padding-right:10px;">
    <div class="columns">
      <div class="column is-9-desktop">
        <h1 class="title is-2">Título goes here</h1><br>
        <p class="subtitle is-5" style="font-weight: 300;">Serie estrutura base Photoshop | Trilha completa de Photoshop</p>
      </div>
      <div class="column is-3-desktop">
        <button class="previousButton">
          <font-awesome-icon icon="step-backward" style="color: #0691E6; font-size: 18px;"></font-awesome-icon>
        </button>
        <button class="proximaAulaButton">
          Próxima aula
        </button>
      </div>
    </div>
  </section>
  <section class="container content" style="margin-bottom: 60px; padding-left:10px; padding-right:10px;">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum molestie dictum feugiat. Vivamus vitae diam a ex sollicitudin viverra eu eget enim. Maecenas et dolor quis mi mattis feugiat. Quisque et semper justo. Donec et pretium lacus, sit amet condimentum est. Aenean quis mi vitae nibh facilisis pellentesque quis vitae nisl. In at sodales mi. Vivamus in posuere lacus. <br>

Suspendisse at iaculis erat. Suspendisse in sollicitudin elit, non sagittis justo. Donec vitae venenatis est, sit amet commodo velit. Ut metus ipsum, posuere at dictum non, dictum id tortor. Mauris congue lacus dui, ac interdum magna volutpat vitae. Proin purus massa, dictum vel consectetur eu, dictum sit amet leo. Sed aliquet nunc vel nulla ultrices varius. Sed aliquam eros sit amet risus efficitur lobortis. Suspendisse in orci justo. Donec dui velit, ornare sit amet volutpat eget, tempus id erat. Pellentesque purus velit, mollis et commodo eu, cursus eu metus. Maecenas pretium quis nisi nec interdum.

<br><br>Duis tincidunt leo leo, at rhoncus dolor pharetra sed. Duis id facilisis nisl. Vestibulum pellentesque at nisi sed vulputate. Nam ligula mauris, viverra sed vulputate sed, mattis vel velit. Praesent convallis, tellus hendrerit varius lacinia, enim massa viverra risus, sit amet sagittis neque risus id tortor. Nullam tincidunt efficitur commodo. Integer in magna pharetra, suscipit nibh vitae, mollis velit. Quisque arcu augue, consectetur et congue ac, lacinia vitae est. Praesent vitae quam elit. Nulla nisl nibh, varius nec nisl id, lobortis feugiat nunc. Nunc arcu diam, convallis ut ante quis, pharetra porta dui. Suspendisse non felis vel nibh iaculis placerat vel sit amet ante. Vivamus sagittis odio a ligula pellentesque elementum.

<br>Sed id placerat lorem. Cras vehicula odio purus, non mattis velit consequat faucibus. Vestibulum suscipit augue a lorem aliquam congue. Vestibulum a arcu nec eros pulvinar gravida. Praesent nec porta purus. Donec fermentum bibendum eros, nec porttitor urna viverra non. Phasellus scelerisque porta massa, at aliquet tortor bibendum non. Cras sed dui at ipsum pulvinar tempus. Duis condimentum massa sed orci sodales gravida. Suspendisse consequat nisi a scelerisque venenatis.

<br><br>Nulla at tincidunt ex. Ut maximus laoreet magna in aliquam. Praesent eget placerat turpis. Fusce at bibendum nisi. Phasellus tellus mauris, commodo sit amet sem eu, placerat finibus tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse cursus velit sed est vulputate venenatis. Cras a orci magna. Nam ac sodales ligula. Pellentesque convallis lectus sit amet diam porttitor, et luctus massa faucibus. Cras ornare, enim ac placerat lobortis, ex ipsum scelerisque velit, ut suscipit enim risus eu justo. Sed ultricies elit a eros aliquet, a posuere ante auctor. Nulla dictum sodales semper.</p>
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
