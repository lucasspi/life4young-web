<template>
<div>
  <footer class="footer footer-dark">
    <div class="container">
      <div class="columns is-mobile is-multiline">
        <div class="column is-3-desktop is-10-mobile">
          <div class="control has-icons-left has-icons-right">
            <input class="input is-medium inputFooterRender is-vcentered"  type="email" placeholder="Email">
            <span class="icon is-left is-vcentered">
              <font-awesome-icon icon="envelope" style="color: #bababa; font-size: 18px; text-align: center; margin-left:14px;"></font-awesome-icon>
            </span>
            <span ><p style="margin-top: 15px; color: #bababa;">Esteja por dentro de novos lançamentos.</p></span>
          </div>
        </div>
        <div class="column is-1-desktop is-2-mobile">
          <div class="is-vcentered is-centered button_slide slide_down" style="">
            <font-awesome-icon icon="envelope" style="color: #black; font-size: 18px; text-align: center; margin-left:5px;"></font-awesome-icon>
          </div>
        </div>
        <div class="column is-5-desktop is-centered is-12-mobile" style="text-align: center;">
          <img src="/static/l4y-Branco.png" alt="Life4young" style="height: 40px;"/>
        </div>
        <div class="column is-3-desktop is-vcentered is-12-mobile" style="">
          <a href="https://app.escoladearquitetos.com.br/" ><p class="menuFooter">Início</p></a>
          <a href="https://app.escoladearquitetos.com.br/open-courses" ><p class="menuFooter">Sobre nós</p></a>
          <a href="https://app.escoladearquitetos.com.br/community" ><p class="menuFooter">Organizar evento</p></a>
        </div>
      </div>
    </div>
  </footer>
  <section class="" style="background: #293341;">
    <div class="container">
      <div class="columns">
        <div class="column is-8">
          <p style="font-size: 13px; font-weight: 300; color: #bababa;">Produzido por SPIRANDELI - APPS | SISTEMAS | WEB </p>
        </div>
        <div class="column is-4">
          <p style="font-size: 13px; font-weight: 300; color: #bababa;">contato@life4young.com</p>
        </div>
      </div>
    </div>
  </section>
  </div>

</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import LogoImage from '../Icons/LogoImage.vue'
  import obfuscator from '../../helpers/obfuscator'

  export default {

    name: 'footer-dark',

    components: {
      LogoImage
    },

    computed: {
      ...mapGetters({'is_menu_open': 'isMenuOpen'}),
      ...mapState(['is_menu_visible', 'is_tour_open'])
    },

    data() {
      let copyrightText = "Produzido por MR TECH SOLUCOES EM TECNOLOGIA LTDA |\n" +
        "CNPJ: 28.376.868/0001-00 | \n" +
        "\n" +
        "contato@escoladearquitetos.com.br";
      return {
        copyright_text: obfuscator.encode(copyrightText)
      }
    },

    mounted() {
      let el = document.getElementById("copyrightplaceholder");
      el.innerHTML = this.copyright_text;
    },

    methods: {
      onClickToggleNavigation() {
        this.$store.commit("setMenuVisible", !this.is_menu_visible)
      }
    }
  }
</script>

<style lang="scss">
.menuFooter{
  font-size: 18px;
  color: #fafafa;
  line-height: 1.8;
  font-weight: 600;
}
.button_slide {
  color: #FFF;
  border: 2px solid #40a6f9;
  background: transparent;
  border-radius: 100px;
  padding:10px;
  width: 50px;
  height: 50px;
  display: inline-block;
  font-size: 1.20rem;
  font-weight:600;
  cursor: pointer;
  box-shadow: inset 0 0 0 0 #40a6f9;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
}

.slide_down:hover {
  box-shadow: inset 0 100px 0 0 #40a6f9;
  border: 2px solid transparent;

}
.inputFooterRender {
  background-color: #dadada;
  border-radius: 100px;
  color: #bababa;
  transition: 0.4s;
  margin-right:20px;
  margin-top: 0px;
}

.inputFooterRender:hover {
  background-color: #ffffff;
  border-radius: 100px;
  color: #bababa;
}
</style>
