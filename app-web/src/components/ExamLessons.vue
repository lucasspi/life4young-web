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
        <h1 class="title is-2">Quiz: Gerenciando arquivos</h1><br>
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

  <section class="container content" style="margin-bottom: 60px; padding-left:10px; padding-right:10px;">
    <div class="main-div-quiz">
      <div class="quiz-styles">
        <p style="color: #7d97ad; font-size: 14px;">QUIZ</p>
        <p style="line-height: 1.7; font-size: 1rem;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum molestie dictum feugiat. Vivamus vitae diam</p>
      </div>
      <ul style="margin: 0px;">
        <li v-for="item in items" class="_answer">
          <span class="index-module">
              <input readonly="" class="index-module--checkbox" id="checkbox-react" type="checkbox" style="margin-right: 0.5em;">
              <label for="checkbox-react" class="">
                  <div class="">
                      <p class="textAnswer">Opção para multipla escolha</p>
                  </div>
              </label>
          </span>
        </li>
      </ul>
    </div>
    <div class="_quiz-send">
      <button class="vds-button vds-button--primary" type="button">
          <span class="vds-button__content">Enviar</span>
      </button>
    </div>
  </section>
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
  data(){
    return{
      items: [1,2,3,4,5]
    };
  },
      methods: {
      onClickToggleNavigation() {
        this.$store.commit("setMenuVisible", !this.is_menu_visible)
      },

    }
}
</script>

<style>
.vds-button--default, .vds-button--destructive, .vds-button--primary, .vds-button--secondary {
    box-shadow: 0 0 8px 0 rgba(17,22,26,.16), 0 4px 8px 0 rgba(17,22,26,.08), 0 8px 16px 0 rgba(17,22,26,.08);
}
.vds-button__content {
    width: 100%;
    height: 100%;
    display: flex;
    overflow-y: hidden;
    align-items: center;
    justify-content: center;
}
.vds-button {
    font-size: .8125rem;
    line-height: 1.5rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    height: 3rem;
    padding: 0 2rem;
    background: #0691E6;
    border: transparent;
    border-radius: .25rem;
    color: #fff;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    vertical-align: middle;
    transition: all .3s ease;
}
._quiz-send {
    margin-top: 20px;
    text-align: right;
}

.main-div-quiz{
  border: 1px solid #dbe2e8;
  box-shadow: 0 0 10px 0 rgba(46,60,73,.2);
}
.textAnswer{
  font-size: 17px;
  line-height: 1.7;
  font-weight: 300;
}
.quiz-styles{
    border-bottom: 1px solid #dbe2e8;
    padding: 40px;
    line-height: 1.8;
    font-size: 18px;
    color: #2e3d49;
}
._answer{
    display: flex;
    padding: 16px 40px;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #dbe2e8;
    margin-top: 0px;
    transition: 0.4s;
}
._answer:hover{
  background: rgba(68, 79, 96, 0.3);
  margin-top: 0px;
}
.index-module{
    align-items: center;
    display: flex;
    padding: 0;
}
input[type=checkbox].index-module--checkbox{
    flex: none;
    height: 16px;
    margin: 0;
    outline: none;
    padding: 0;
    width: 16px;
    cursor: pointer;
}
input[type=checkbox].index-module--checkbox+label {
    font-size: 14px;
}
input[type=checkbox].index-module--checkbox+label:not(:empty) {
    margin-left: .5em;
}

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
